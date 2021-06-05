var tabContainer = document.querySelector('.tab-container');

var tabList = document.querySelectorAll('.tab');

var viewList = document.querySelectorAll('.view');

var searchResultsListDiv = document.getElementById('search-results-list');

var favResultsDiv = document.getElementById('favorite-results-list');

function changePage(view) {
  for (var i = 0; i < tabList.length; i++) {
    if (tabList[i].getAttribute('data-view') === view) {
      tabList[i].className = 'tab active';
    } else {
      tabList[i].className = 'tab';
    }
  }

  for (var d = 0; d < viewList.length; d++) {
    if (viewList[d].getAttribute('data-view') === view) {
      viewList[d].classList.remove('hidden');
    } else {
      viewList[d].classList.add('hidden');
    }
  }

  if (view === 'shopping list') {
    makeShoppingList();
  }
  if (view === 'favorites') {
    makeFavoritesList();
  }
}

tabContainer.addEventListener('click', function (event) {
  var tab = event.target.closest('.tab');
  if (tab !== null) {
    changePage(tab.getAttribute('data-view'));
  }
});

var formElement = document.querySelector('.search-form');

function recipeGenerator(recipe) {
  var p = document.createElement('p');
  var a = document.createElement('a');
  a.setAttribute('href', recipe.url);
  var aText = document.createTextNode(recipe.label);
  a.appendChild(aText);
  p.appendChild(a);

  var favStar = document.createElement('i');

  if (favorites.getRecipe(recipe.uri) !== undefined) {
    favStar.className = 'fas fa-star favorite';
  } else {
    favStar.className = 'far fa-star favorite';
  }
  favStar.setAttribute('data-recipe-uri', recipe.uri);

  var cartIcon = document.createElement('i');

  if (shoppingList.getRecipe(recipe.uri) !== undefined) {
    cartIcon.className = 'fas fa-shopping-cart shopping-cart';
  } else {
    cartIcon.className = 'fas fa-cart-plus shopping-cart';
  }
  cartIcon.setAttribute('data-recipe-uri', recipe.uri);
  var divBackgroundImg = document.createElement('div');
  divBackgroundImg.setAttribute('class', 'img-background');

  divBackgroundImg.style.backgroundImage = 'url(' + recipe.image + ')';

  var divRecipe = document.createElement('div');
  divRecipe.setAttribute('class', 'recipe');

  divRecipe.append(favStar, cartIcon, divBackgroundImg, p);

  return divRecipe;
}

function formSubmit(event) {
  event.preventDefault();

  var searchForm = formElement.elements.search.value;
  var cuisineTypeForm = formElement.elements.cuisineType.value;

  search.doSearch(searchForm, cuisineTypeForm, function (response) {
    while (searchResultsListDiv.firstChild) {
      searchResultsListDiv.removeChild(searchResultsListDiv.firstChild);
    }

    for (var r = 0; r < response.hits.length; r++) {
      var divRecipe = recipeGenerator(response.hits[r].recipe);
      searchResultsListDiv.append(divRecipe);
      changePage('search');
    }
  });
}

formElement.addEventListener('submit', formSubmit);

searchResultsListDiv.addEventListener('click', function (event) {
  if (event.target.matches('.favorite')) {
    var uri = event.target.getAttribute('data-recipe-uri');
    if (favorites.getRecipe(uri) !== undefined) {
      event.target.className = 'far fa-star favorite';
      favorites.removeRecipe(uri);
    } else {
      event.target.className = 'fas fa-star favorite';
      var favRecipe = search.getResult(uri);
      favorites.addRecipe(favRecipe);
    }
  } else if (event.target.matches('.shopping-cart')) {
    var uri = event.target.getAttribute('data-recipe-uri');

    if (shoppingList.getRecipe(uri) !== undefined) {
      event.target.className = 'fas fa-cart-plus shopping-cart';
      shoppingList.removeRecipe(uri);
    } else {
      event.target.className = 'fas fa-shopping-cart shopping-cart';
      var shoppingCart = search.getResult(uri);
      shoppingList.addRecipe(shoppingCart);
    }
  }
});

function makeShoppingList() {
  var list = shoppingList.listIngredients();
  var listId = document.getElementById('shopping-list');
  while (listId.firstChild) {
    listId.removeChild(listId.firstChild);
  }
  for (var i = 0; i < list.length; i++) {
    var unorderdList = document.createElement('ul');

    var recipeName = document.createElement('h2');
    var recipeNameText = document.createTextNode(list[i].label);
    recipeName.appendChild(recipeNameText);

    recipeName.appendChild(unorderdList);

    for (var il = 0; il < list[i].ingredients.length; il++) {
      var liList = document.createElement('li');
      var liText = document.createTextNode(list[i].ingredients[il]);
      liList.appendChild(liText);
      unorderdList.appendChild(liList);
    }
    listId.append(recipeName, unorderdList);
  }
}

function makeFavoritesList() {
  var list = favorites.listRecipes();

  while (favResultsDiv.firstChild) {
    favResultsDiv.removeChild(favResultsDiv.firstChild);
  }

  for (let i = 0; i < list.length; i++) {
    var divRecipe = recipeGenerator(list[i].recipe);

    favResultsDiv.append(divRecipe);
  }
}

favResultsDiv.addEventListener('click', function (event) {
  if (event.target.matches('.favorite')) {
    var uri = event.target.getAttribute('data-recipe-uri');
    if (favorites.getRecipe(uri) !== undefined) {
      event.target.className = 'far fa-star favorite';
      favorites.removeRecipe(uri);
    } else {
      event.target.className = 'fas fa-star favorite';
      var favRecipe = search.getResult(uri);
      favorites.addRecipe(favRecipe);
    }
  } else if (event.target.matches('.shopping-cart')) {
    var uri = event.target.getAttribute('data-recipe-uri');

    if (shoppingList.getRecipe(uri) !== undefined) {
      event.target.className = 'fas fa-cart-plus shopping-cart';
      shoppingList.removeRecipe(uri);
    } else {
      event.target.className = 'fas fa-shopping-cart shopping-cart';
      var shoppingCart = search.getResult(uri);
      shoppingList.addRecipe(shoppingCart);
    }
  }
});

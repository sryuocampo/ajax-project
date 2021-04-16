var tabContainer = document.querySelector('.tab-container');

var tabList = document.querySelectorAll('.tab');

var viewList = document.querySelectorAll('.view');

var searchResultsListDiv = document.getElementById('search-results-list');

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
      viewList[d].className = 'view';
    } else {
      viewList[d].className = 'view hidden';
    }
  }

  if (view === 'shopping-list') {
    makeShoppintList();
  }
}

tabContainer.addEventListener('click', function (event) {
  var tab = event.target.closest('.tab');
  if (tab !== null) {
    changePage(tab.getAttribute('data-view'));
  }
});

var formElement = document.querySelector('.search-form');

function formSubmit(event) {
  event.preventDefault();

  var searchForm = formElement.elements.search.value;
  var cuisineTypeForm = formElement.elements.cuisineType.value;

  search.doSearch(searchForm, cuisineTypeForm, function (response) {
    // remove all children
    while (searchResultsListDiv.firstChild) {
      searchResultsListDiv.removeChild(searchResultsListDiv.firstChild);
    }

    for (var r = 0; r < response.hits.length; r++) {
      const recipe = response.hits[r].recipe;

      var p = document.createElement('p');
      p.onclick = function () {
        window.open(recipe.url);
      };
      var pText = document.createTextNode(recipe.label);
      p.appendChild(pText);

      var favStar = document.createElement('i');
      favStar.setAttribute('class', 'far fa-star favorite');
      favStar.setAttribute('data-recipe-uri', recipe.uri);

      var cartIcon = document.createElement('i');
      cartIcon.setAttribute('class', 'fas fa-cart-plus shopping-cart');
      cartIcon.setAttribute('data-recipe-uri', recipe.uri);

      var divBackgroundImg = document.createElement('div');
      divBackgroundImg.setAttribute('class', 'img-background');

      divBackgroundImg.style.backgroundImage = 'url(' + recipe.image + ')';

      var divRecipe = document.createElement('div');
      divRecipe.setAttribute('class', 'recipe');

      divRecipe.append(favStar, cartIcon, divBackgroundImg, p);

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

function makeShoppintList() {
  
}

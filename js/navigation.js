var tabContainer = document.querySelector('.tab-container');

var tabList = document.querySelectorAll('.tab');

var viewList = document.querySelectorAll('.view');

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
  console.log(cuisineTypeForm);
  console.log(searchForm);

  search.doSearch(searchForm, cuisineTypeForm, function (response) {
    var searchResultsListDiv = document.getElementById('search-results-list');

    //remove all children add here

    for (var r = 0; r < response.hits.length; r++) {
      var recipe = response.hits[r].recipe;

      var p = document.createElement('p');
      var pText = document.createTextNode(recipe.label);
      p.appendChild(pText);

      var divBackgroundImg = document.createElement('div');
      divBackgroundImg.setAttribute('class', 'img-background');

      divBackgroundImg.style.backgroundImage = 'url(' + recipe.image + ')';

      var divRecipe = document.createElement('div');
      divRecipe.setAttribute('class', 'recipe');

      divRecipe.append(divBackgroundImg, p);

      searchResultsListDiv.append(divRecipe);

      changePage('search');
      console.log(recipe);
    }
    console.log(response.hits);
  });
}

formElement.addEventListener('submit', formSubmit);

// submit new Search(do Search)
// build DOM search results

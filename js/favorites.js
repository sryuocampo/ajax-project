function Favorites() {
  this.recipes = [];

  // local storage
  var favoritesJSON = localStorage.getItem('ajax-favorites-local-storage');
  if (favoritesJSON) {
    this.recipes = JSON.parse(favoritesJSON);
  }

  window.addEventListener('beforeunload', () => {
    var favoriteslistJSON = JSON.stringify(this.recipes);
    localStorage.setItem('ajax-favorites-local-storage', favoriteslistJSON);
  });
}

Favorites.prototype.addRecipe = function (recipe) {
  this.recipes.push(recipe);
};

Favorites.prototype.removeRecipe = function (uri) {
  this.recipes = this.recipes.filter(function (r) {
    return r.recipe.uri !== uri;
  });
};

Favorites.prototype.listRecipes = function () {
  return this.recipes;
};

Favorites.prototype.getRecipe = function (uri) {
  return this.recipes.find(function (r) {
    return r.recipe.uri === uri;
  });
};

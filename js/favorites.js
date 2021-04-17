function Favorites() {
  this.rec9ipes = [];
  //local storage
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

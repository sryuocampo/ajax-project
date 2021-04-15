function Favorites() {
  this.recipes = [];
}

Favorites.prototype.addRecipe = function (recipe) {
  this.recipes.push(recipe);
};

Favorites.prototype.removeRecipe = function (id) {
  this.recipes = this.recipes.filter(function (r) {
    return r.id !== id;
  });
};

Favorites.prototype.listRecipes = function () {
  return this.recipes;
};

Favorites.prototype.getRecipe = function (id) {
  return this.recipes.find(function (r) {
    return r.id === id;
  });
};

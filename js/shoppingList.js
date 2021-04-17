function ShoppingList() {
  this.recipes = [];
}
ShoppingList.prototype.addRecipe = function (recipe) {
  this.recipes.push(recipe);
};

ShoppingList.prototype.removeRecipe = function (uri) {
  this.recipes = this.recipes.filter(function (r) {
    return r.recipe.uri !== uri;
  });
};
ShoppingList.prototype.listIngredients = function () {
  var ingredients = [];
  for (var i = 0; i < this.recipes.length; i++) {
    ingredients.push({
      label: this.recipes[i].recipe.label,
      ingredients: this.recipes[i].recipe.ingredientLines,
    });
  }
  return ingredients;
};
ShoppingList.prototype.getRecipe = function (uri) {
  return this.recipes.find(function (r) {
    return r.recipe.uri === uri;
  });
};

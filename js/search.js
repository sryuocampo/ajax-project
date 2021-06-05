function Search() {
  this.lastSearch = [];
}
Search.prototype.doSearch = function (ingredients, cuisineType, callBack) {
  var that = this;
  var xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    `https://api.edamam.com/search?app_id=81275fa4&app_key=ee160a1c078454c29a4a32ebae7d0a07&to=50&q=${ingredients}&cuisineType=${cuisineType}`
  );
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    if (xhr.status === 200) {
      that.lastSearch = xhr.response.hits;
      callBack(xhr.response);
    } else {
      callBack(null);
    }
  });
  xhr.send();
};

Search.prototype.getLastResults = function () {
  return this.lastSearch;
};

Search.prototype.getResult = function (uri) {
  return this.lastSearch.find(function (r) {
    return r.recipe.uri === uri;
  });
};

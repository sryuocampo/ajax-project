var tabContainer = document.querySelector('.tab-container');

var tabList = document.querySelectorAll('.tab');

var viewList = document.querySelectorAll('.view');

tabContainer.addEventListener('click', function (event) {
  var tab = event.target.closest('.tab');
  for (var i = 0; i < tabList.length; i++) {
    if (tabList[i] === tab) {
      tabList[i].className = 'tab active';
    } else {
      tabList[i].className = 'tab';
    }
  }

  var getDataView = event.target.getAttribute('data-view');
  for (var d = 0; d < viewList.length; d++) {
    if (viewList[d].getAttribute('data-view') === getDataView) {
      viewList[d].className = 'view';
    } else {
      viewList[d].className = 'view hidden';
    }
  }
});

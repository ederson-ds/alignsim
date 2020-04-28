myApp.controller("produtosCtrl", function ($scope, $http, $location) {
  console.log("produtos controller");

  $scope.index = function () {};

  $scope.save = function () {};

  $scope.submitForm = function () {
    console.log("submitted");
    
  };

  $(".money").mask("#.##0,00", { reverse: true });

  setTimeout(function () {
    $.AdminBSB.browser.activate();
    $.AdminBSB.leftSideBar.activate();
    $.AdminBSB.rightSideBar.activate();
    $.AdminBSB.navbar.activate();
    $.AdminBSB.dropdownMenu.activate();
    $.AdminBSB.input.activate();
    $.AdminBSB.select.activate();
    $.AdminBSB.search.activate();
  }, 50);
});

myApp.controller("sidebarCtrl", function ($scope, $http, $location) {
  console.log("sidebar controller");

  $scope.pages = [
    { i: 0, url: "/", name: "Home", icon: "home" },
    { i: 1, url: "/produtos", name: "Produtos", icon: "domain" },
  ];

  $scope.pages.forEach((element) => {
    var pathArray = window.location.pathname.split("/");
    if (element.url == "/" + pathArray[1]) {
      element.active = "active";
    }
  });

  $scope.changePageActive = function (obj) {
    if (obj) {
      $scope.pages.forEach((element) => {
        element.active = "";
      });

      $scope.pages.forEach((element) => {
        if (element.i == obj.i) {
          element.active = "active";
        }
      });
    }
  };

  $scope.changePageActive();
});

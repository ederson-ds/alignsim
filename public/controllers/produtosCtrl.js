myApp.controller("produtosCtrl", function (
  $scope,
  $http,
  $location,
  $routeParams
) {
  console.log("produtos controller");

  $scope.index = function () {
    $http.get("/api/produtos").then(function (response) {
      $scope.produtos = response.data;
    });
  };

  $scope.create = function (id) {
    $http.get("/api/produtos/create/" + id).then(function (response) {
      $scope.produto = response.data;
    });
  };

  $scope.delete = function (id) {
    $http.delete("/api/produtos/delete/" + id).then(function (response) {
      $location.path("/produtos");
    });
  };

  var id = $routeParams._id;
  var deleteid = $routeParams._deleteid;

  if (id) {
    $scope.create(id);
  } else if (deleteid) {
    $scope.delete(deleteid);
  } else if(!($location.path() == "/produtos/create")) {
    $scope.index();
  }

  $scope.submitForm = function (produto) {
    if (id) {
      // Update
      $http.put("/api/produtos/create/" + id, produto).then(function (data) {
        $location.path("/produtos");
      });
    } else {
      // Create
      $http.post("/api/produtos/create/", produto).then(function (data) {
        $location.path("/produtos");
      });
    }
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

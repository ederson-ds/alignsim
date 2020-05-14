myApp.controller("contasapagarCtrl", function (
  $scope,
  $http,
  $location,
  $routeParams
) {
  console.log("contasapagar controller");

  $scope.contasapagar = {};
  var id = $routeParams._id;
  var deleteid = $routeParams._deleteid;

  $scope.index = function () {
    $http.get("/api/contasapagar").then(function (response) {
      $scope.contasapagar = response.data;
    });
  };

  $scope.create = function (id) {
    $http.get("/api/contasapagar/create/" + id).then(function (response) {
      $scope.contasapagar = response.data;
    });
  };

  $scope.delete = function (id) {
    $http.delete("/api/contasapagar/delete/" + id).then(function (response) {
      $location.path("/contasapagar");
    });
  };

  if (id) {
    $scope.create(id);
  } else if (deleteid) {
    $scope.delete(deleteid);
  } else if (!($location.path() == "/contasapagar/create")) {
    $scope.index();
  }

  $scope.submitForm = function (contasapagar) {
    if (id) {
      // Update
      $http.put("/api/contasapagar/create/" + id, contasapagar).then(function (data) {
        $location.path("/contasapagar");
      });
    } else {
      // Create
      $http.post("/api/contasapagar/create/", contasapagar).then(function (data) {
        $location.path("/contasapagar");
      });
    }
  };

  $(".money").mask("#.##0,00", { reverse: true });
  $('.date').mask('00/00/0000');

  $('#bs_datepicker_container input').datepicker({
    autoclose: true,
    container: '#bs_datepicker_container',
    format: 'dd/mm/yyyy',
    language: 'pt-BR'
  });

  $("#bs_datepicker_container input").on("change", function () {
    $scope.contasapagar.vencimento = $(this)[0].value;
    $scope.$apply();
  });

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

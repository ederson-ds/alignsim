var myApp = angular.module("myApp", ["ngRoute", "angular.filter"]);

myApp.config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/", {
      templateUrl: "views/home/home.html",
      controller: "homeCtrl",
    })
    .when("/produtos", {
      templateUrl: "views/produtos/produtos.html",
      controller: "produtosCtrl",
    })
    .when("/produtos/create", {
      templateUrl: "views/produtos/produtosadd.html",
      controller: "produtosCtrl",
    })
    .when("/produtos/create/:_id", {
      templateUrl: "views/produtos/produtosadd.html",
      controller: "produtosCtrl",
    })
    .when("/produtos/delete/:_deleteid", {
      templateUrl: "views/produtos/produtosdelete.html",
      controller: "produtosCtrl",
    })
    .when("/contasapagar", {
      templateUrl: "views/contasapagar/contasapagar.html",
      controller: "contasapagarCtrl",
    })
    .when("/contasapagar/create", {
      templateUrl: "views/contasapagar/contasapagaradd.html",
      controller: "contasapagarCtrl",
    })
    .when("/contasapagar/create/:_id", {
      templateUrl: "views/contasapagar/contasapagaradd.html",
      controller: "contasapagarCtrl",
    })
    .when("/contasapagar/delete/:_deleteid", {
      templateUrl: "views/contasapagar/contasapagardelete.html",
      controller: "contasapagarCtrl",
    })
    .otherwise({
      template: "<h1>None</h1><p>Nothing has been selected</p>",
    });
});
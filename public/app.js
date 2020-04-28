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
    .otherwise({
      template: "<h1>None</h1><p>Nothing has been selected</p>",
    });
});

myApp.directive('moneyMask', ['$timeout', 'moneyMaskService', function($timeout, moneyMaskService) {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {
        var execute = function () {
            scope.$apply(function () {
                ctrl.$setViewValue(moneyMaskService.fromStringToMoney(ctrl.$modelValue));
                ctrl.$render();
            });
        };
        element.bind('keyup', function () {
            execute();
        });
        
        $timeout(function () { 
            execute();
        }, 500);
     }
  };
}]);
myApp.factory("moneyMaskService", [ "$filter", function ($filter) {
   var _otherCharacters = /[^0-9]/g;
   var _zeros = /^0+/;
   
   var _fromStringToMoney = function (string) {
       return $filter("currency")((_fromStringToNumber(string)/100).toFixed(2));
   };
   
   var _fromStringToNumber = function (string) {
       if (!string) return 0;
       return string.replace(_otherCharacters, '').replace(_zeros, '') || 0;
   }
   
   return {
       fromStringToMoney: _fromStringToMoney
   };
}]);

/*
(function () {
  'use strict';

  angular
    .module('rw.moneymask', [])
    .directive('moneyMask', moneyMask);

  moneyMask.$inject = ['$filter', '$window'];
  function moneyMask($filter, $window) {
    var directive = {
      require: 'ngModel',
      link: link,
      restrict: 'A',
      scope: {
        model: '=ngModel'
      }
    };
    return directive;

    function link(scope, element, attrs, ngModelCtrl) {
      var display, cents;

      ngModelCtrl.$render = function () {
        display = $filter('number')(cents / 100, 2);

        if (attrs.moneyMaskPrepend) {
          display = attrs.moneyMaskPrepend + ' ' + display;
        }

        if (attrs.moneyMaskAppend) {
          display = display + ' ' + attrs.moneyMaskAppend;
        }

        element.val(display);
      }

      scope.$watch('model', function onModelChange(newValue) {
        newValue = parseFloat(newValue) || 0;

        if (newValue !== cents) {
          cents = Math.round(newValue * 100);
        }

        ngModelCtrl.$viewValue = newValue;
        ngModelCtrl.$render();
      });

      element.on('keydown', function (e) {
        if ((e.which || e.keyCode) === 8) {
          cents = parseInt(cents.toString().slice(0, -1)) || 0;

          ngModelCtrl.$setViewValue(cents / 100);
          ngModelCtrl.$render();
          scope.$apply();
          e.preventDefault();
        }
      });

      element.on('keypress', function (e) {
        var key = e.which || e.keyCode;
        
        if(key === 9 || key === 13) {
          return true;
        }
        
        var char = String.fromCharCode(key);
        e.preventDefault();

        if (char.search(/[0-9\-]/) === 0) {
          cents = parseInt(cents + char);
        }
        else {
          return false;
        }
        
        var target = e.target || e.srcElement;

        if(target.selectionEnd != target.selectionStart) {
          ngModelCtrl.$setViewValue(parseInt(char) / 100);
        }
        else {
          ngModelCtrl.$setViewValue(cents / 100);
        }
        ngModelCtrl.$render();
        scope.$apply();
      })
    }
  }
})();*/
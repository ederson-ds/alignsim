myApp.controller("sidebarCtrl", function ($scope, $http, $location) {
  console.log("sidebar controller");

  $scope.pages = [
    { i: 0, url: "/", name: "Home", icon: "home" },
    { i: 1, url: "/produtos", name: "Produtos", icon: "domain" },
    {
      i: 2, name: "Financeiro", icon: "attach_money",
      telas: [
        { i: 0, url: "/contasapagar", name: "Contas a pagar", icon: "arrow_upward" },
        { i: 0, url: "/contasareceber", name: "Contas a receber", icon: "arrow_downward" }
      ]
    }
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

  $scope.teste = function (e) {
    var $this = $(e.target);
    var $content = $this.next();

    if ($($this.parents('ul')[0]).hasClass('list')) {
      var $not = $(e.target).hasClass('menu-toggle') ? e.target : $(e.target).parents('.menu-toggle');

      $.each($('.menu-toggle.toggled').not($not).next(), function (i, val) {
        if ($(val).is(':visible')) {
          $(val).prev().toggleClass('toggled');
          $(val).slideUp();
        }
      });
    }

    if ($this.attr('href') == "unsafe:javascript:void(0);") {
      if ($content.is(':visible')) {
        $this.removeClass('toggled');
        $content.slideUp();
      } else {
        $this.addClass('toggled');
        $content.slideDown();
      }
    }
  };

  $('.bars').on('click', function () {
    var $body = $('body');
    var $overlay = $('.overlay');
    $body.toggleClass('overlay-open');
    if ($body.hasClass('overlay-open')) { $overlay.fadeIn(); } else { $overlay.fadeOut(); }
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

  $scope.changePageActive();
});

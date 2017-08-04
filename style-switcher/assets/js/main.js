(function ($) {
  "use strict";

    jQuery(document).ready(function($){


    $("button.Switcher-control").on('click', function() {
      $(".Switcher").toggleClass("active");
    })

    $("li.a").on("click", function () {
        $("LINK[href*='assets/css/themes/theme']").remove();
        $('head').append('<link rel="stylesheet" href="assets/css/themes/theme-green-sea.css" type="text/css" />');
    })

    $("li.b").on("click", function () {
        $("LINK[href*='assets/css/themes/theme']").remove();
        $('head').append('<link rel="stylesheet" href="assets/css/themes/theme-sun-flower.css" type="text/css" />');

    });

    $("li.c").on("click", function () {
        $("LINK[href*='assets/css/themes/theme']").remove();
        $('head').append('<link rel="stylesheet" href="assets/css/themes/theme-orange.css" type="text/css" />');

    });

    $("li.d").on("click", function () {
        $("LINK[href*='assets/css/themes/theme']").remove();
        $('head').append('<link rel="stylesheet" href="assets/css/themes/theme-green.css" type="text/css" />');

    });

    $("li.e").on("click", function () {
        $("LINK[href*='assets/css/themes/theme']").remove();
        $('head').append('<link rel="stylesheet" href="assets/css/themes/theme-red.css" type="text/css" />');

    });

    $("li.f").on("click", function () {
        $("LINK[href*='assets/css/themes/theme']").remove();
        $('head').append('<link rel="stylesheet" href="assets/css/themes/theme-pink.css" type="text/css" />');

    });










    }); // End Document Ready function


    jQuery(window).load(function(){

        
    });


}(jQuery)); 
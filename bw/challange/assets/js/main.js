(function ($) {
	"use strict";

    jQuery(document).ready(function($){


      $(window).scroll(function() {
          if($(window).scrollTop() > 50) {
            $(".header").addClass("stiky");
          } else {
            $(".header").removeClass("stiky");
          }
          
      })

     

    });


    jQuery(window).load(function(){

        
        
    });


}(jQuery));	
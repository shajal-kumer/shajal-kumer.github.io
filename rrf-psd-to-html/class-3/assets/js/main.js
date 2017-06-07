(function ($) {
	"use strict";

    jQuery(document).ready(function($){


       $(".case-studies-carousel").owlCarousel({
            items: 3,
            margin:30,
            loop:true,
            dots:true,
            nav:false,
            autoplay: true
       });

       $(".testimonial-carousel").owlCarousel({
            items: 1,
            loop:true,
            dots:true,
            nav:false,
            autoplay: true
       });


    });

    jQuery(window).load(function(){
        
    });


}(jQuery));	
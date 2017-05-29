(function ($) {
	"use strict";

    jQuery(document).ready(function($){


       $('.testimonial-carousel').owlCarousel({
       	items: 1,
       	autoplay: 1,
       	autoplayTimeout:5000,
       	smartSpeed: 800,
       	loop:true,
       	dots:true,
       	nav:false
       });

       $(".video-play-btn").magnificPopup({
          type: 'iframe'
        });


    });
  
      $(window).load(function() {
            $("#preloader").delay(300).fadeOut();
            $(".preloader-area").delay(500).fadeOut("slow");
        });
    
    $(window).scroll(function() {
            if($(this).scrollTop() > 200) {
                $('.scrollToTop').fadeIn();
            } else {
                $('.scrollToTop').fadeOut();
            }
        });


        $('.scrollToTop').on('click', function() {
            $('html, body').animate({scrollTop: 0}, 800);
            return false;
        });


        
    jQuery(window).load(function(){
      
     
      
        
    });


}(jQuery));	
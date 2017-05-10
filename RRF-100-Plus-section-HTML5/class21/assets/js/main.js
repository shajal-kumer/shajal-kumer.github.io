(function($) {
    'use strict';
    
    jQuery(document).ready(function() {
        

        $(".homepage-slides").owlCarousel({
        	items: 1,
        	autoplay: false,
        	loop: true,
        	nav: false,
        	dots: true,
            smartSpeed: 500,
            mouseDrag: false,
            TouchDrag: false
        })

        $(".homepage-slides").on("translate.owl.carousel", function() {
            
            $(".single-homepage-slide h2").removeClass("animated flipInX").css({"-webkit-animation-delay":"0s", "animation-delay":"0s", "opacity":"0"});
            $(".single-homepage-slide p").removeClass("animated fadeInDown").css({"-webkit-animation-delay":".2s", "animation-delay":".2s", "opacity": "0"});
            $(".single-homepage-slide .slide-btn").removeClass("animated fadeInLeft").css({"-webkit-animation-delay":"6s","animation-delay":".6s", "opacity":"0"});
            $(".single-homepage-slide .homepage-slide-img").removeClass("animated fadeInRight").css({"-webkit-animation-delay":"0s","animation-delay":"0s", "opacity":"0"});
            
        });

        $(".homepage-slides").on("translated.owl.carousel", function() {
            $(".single-homepage-slide h2").addClass("animated flipInX").css({"-webkit-animation-delay":"0s", "animation-delay":"0s", "opacity":"1"});
            $(".single-homepage-slide p").addClass("animated fadeInDown").css({"-webkit-animation-delay": ".2s", "animation-delay":".2s", "opacity": "1"});
            $(".single-homepage-slide .slide-btn").addClass("animated fadeInLeft").css({"-webkit-animation-delay":"6s", "animation-delay":".6s", "opacity":"1"});
            $(".single-homepage-slide .homepage-slide-img").addClass("animated fadeInRight").css({"-webkit-animation-delay":"0s", "animation-delay":"0s", "opacity":"1"});
            
        });
        
    });// End of jQuery document function   
}(jQuery));
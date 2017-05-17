(function($) {
    'use strict';
    
    jQuery(document).ready(function() {
        
    		$(".homepage-slides").owlCarousel({
        	items: 1,
        	autoplay: true,
        	loop:true,
        	dots: true,
        	smartSpeed: 500,
        	nav: true,
        	navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        	mouseDrag: false,
        	touchDrag: false,
        	smartSpeed:800,
        	autoplayTime: 1000
        });



        $(".homepage-slides").on("translate.owl.carousel", function() {
			$(".slide-text").removeClass("animated fadeIn").css("opacity", "0");
			$(".single-slide-item h1").removeClass("animated fadeInLeft").css({"-webkit-animation-delay":".5s", "animation-delay":".5s", "opacity":"0"});
			$(".single-slide-item p").removeClass("animated fadeInLeft").css({"-webkit-animation-delay":".8s", "animation-delay":".8s", "opacity": "0"});
			$(".single-slide-item .boxed-btn").removeClass("animated fadeInLeft").css({"-webkit-animation-delay":"1.2s","animation-delay":".1.2s", "opacity":"0"});
            
		});

		$(".homepage-slides").on("translated.owl.carousel", function() {
			$(".slide-text").addClass("animated fadeIn").css("opacity", "1");
			$(".single-slide-item h1").addClass("animated fadeInLeft").css({"-webkit-animation-delay":".5s", "animation-delay":".5s", "opacity":"1"});
			$(".single-slide-item p").addClass("animated fadeInLeft").css({"-webkit-animation-delay": ".8s", "animation-delay":".8s", "opacity": "1"});
			$(".single-slide-item .boxed-btn").addClass("animated fadeInLeft").css({"-webkit-animation-delay":"1.2s", "animation-delay":".1.2s", "opacity":"1"});
           
		});
        
        
    });// End of jQuery document function   
}(jQuery));
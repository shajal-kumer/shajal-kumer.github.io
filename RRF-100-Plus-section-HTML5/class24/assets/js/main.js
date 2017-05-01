(function($) {
    'use strict';
    
    jQuery(document).ready(function() {
        

        $(".homepage-slides").owlCarousel({
        	items: 1,
        	autoplay: false,
        	loop:true,
        	dots: false,
        	smartSpeed: 500,
        	nav: true,
        	navText: ['<i class="fa fa-long-arrow-left"></i>','<i class="fa fa-long-arrow-right"></i>'],
        	mouseDrag: false,
        	touchDrag: false,
        })

        $(".homepage-slides").on("translate.owl.carousel", function() {
			
			$(".single-slide-item h2").removeClass("animated fadeInLeft").css({"-webkit-animation-delay":".5s", "opacity":"0"});
			$(".single-slide-item p").removeClass("animated fadeInLeft").css({"-webkit-animation-delay":".8s", "opacity": "0"});
			$(".single-slide-item .slide-readmore-btn").removeClass("animated fadeInLeft").css({"-webkit-animation-delay":"1.2s", "opacity":"0"});
                        $(".single-slide-item .slide-img-right").removeClass("animated fadeInRight").css({"-webkit-animation-delay":".2s", "opacity":"0"});
		});

		$(".homepage-slides").on("translated.owl.carousel", function() {
			$(".single-slide-item h2").addClass("animated fadeInLeft").css({"-webkit-animation-delay":".5s", "opacity":"1"});
			$(".single-slide-item p").addClass("animated fadeInLeft").css({"-webkit-animation-delay": ".8s", "opacity": "1"});
			$(".single-slide-item .slide-readmore-btn").addClass("animated fadeInLeft").css({"-webkit-animation-delay":"1.2s", "opacity":"1"});
            $(".single-slide-item .slide-img-right").addClass("animated fadeInRight").css({"-webkit-animation-delay":".2s", "opacity":"1"});
		});

        
    });// End of jQuery document function   
}(jQuery));
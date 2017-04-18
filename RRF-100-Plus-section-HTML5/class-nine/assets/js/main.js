(function($) {
    'use strict';
    
    jQuery(document).ready(function() {
        

        $(".client-testimonial-carousel").owlCarousel({
        	item: 3,
        	autoplay: true,
        	loop: true,
        	nav: false,
        	dots: true,
        	margin: 30
        })
        
    });// End of jQuery document function   
}(jQuery));
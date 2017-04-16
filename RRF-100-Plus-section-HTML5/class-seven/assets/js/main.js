(function($) {
    'use strict';
    
    jQuery(document).ready(function() {
        
    	$(".staff-list").owlCarousel({
    		items: 4,
    		autoplay: true,
    		margin: 40,
    		loop: true,
    		nav: true,
    		navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"],
    		responsiveClass:true,
    		responsive: {
    			0: {
    				items: 1,
    				nav: false
    			},
    			480: {
    				items: 2,
    				nav: false
    			},
    			768: {
    				items: 3
    			},
    			992: {
    				items: 4
    			}
    		}



		    });
		    
        
        
    });// End of jQuery document function   
}(jQuery));
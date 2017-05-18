(function($) {
    'use strict';
    
    jQuery(document).ready(function() {
        
    	$('.menu-triger').on('click', function() {
    		$('.off-canvas-menu, .off-canvas-overlay').addClass('active');
    	})
    	$('.menu-close').on('click', function() {
    		$('.off-canvas-menu, .off-canvas-overlay').removeClass('active');
    	})

    	$('.off-canvas-overlay').on('click', function() {
    		$(this).removeClass('active');
    	})
    	$('.off-canvas-overlay').on('click', function() {
    		$('.off-canvas-menu').removeClass('active');
    	})

        
    });// End of jQuery document function   
}(jQuery));
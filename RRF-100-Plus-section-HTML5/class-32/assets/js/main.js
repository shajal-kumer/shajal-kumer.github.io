(function($) {
    'use strict';
    
    jQuery(document).ready(function() {
        

        $(window).scroll(function() {
        	if($(this).scrollTop() > 150) {
        		$('.scrollToTop').fadeIn();
        	} else {
        		$('.scrollToTop').fadeOut();
        	}
        });


        $('.scrollToTop').on('click', function() {
        	$('html, body').animate({scrollTop: 0}, 800);
        	return false;
        });
        
    });// End of jQuery document function   
}(jQuery));
(function($) {
    'use strict';
    
    jQuery(document).ready(function() {
        

        $(".project-lists").isotope();


    	$(".project-title li").on("click", function() {
    		$(".project-title li").removeClass("active");
    		$(this).addClass("active");
    		var selector = $(this).attr('data-filter');
    		 $(".project-lists").isotope({
    		 	filter: selector
    		 });
    	});

    	$(".link").magnificPopup({
    		type: 'image'
    	});

        
    });// End of jQuery document function   
}(jQuery));
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


         $('.link').magnificPopup({ 
            removalDelay: 300,
            type: 'image',
            callbacks: {
            beforeOpen: function() {
               this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure animated ' + this.st.el.attr('data-effect'));
            }
          },
          });

        
    });// End of jQuery document function   
}(jQuery));
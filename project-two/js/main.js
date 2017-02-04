(function($) {
    'use strict';
    
    jQuery(document).ready(function() {
        
      $(".slider").owlCarousel({
      		items: 1,
      		nav: true,
      		loop: true,
      		autoplay: 3000,
          smartSpeed:1000,
      		navText : ['<i class="fa fa-angle-left"></i>' , '<i class="fa fa-angle-right"></i>']

      });

       $(".brand-area").owlCarousel({
       		items : 6,
      		loop: true,
      		autoplay: 4000,
          smartSpeed: 1000,
      		responsiveClass:true,
		    responsive:{
		        0:{
		            items:1,
		        },
		        450:{
		            items:2,
		        },
		        750:{
		            items:4,
		        },
		        970:{
		            items:6,
		        },
		        1170:{
		            items:6,
		        }
		    }


      }) ;

      var hpHeight = $('.hand-picked').height();

      $('.hand-picked').height(hpHeight + 'px');


      $('.slide-item').imagesLoaded().progress({
        
        background: true

      });








        
    });// end of document ready function
})(jQuery);

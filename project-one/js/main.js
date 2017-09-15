(function($) {
    'use strict';
    
    jQuery(document).ready(function() {
        

        var htop = $('.header-top').outerHeight();

        var mmenu = $('.manimenu').height();

        var total = htop + mmenu;
        var wh = $(window).height();

        $('.welcome-message').css('height', wh - total + 'px');

		var small = $('.small').height();
		var dSmall = small * 2 + 10;
	   $('.big').css('height', dSmall +'px');


  // Start Of Scroll to fixed nav............
	    $(window).bind('scroll', function () {
	    	if ($(window).scrollTop() > 50) {
	        	$('.navbar-default').addClass('navbar-fixed-top animated fadeInDown');
	    	} else {
	        	$('.navbar-default').removeClass('navbar-fixed-top fadeInDown');
	    	}
		});
// END Of Scroll to fixed nav............
// Start Owl Carousel * Customer  Review section* ..........

	$(".reviews").owlCarousel({
		items: 3,
		margin:30,
		// autoplay: true,
		loop:true,
		responsiveClass: true,
		responsive: {
			0:{
				items: 1,
			},
			480:{
				items: 1,
			},
			768: {
				items: 2,
			},
			992: {
				items: 3,
			}
		}
	});
        
    });// End of jQuery document function  

    jQuery(window).load(function(){

          // Start Of masonry...............
		var $grid = $('.portfolio').isotope({
			 		filter: '.Buildings, .Interior, .Isolation, .Plumbing', 
			 		filter: '*',
			 		itemSelector: '.grid-item',
			 		percentPosition: true,
			 		masonry: {
			 			columnWidth: '.grid-sizer',
			 		},

			 	});

			// filter items on button click
			$('.port-navigation').on( 'click', 'button', function() {
			  var filterValue = $(this).attr('data-filter');
			  $grid.isotope({ filter: filterValue });
			});



			$('.port-navigation').each( function( i, buttonGroup ) {
			  var $buttonGroup = $( buttonGroup );
			  $buttonGroup.on( 'click', 'button', function() {
			    $buttonGroup.find('.is-checked').removeClass('is-checked');
			    $( this ).addClass('is-checked');
  			});
		});

  //  End  Of masonry...............
        
    }); 
})(jQuery);




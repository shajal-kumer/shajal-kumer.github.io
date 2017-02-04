(function($) {
    'use strict';
    
    jQuery(document).ready(function() {
        

        /*--------Start Preloader---------*/

        $(window).load(function() {
            $("#intro").delay(300).fadeOut();
            $(".animationload").delay(400).fadeOut("slow");
        });
        /*--------End Preloader---------*/

        /*------- Start scroll to change menu bg color---------*/
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 200) {
                $('.navbar-fixed-top').addClass('menu-bg');
            } else {
                $('.navbar-fixed-top').removeClass('menu-bg');
            }
        });
        /*-------End scroll to change menu bg color----------*/

        /*--------Bootstrap Menu Fix For Mobile----------*/

	    $('.navbar-default .navbar-nav li a').on('click', function () {
	        $('.navbar-collapse ').removeClass('in');
	    });
	    /*--------Bootstrap Menu Fix For Mobile-----------*/

	    /*-------Start Scrollspy js-------------*/
        $('body').scrollspy({
            target: '.navbar-collapse',
            offset: 150
        });
        $('[data-spy="scroll"]').each(function () {
		  var $spy = $(this).scrollspy('refresh')
		})
        /*-------End Scrollspy js-------------*/

        /*-------Start smooth scroll js----------*/
        $('a.smoth-scroll').on("click", function(e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 60
            }, 1000);
            e.preventDefault();
        });
        /*-------End smooth scroll js-----------*/

        /*-------Start Scroll to top----------*/
    
        $('.scrollup').on("click", function() {
            $("html, body").animate({
                scrollTop: 0
            }, 800);
            return false;
        });
        /*--------End Scroll to top-----------*/

     /*-------Start Magnificpopup js---------*/
        	$(".popup").magnificPopup({
        		removalDelay: 300,
			    type: 'image',
			     gallery: {
				    // options for gallery
				    enabled: true
				  },
			    callbacks: {
			    beforeOpen: function() {
			       this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure animated ' + this.st.el.attr('data-effect'));
			    }
			  },
				 
        	});



        /*----------End Magnificpopup js--------------*/

        /*----------Start Isotop js-------------------*/
        	// init Isotope
        var $grid = $('.work-list').isotope({
        		filter: '*, .design, .development, .photography',
		  		itemSelector: '.grid-gutter',
		  		percentPosition: true,
			})

			// filter items on button click
			$('.work-sorting-menu').on( 'click', 'button', function() {
			  var filterValue = $(this).attr('data-filter');
			  $grid.isotope({ filter: filterValue });
			});
			// CHECKED ITEM
			$('.work-sorting-menu').each( function( i, buttonGroup ) {
			  var $buttonGroup = $( buttonGroup );
			  $buttonGroup.on( 'click', 'button', function() {
			    $buttonGroup.find('.is-checked').removeClass('is-checked');
			    $( this ).addClass('is-checked');
  			});
		});
			
        /*-------End Isotop js--------*/

        /*----------Start Testimonial slider js-------------------*/

        $(".testimonial").owlCarousel({
			    items: 1,
			    autoplay: 1,
			    smartSpeed: 800,
			    loop: 1
        });
        /*-------End Testimonial slider js--------*/

        /*----------Start BLOG slider js-------------------*/
        $('.blog-post').owlCarousel({
        	items: 3,
        	autoplay: 5000,
        	smartSpeed: 700,
        	loop: 1,
        	margin: 30,
        	responsiveClass:true,
		    responsive:{
		    	0: {
		    		items:1,
		    		margin: 0
		    	},
		    	480: {
		    		items:1,
		    		margin: 0
		    	},
		    	768: {
		    		items: 2
		    	},
		    	992: {
		    		items: 3
		    	}
		    }
        });
        /*-------End BLOG slider js--------*/

        /*----------Start AOS js-------------------*/
        AOS.init({
        	easing: 'ease-in-out',
        	duration: 800,
        });
        /*-------End AOS js--------*/

        /*----------PARALAX js-------------------*/
        $(window).stellar({
        	responsive: true,
        	positionProperty: 'transform',
            horizontalScrolling: false
        });

          wow.init();

        /*-------End PARALAX js--------*/









    });// End of jQuery document function   
})(jQuery);
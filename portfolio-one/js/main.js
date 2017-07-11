(function($) {
    'use strict';
    
    jQuery(document).ready(function() {
        
        $('.about-left-sec-slider').owlCarousel({
        	items: 1,
        	autoplay: 5000,
        	smartSpeed: 700,
        	loop: 1
        });
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
        $(".testimonial").owlCarousel({
			    items: 1,
			    autoplay: 4000,
			    smartSpeed: 700,
			    loop: 1
        });

	    /*--------Start Progress bar-----------*/

	    $('#bar1').barfiller({
            barColor: "#00D664",
         });
         $('#bar2').barfiller({
            barColor: "#00D664",
        });
         $('#bar3').barfiller({
            barColor: "#00D664",
        });
         $('#bar4').barfiller({
            barColor: "#00D664",
        });

		 /*--------END Progress bar-----------*/

		/*--------Start Counter UP Js-----------*/

        $(".counter-number").counterUp({
        	delay: 10,
        	time: 1200
        });
        /*--------End Counter UP Js-----------*/

        /*-------Start Masonry js---------*/
        $('.my-work-area').masonry({
		  itemSelector: '.singel-work',
		  columnWidth: '.grid-sizer',
		  percentPosition: true,
		  gutter: 20,
		});
        /*-------END Masonry js---------*/

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

         /*----------PARALAX js-------------------*/
        $(window).stellar({
            responsive: true,
            positionProperty: 'transform',
            horizontalScrolling: false
        });

        /*-------End PARALAX js--------*/
        
        /*--------Start Preloader---------*/

        $(window).load(function() {
            $("#intro").delay(300).fadeOut();
            $(".animationload").delay(600).fadeOut("slow");
        });
        /*--------End Preloader---------*/

        /*--------Bootstrap Menu Fix For Mobile----------*/

	    $('.navbar-default .navbar-nav li a').on('click', function () {
	        $('.navbar-collapse ').removeClass('in');
	    });
	    /*--------Bootstrap Menu Fix For Mobile-----------*/

	    /*-------Start scroll to menu-border js-------------*/
	    $(window).scroll(function () {
	        if ($(".navbar-fixed-top").offset().top > 50) {
	            $(".navbar-fixed-top").addClass("menu-border");

	        } else {
	            $(".navbar-fixed-top").removeClass("menu-border");

	        }
	    });
	     /*-------End scroll to menu-border js-------------*/

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
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 400) {
                $('.scrollup').fadeIn();
            } else {
                $('.scrollup').fadeOut()
            }
        });
        $('.scrollup').on("click", function() {
            $("html, body").animate({
                scrollTop: 0
            }, 800);
            return false;
        });
        /*--------End Scroll to top-----------*/







	        
    });// End of jQuery document function   
})(jQuery);

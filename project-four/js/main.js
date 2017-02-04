(function($) {
    'use strict';
    
    jQuery(document).ready(function() {
        


    	/*--------Start Preloader---------*/

        $(window).load(function() {
            $("#intro").delay(300).fadeOut();
            $(".animationload").delay(400).fadeOut("slow");
        });
        /*--------End Preloader---------*/

        $(".slider").owlCarousel({
			    items: 1,
			    loop: true,
			    autoplay: 0,
                smartSpeed: 800
        });  

            $('.slider').on('translate.owl.carousel', function() {
                $('.slide-content-inner h1').removeClass('animated slideInRight').hide();
                $('.slide-content-inner p').removeClass('animated slideInRight').hide();
                $('.slide-content-inner a').removeClass('animated slideInRight').hide();
            })
            $('.slider').on('translated.owl.carousel', function() {
                $('.slide-content-inner h1').addClass('animated slideInRight').show();
                $('.slide-content-inner p').addClass('animated slideInRight').show();
                $('.slide-content-inner a').addClass('animated slideInRight').show();
            })

        $(".testimonial").owlCarousel({
			    items: 1,
			    autoplay: 1,
        });
        /*----------Bootstrap Menu Fix For Mobile---------------*/
    $(document).on('click', '.navbar-collapse.in', function(e) {
        if ($(e.target).is('a')) {
            $(this).collapse('hide');
        }
    });

        /*--------Start Counter UP Js-----------*/

        $(".counter-number").counterUp({
        	delay: 10,
        	time: 1000
        });
        /*--------End Counter UP Js-----------*/

        /*------- Start scroll to change menu bg color---------*/
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 200) {
                $('.header-top-area').addClass('menu-bg');
            } else {
                $('.header-top-area').removeClass('menu-bg');
            }
        });
        /*-------End scroll to change menu bg color----------*/

        /*-------Start smooth scroll js----------*/
        $('a.smoth-scroll').on("click", function(e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 60
            }, 1000);
            e.preventDefault();
        });
        /*-------End smooth scroll js-----------*/

        /*-------Start Scrollspy js-------------*/
        $('body').scrollspy({
            target: '.navbar-collapse',
            offset: 150
        });
        $('[data-spy="scroll"]').each(function () {
		  var $spy = $(this).scrollspy('refresh')
		})
        /*-------End Scrollspy js-------------*/

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
			var $grid = $('.work-area').isotope({
			 		filter: '*, .design, .development, .print, .video',
			 		itemSelector: '.witem',
			 		percentPosition: true,
			 	});
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

        /*-------Start Progress bar js----------*/
        	$('.progress-d').circleProgress({
		    	fill: {gradient: ['#3ac4fa', '#3ac4fa']}
		  	}).on('circle-animation-progress', function(event, progress, stepValue) {
    		$(this).find('strong').html(stepValue.toFixed(2).substr(2) + '<i>%</i>');

		  });
		   $('.graphic').circleProgress({
		   		value: 0.8,
		   })
		   $('.web-design').circleProgress({
		   		value: 0.95,
		   })
		   $('.web-development').circleProgress({
		   		value: 0.9,
		   })
		   $('.wordpress').circleProgress({
		   		value: 0.85,
		   })
		/*-------End Progress bar js----------*/









        
    });// End of jQuery document function   
})(jQuery);
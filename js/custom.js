(function($) {
    'use strict';
    
    jQuery(document).ready(function() {
        
        


            /*
         * ----------------------------------------------------------------------------------------
         *  MENU JS
         * ----------------------------------------------------------------------------------------
         */
        $(".toggle-btn").on("click", function () {
            $(this).toggleClass("active");
            $(".header-sec").toggleClass("active");
        });



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
	        if ($(".header-top-sec").offset().top > 50) {
	            $(".header-top-sec").addClass("menu-bg");

	        } else {
	            $(".header-top-sec").removeClass("menu-bg");

	        }
	    });
	     /*-------End scroll to menu-border js-------------*/


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
            if ($(this).scrollTop() > 300) {
                $('.scrollup').fadeIn().addClass('animated fadeInUp');
            } else {
                $('.scrollup').fadeOut().removeClass('animated fadeInUp');
            }
        });
        $('.scrollup').on("click", function() {
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });
        /*--------End Scroll to top-----------*/


        /*----------Start WOW js-------------------*/
        new WOW().init();
        /*-------End WOW js--------*/

        /*----------PARALAX js-------------------*/
        $(window).stellar({
            responsive: true,
            positionProperty: 'transform',
            horizontalScrolling: false,
        });

        /*-------End PARALAX js--------*/















        
    });// End of jQuery document function   
})(jQuery);
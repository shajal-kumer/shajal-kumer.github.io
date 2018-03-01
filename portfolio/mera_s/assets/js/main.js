(function ($) {
	"use strict";

    jQuery(document).ready(function($){
        $('[data-toggle="tooltip"]').tooltip(); 

        $('.testimonial-wrap').owlCarousel({
            items:1,
            loop:true,
            dots:false,
            nav:true,
            navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
        })

     $('.scroll-to-top').on("click", function() {
            $("html, body").animate({
                scrollTop: 0
            }, 700);
            return false;
    });

      /*-------Start smooth scroll js----------*/
        $('a.smoth-scroll').on("click", function(e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top
            }, 1000);
            e.preventDefault();
        });
        /*-------End smooth scroll js-----------*/

        $('.mainmenu li').on('click', function(){
            $('.mainmenu li').removeClass('active');
            $(this).addClass('active');
        })

        $('.mainmenu ul').slicknav({
            prependTo: '#mobile-menu'
        })


    });  //document 


    jQuery(window).load(function(){

        $('.portfolio-list').isotope();

        $('.portfolio-menu li').on('click', function(){
        	$('.portfolio-menu li').removeClass('active');
        	$(this).addClass('active');
        	var selector = $(this).attr('data-filter');
        	$('.portfolio-list').isotope({
        		filter: selector
        	})
        })
        
    });


}(jQuery));	
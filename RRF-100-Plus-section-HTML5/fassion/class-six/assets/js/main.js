(function($) {
    'use strict';
    
    jQuery(document).ready(function() {
        
    	$('.homepage-slides').owlCarousel({
    		items: 1,
    		autoplay: false,
    		loop: true,
    		dots: false,
    		nav: true,
    		navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>'] 
    	});
    	
    	$('.product-promotions').owlCarousel({
    		items: 1,
    		autoplay: false,
    		loop: true,
    		dots: true,
    		nav: false,
    	})
    	
    	$('.brand-images').owlCarousel({
    		items: 5,
    		smartSpeed: 400,
    		autoplaySpeed: 500,
    		autoplay: 1,
    		loop: true,
    		dots: true,
    		nav: false,
    		responsiveClass: true,
    		responsive:{
    			0: {
    				items: 1
    			},
    			480: {
    				items: 2
    			},
    			768: {
    				items: 3
    			},
    			992: {
    				items: 5
    			}
    		}
    	})
       

        $('.product-list').masonry()


        $('.menu-triger').on('click', function() {
        	$('.off-canvas-menu, .off-canvas-overlay').addClass('active');
        	return false;
        })

        $('.menu-clode, .off-canvas-overlay').on('click', function() {
        	$('.off-canvas-menu, .off-canvas-overlay, .search-wrap').removeClass('active');
        })
        

        $('.search-triger').on('click', function() {
        	$('.search-wrap, .off-canvas-overlay').addClass('active');
        })

        $('.search-wrap i.fa').on('click', function() {
        	$('.search-wrap, .off-canvas-overlay').removeClass('active');
        })









        
    });// End of jQuery document function   
}(jQuery));
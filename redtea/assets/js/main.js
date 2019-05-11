(function($) {
	'use strict';

	jQuery(document).ready(function($) {
		// Team slider start
		$('.review-slider ').owlCarousel({
			loop: true,
			margin: 30,
			dots: false,
			navs: false,
			autoplay: true,
			autoplayTimeout: 4000,
			autoplayHoverPause: true,
			autoHeight: true,
			autoHeightClass: 'owl-height2',
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			responsiveClass: true,
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 1
				},
				1000: {
					items: 2
				}
			}
		});
		// Team slider end
	});

	jQuery(window).load(function() {});
})(jQuery);

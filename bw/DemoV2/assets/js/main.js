(function($) {
    "use strict";

    jQuery(document).ready(function($) {


        $('.slider-wrap').owlCarousel({
            items: 1,
            loop: true,
            dots: true,
            smartSpeed:450,
        })
        $('.construction-carousel').owlCarousel({
            items: 10,
            margin: 20,
            loop: true,
            dots: true,
            smartSpeed:450,
            autoplayTimeout: 4000,
            autoplay: true,
        })


    }); // END OF document ready

}(jQuery));
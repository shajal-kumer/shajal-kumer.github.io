(function($) {
    "use strict";

    jQuery(document).ready(function($) {



        /*-------------------------------------------------------------------------*
         *               Homepage 3 carousel   js                                        *
         *-------------------------------------------------------------------------*/
        $(".homepage-3-slides").owlCarousel({
            items: 1,
            loop: true,
            dots: true,
            nav: true,
            navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>'],
            autoplay: false,
            smartSpeed: 800,
        });

        if ($(window).width() > 768) {
            //tihs code is for slider effect
            $(".homepage-3-slides").on('translate.owl.carousel', function() {
                $('.single-slide-item h2').removeClass('bounceInDown animated').hide();
                $('.single-slide-item p').removeClass('fadeIn animated').hide();
                $('.single-slide-item .video-play-btn').removeClass('bounceInUp animated').hide();
            });
            $(".homepage-3-slides").on('translated.owl.carousel', function() {
                $('.owl-item.active .single-slide-item h2').addClass('bounceInDown animated').show();
                $('.owl-item.active .single-slide-item p').addClass('fadeIn animated').show();
                $('.owl-item.active .single-slide-item .video-play-btn').addClass('bounceInUp animated').show();
            });

        }




        /*-------------------------------------------------------------------------*
         *               Logo Carousel   js                                        *
         *-------------------------------------------------------------------------*/
        $(".logo-carousel").owlCarousel({

            margin: 30,
            loop: true,
            dots: false,
            nav: false,
            autoplay: true,
            smartSpeed: 800,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 2
                },
                480: {
                    items: 3,
                },
                768: {
                    items: 4,
                },
                992: {
                    items: 6,
                }
            }
        });



        /*-------------------------------------------------------------------------*
         *                Case Study Carousel  js                                  *
         *-------------------------------------------------------------------------*/
        $(".case-studies-carousel").owlCarousel({
            items: 3,
            margin: 30,
            loop: true,
            dots: true,
            nav: false,
            autoplay: true,
            smartSpeed: 800,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2,
                },
                992: {
                    items: 3,
                }
            }
        });


        /*-------------------------------------------------------------------------*
         *                Testimonial Carousel js                                   *
         *-------------------------------------------------------------------------*/
        $(".testimonial-carousel").owlCarousel({
            items: 1,
            loop: true,
            dots: true,
            nav: false,
            autoplay: true,
            smartSpeed: 800,
        });



        /*-------------------------------------------------------------------------*
         *                  off-canvas-menu  js                                    *
         *-------------------------------------------------------------------------*/
        $('.menu-triger').on('click', function() {
            $('.off-canvas-menu, .off-canvas-menu-shade').addClass('active');
        })


        $('.menu-close, .off-canvas-menu-shade').on('click', function() {
            $('.off-canvas-menu, .off-canvas-menu-shade').removeClass('active');
        })


        $('.single-testimonial-box').mouseover(function() {
            $('.single-testimonial-box').removeClass('active')
            $(this).addClass('active')
        })


        /*-------------------------------------------------------------------------*
         *                  Search Pop up js                                       *
         *-------------------------------------------------------------------------*/
        $('a[href="#search"]').on('click', function(event) {
            event.preventDefault();
            $('#search').addClass('open');
            $('#search > form > input[type="search"]').focus();
        });

        $('#search, #search button.close').on('click keyup', function(event) {
            if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
                $(this).removeClass('open');
            }
        });



        /*-------------------------------------------------------------------------*
         *                magnific Popup   js                                      *
         *-------------------------------------------------------------------------*/
        $('.video-play-btn').magnificPopup({
            type: 'iframe'
        });



        /*-------------------------------------------------------------------------*
         *                Slick Nav  js                                      *
         *-------------------------------------------------------------------------*/
        $('#traffic-menu').slicknav({
            prependTo: '.traffic-mobile-menu-wrap',
            allowParentLinks: true
        });


        $(".boxed-layout").on("click", function() {
            $("body").addClass("boxed-layout").removeClass("wide-layout");
            $(".layout-changer span").removeClass("active");
            $(this).addClass("active")
        })

        $(".wide-layout").on("click", function() {
            $("body").addClass("wide-layout").removeClass("boxed-layout");
            $(".layout-changer span").removeClass("active");
            $(this).addClass("active")

        })





    }); // End Document Ready function


    jQuery(window).load(function() {


    });


}(jQuery));
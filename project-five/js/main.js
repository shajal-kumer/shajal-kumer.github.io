(function($) {
    'use strict';
    
    jQuery(document).ready(function() {



        /*--------Start Preloader---------*/

        $(window).load(function() {
            $("#Preloader").delay(300).fadeOut();
            $(".preloader-area").delay(600).fadeOut("slow");
        });
        /*--------End Preloader---------*/
        
       var spi = $('.s-p-img').height();
        $('.overlay-text').css('height', spi + 'px');


      // Scroll To menu background color change......
   //    var scroll_start = 0;
   //       var startchange = $('.navbar');
   //       var offset = startchange.offset();
   //       $(document).scroll(function() { 
   //          scroll_start = $(this).scrollTop();
   //          if(scroll_start > offset.top) {
   //        $('.navbar').css('background-color', '#222').addClass('fadeIn');
   //     } else {
   //        $('.navbar').css('background-color', 'transparent');
   //     }
   // });

////////////////////////////////////////////////////////////
c
/*-------Start scroll to menu-border js-------------*/
      $(window).scroll(function () {
          if ($(".navbar-fixed-top").offset().top > 50) {
              $(".navbar-fixed-top").addClass("menu-bg");

          } else {
              $(".navbar-fixed-top").removeClass("menu-bg");

          }
      });
  /*-------End scroll to menu-border js-------------*/

 // Scroll to menu active class active
        $(document).on("scroll", onScroll);
        function onScroll(event){
            var scrollPos = $(document).scrollTop();
            $('.mynav li a').each(function () {
                var currLink = $(this);
                var refElement = $(currLink.attr("href"));
                if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                    $('.mynav li a').removeClass("active");
                    currLink.addClass("active");
                }
                else{
                    currLink.removeClass("active");
                }
            });
        };


////////////////////////////////////////////////////

/*--------Bootstrap Menu Fix For Mobile----------*/

      $('.navbar-default .navbar-nav li a').on('click', function () {
          $('.navbar-collapse ').removeClass('in');
      });
      /*--------Bootstrap Menu Fix For Mobile-----------*/

// menu click to animate scroll
    $('.mynav li a').click(function(){
        $('html, body').animate({
            scrollTop: $( $(this).attr('href') ).offset().top
        }, 500);
        return false;
    });


    $('.mynav li a').click(function(){
        $('li a').removeClass("active");
        $(this).addClass("active");
    });

///////////////////////////////////////////////////

// scroll to Reveal or scroll on animate div
        window.sr = ScrollReveal({
          easing   : 'ease-in-out',
          distance: '200px',
          reset: true
        });
        sr.reveal('.ss-l, .welcome-title > h2', {
           origin: 'left',
        });
        sr.reveal('.ss-m,.more', {
           origin: 'bottom',
        });
        sr.reveal('.ss-r, .welcome-title > h1', {
           origin: 'right',
        });
        sr.reveal('.single-portfolio', {
           rotate   : { z: 90 },
        });
        sr.reveal('.sp-l', {
           rotate   : { z: -90 },
        });
        sr.reveal('.team-area-header', {
           scale: 1.3,
        });
        sr.reveal('.title-area', {
           origin: 'top',
        });


  
              
    }); 
})(jQuery);





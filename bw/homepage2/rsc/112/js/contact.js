jQuery(document).ready(function($){


	



	$(".scroll-top").on("click", function(){
        $("html, body").animate({
            scrollTop: 0
        },1000);
    });

	$(window).on("scroll", function(){
        if($(this).scrollTop() > 300) {
            $(".chat-box ").addClass("sticky-chatbox");
        } else{
            $(".chat-box ").removeClass("sticky-chatbox");
        }
    });
  

    $(".menu-trigger").on("click", function(){
        $(".off-canvas-menu, .off-canvas-overlay").addClass("active");
        return false;
    });
    $(".menu-close, .off-canvas-overlay").on("click", function(){
        $(".off-canvas-menu, .off-canvas-overlay").removeClass("active");
    });


    if ($(window).width() > 992) {
        $(window).on("scroll", function(){
            if($(this).scrollTop() > 40) {
                $(".header-area").addClass("stick-menu");
            } else{
                $(".header-area").removeClass("stick-menu");
            }
        });
    }



});
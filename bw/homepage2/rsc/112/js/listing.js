jQuery(document).ready(function($){


    var minValue;
    var maxValue;
    $("#range_49").ionRangeSlider({
        type: "double",
        min: 500,
        max: 100000,
        from: 23000,
        to: 80000,
        // prefix: "£",
        hide_min_max: true,
        step: 500,
        onFinish: function(data) {
            minValue = data.from;
            maxValue = data.to;
            alert("Your Min Value: " + minValue +"\n" +  "Your Max Value: " + maxValue);
        }
    });

    $(".scroll-top").on("click", function(){
        $("html, body").animate({
            scrollTop: 0
        },1000);
    });

    $('body').scrollspy({
        target : '.navbar-collapse',
        offset : 95
    });


    // toogle button
    $(".btn-grp").on('click', function(){
      $(".btn-grp").removeClass("active_btn");
      $(this).addClass("active_btn");
    });


    // card hover effect start
    $(".single-listing-item-1").on('click', function(event){
        var target = event.target;
        if(target.className == 'fa fa-car') {
            $(this).addClass("flip");
        }
    });

    $(".close-icon").on("click", function(event){
        $(this).context.parentElement.parentElement.classList.remove('flip');
    });
     // card hover effect end


    $(window).on("scroll", function(){
        if($(this).scrollTop() > 300) {
            $(".chat-box ").addClass("sticky-chatbox");
        } else{
            $(".chat-box ").removeClass("sticky-chatbox");
        }
    });

    $(".refine-text").on("click", function(){
        $(".refine-close, .width270").addClass("show-searchbox");
    });

    $(".refine-text").on("click", function(){
        $(this).addClass("show-box");
    });
    $(".refine-close").on("click", function(){
        $(".refine-text, .width270, .refine-clos").removeClass("show-box show-searchbox");
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


    // Code for alert boxes
    $(".min_year").change(function(){
        var min_year = $(".min_year").val();
        alert("You have seleted: " + min_year);
    });

    $(".max_year").change(function(){
        var max_year = $(".max_year").val();
        alert("You have selected: " + max_year);
    });

    
	/*
	$(".sort_by").change(function(){
        var sort_by = $(".sort_by").val();
        alert("You have selected " + sort_by);
    });
	*/
	
	
    $(".used-cars").change(function(){
        alert("You have selected used cars");
    });
    $(".new-cars").change(function(){
        alert("You have selected new cars");
    });

	
	
	// sticky sidebar
	if($(window).width() > 1182) {
        $(window).scroll(function() {
            var RefineSearchwidth = $(".refine-search-box").outerWidth();
            var CarListingHeigth = $(".car-listing-wrap-1").outerHeight() - 600;

            if( $(window).scrollTop() > 45 && $(window).scrollTop() < CarListingHeigth) {
                $(".refine-search-box").addClass("fixed");
                $(".car-listing-wrap-1").css("margin-left", RefineSearchwidth);
            } else {
                $(".refine-search-box").removeClass("fixed");
                $(".car-listing-wrap-1").css("margin-left", "inherit");
            }

        })
    }
	
	


});



    
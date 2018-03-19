jQuery(document).ready(function($){


    $('select').niceSelect();
    
	$(".homepage-slides-wrap").owlCarousel({
		items: 1,
		loop: true,
		nav: false,
		dots: true,
		autoplay: true
	});

    $(".testimonial").owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        dots: true,
        autoplay: true
    });
	
    $(".homepage-slides-wrap .owl-dots").addClass("container");
	
	//alert('Loading price slider with values ' + lowestPrice + ' ' + highestPrice);
	
	// Price Range
	var tmpMinValue;
	var tmpMaxValue;
	$("#range_price").ionRangeSlider({
		type: "double",
		min: lowestPrice,
		max: highestPrice,
		from: lowestPrice,
		to: highestPrice,
		prefix: "£",
		step: 500,
		onFinish: function(data) {
			tmpMinValue = data.from;
			tmpMaxValue = data.to;
			$("#min-price").text(tmpMinValue);
			$("#max-price").text(tmpMaxValue);
			//alert("Your Min Value: " + minValue +"\n" +  "Your Max Value: " + maxValue);
		}
	});
	
	
	//alert('Loading budget slider with values ' + minBudget + ' ' + maxBudget);

	// Price Range
	var tmpMinBudg;
	var tmpMaxBudg;
	$("#range_budget").ionRangeSlider({
		type: "double",
		min: minBudget,
		max: maxBudget,
		from: minBudget,
		to: maxBudget,
		prefix: "£",
		step: 25,
		onFinish: function(data) {
			tmpMinBudg = data.from;
			tmpMaxBudg = data.to;
			$("#min-budget").text(tmpMinBudg);
			$("#max-budget").text(tmpMaxBudg);
			//alert("Your Min Value: " + minValue +"\n" +  "Your Max Value: " + maxValue);
		}
	});


	$('#priceSlider').show();
	$('#budgetSlider').hide();
	
	
	
	/*
	// Monthly Budget
	var budget;
	$("#range_budget").ionRangeSlider({
		type: "single",
		min: minBudget,
		max: maxBudget,
		from: defBudget,
		prefix: "£",
		step: 25,
		onFinish: function(data) {
			budget = data.from;
			$("#budget").text(maxValue);
		}
	});
	*/

    $("#range_49").ionRangeSlider({
        type: "single",
        min: 150,
        max: 250,
        from: 200,
        to: 250,
        prefix: "£",
        step: 1,
        onFinish: function(data) {
            maxValue = data.from;
            //alert("Your Value: " + maxValue);
        }
    });
    

	
	//
    var single_logo_carousel = $('.single-logo-carousel');
    single_logo_carousel.owlCarousel({
        items: 8,
		slideBy: 8,
		rtl:true,
		loop: true,
        nav: true,
        dots: false,
        autoplay: false,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        responsive: {
            0: {
                items: Math.min(makeQty, 3),
                nav: false
            },
            576: {
                items: Math.min(makeQty, 4),
                nav: false
            },
            540: {
                items: Math.min(makeQty, 5),
                nav: false
            },
            768: {
                items: Math.min(makeQty, 6),
                nav: false
            },
            992: {
                items: Math.min(makeQty, 8),
            },
            1200: {
                items: Math.min(makeQty, 8)
            }

        }
    });


	//rtl:true,
	
    $(".single-bodytype-carousel").owlCarousel({
        items: 6,
		slideBy: 6,
		
        loop: true,
        nav: true,
        dots: false,
        autoplay: false,
        margin: 15,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        responsive: {
            0: {
                items: Math.min(bodyQty, 2),
                margin: 15,
                nav: false
            },
            576: {
                items: Math.min(bodyQty, 3),
                margin: 3,
                nav: false
            },
            768: {
                items: Math.min(bodyQty, 4),
                margin: 3,
                nav: false
            },
            992: {
                items: Math.min(bodyQty, 5)
            },
            1200: {
                items: Math.min(bodyQty, 6)
            }

        }
    });

    $(".ourcar-carousel-wrap").owlCarousel({
        items: 4,
        loop: true,
        nav: true,
        dots: true,
        autoplay: false,
        margin: 15,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        responsive: {
            0: {
                items: 1,
                margin: 0,
                nav: false
            },
            576: {
                items: 2,
                margin: 15,
                nav: false
            },
            768: {
                items: 3,
                margin: 15,
                nav: false
            },
            992: {
                items: 3,
                margin: 25,
            },
            1200: {
				items: 4
            }

        }
    });
	
	
	//$('#priceSlider').css({"visibility": "hidden", "height": "0"});
	//$('#budgetSlider').css({"visibility": "visible", "height": "100px"});
	


	/*
    // Code for alert boxes
    $('.brand').change(function(){
        var brand = $(".brand").val();
         alert("you have selected: " + brand);   
    });
    $('.model').change(function(){
        var model = $(".model").val();
         alert("you have selected: " + model);   
    });
    $('.type').change(function(){
        var type = $(".type").val();
         alert("you have selected: " + type);   
    });
    
    $('.max-yr').change(function(){
        var maxYear = $(".max-yr").val();
         alert("you have selected: " + maxYear);   
    });
	*/
	
	
	/*
   $('.submit-btn').click(function(){
        
        var make = $("#Make").val();
        var model = $(".model").val();
        var type = $(".type").val();
        var maxAge = $("#maxAge").val();
        alert('You have submitted: \n' + "Make: " + make + "\nBrand Model: " + model+ "\nBody Type: "+ type + "\nMax age: "+ maxAge +"\nMinimum: " + minValue +"\nMaximum: "+ maxValue);
        
    });
	*/

	
	/*
    $('.submit-btn-2').click(function(){
        
        alert('You have submitted: \n' +"\n Maximum: "+ maxValue);
        
    });
	*/

    $(".switch input[type='checkbox']").change(function(){
        if(this.checked){
            //$('#priceSlider').css({"visibility": "hidden", "height": "0"});
			//$('#budgetSlider').css({"visibility": "visible", "height": "100px"});
			
			
			$('#priceSlider').hide();
			$('#budgetSlider').show();
			
			
        } else {
            //$('#budgetSlider').css({"visibility": "hidden", "height": "0"});
			//$('#priceSlider').css({"visibility": "visible", "height": "100px"});
			
			
			$('#priceSlider').show();
			$('#budgetSlider').hide();
			
			
        }
    })
    

    $(".menu-trigger").on("click", function(){
        $(".off-canvas-menu, .off-canvas-overlay").addClass("active");
        return false;
    });
    $(".menu-close, .off-canvas-overlay").on("click", function(){
        $(".off-canvas-menu, .off-canvas-overlay").removeClass("active");
    });


	/*
	$(".bodytype-carousel-wrap").magnificPopup({
		type: 'image',
        gallery: {
            enabled: true
        }
	});
	*/

    $(".video-play-btn").magnificPopup({
        type:'video',
    });


    $(window).on("scroll", function(){
        if($(this).scrollTop() > 300) {
            $(".chat-box ").addClass("sticky-chatbox");
        } else{
            $(".chat-box ").removeClass("sticky-chatbox");
        }
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
    

    $(".scroll-top").on("click", function(){
        $("html, body").animate({
            scrollTop: 0
        },1000);
    });




    $(window).on("load", function() {
        var nb = $('.ourcar-carousel-wrap .owl-dots > div').length;
        $(".ourcar-carousel-wrap .owl-dots").css({
            "width": nb * 30
        })
    })

    

    $(".rac").on("click", function(){
        $(".rac-text-wrap").addClass("open-rac");
    });
    $(".rac-close").on("click", function(){
        $(".rac-text-wrap").removeClass("open-rac");
    });





});
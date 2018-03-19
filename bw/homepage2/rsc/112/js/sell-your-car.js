
jQuery(document).ready(function($){
	 

    /* SELL YOUR CARR js*/
    
    $(".input-reg").keyup(function(){
        $(".submit-reg-btn").removeAttr('disabled');
    });
    $(".submit-reg-btn").on('click', function() {
        $('.booking-form-wrap').fadeIn('slow')
    })
    $(".submit-reg-btn").on('click', function() {
        $(this).hide();
        var spin = $('<i class="fa-li fa fa-spinner fa-spin">');
        $('.submit-reg-btn-wrap').append(spin);
    })
    
    $(".btn-submit").on('click', function() {
        $('.submit-reg-btn-wrap i').hide();
        $('.submit-reg-btn-wrap .submit-reg-btn').show();
         $('.booking-form-wrap').fadeOut('slow');
         $(".input-reg").val('');
    })

    $('.booking-form fieldset:first-child').fadeIn('slow');
    $('.booking-form input[type="text"], .booking-form textarea').on('focus', function () {
        $(this).removeClass('input-error');
    });
    $('.booking-form .btn-next').on('click', function(){
        var next_step = true;
        var parent_fieldset = $(this).parents('fieldset');

         parent_fieldset.find('input[type="text"], textarea').each(function () {
            if ($(this).val() == "") {
                $(this).addClass('input-error');
                next_step = false;
            } else {
                $(this).removeClass('input-error');
            }
        });
         if (next_step) {
             parent_fieldset.next().fadeIn('slow');
             parent_fieldset.css({
                'display': 'none'
            });
             $('#progressbar li.active').next().addClass('active');
        }
         
    })

    $('.booking-form .btn-prev').on('click', function(){
        $(this).parents('fieldset').prev().fadeIn('slow');
         $(this).parent('fieldset').css({
            'display': 'none'
        });

         $('#progressbar li.active:last').removeClass('active');
    })

    // submit
    $('.booking-form').on('submit', function (e) {
        $(this).find('input[type="text"],textarea').each(function () {
            if ($(this).val() == "") {
                e.preventDefault();
                $(this).addClass('input-error');
            } else {
                $(this).removeClass('input-error');
            }
        });

    });


    // $(window).on("scroll", function(){
    //     if($(this).scrollTop() > 0) {
    //         $(".chat-box ").addClass("sticky-chatbox");
    //     } else{
    //         $(".chat-box ").removeClass("sticky-chatbox");
    //     }
    // });

    $(".menu-trigger").on("click", function(){
        $(".off-canvas-menu, .off-canvas-overlay").addClass("active");
        return false;
    });
    $(".menu-close, .off-canvas-overlay").on("click", function(){
        $(".off-canvas-menu, .off-canvas-overlay").removeClass("active");
    });

    $(window).on("scroll", function(){
        if($(this).scrollTop() > 40) {
            $(".header-area").addClass("stick-menu");
        } else{
            $(".header-area").removeClass("stick-menu");
        }
    });



	
	// $('.select-item').on('keypress change', 'input.only-int', function(){
	// 	var checkint = parseInt($(this).val());
	// 	if(!checkint){
	// 		alert('Only Numbers');
	// 		$(this).val(0);
	// 	}
	// });
	
	// $('.tab-one').click(function(){
	// 	$('.tabtwo').toggleClass('active');
	// });	
	// $('.tab-two').click(function(){
	// 	$('.tabthree').toggleClass('active');
	// });	
	// $('.tab-three').click(function(){
	// 	$('.tabfour').toggleClass('active');
	// });	
	// $('.tab-four').click(function(){
	// 	$('.tabfive').toggleClass('active');
	// });
	
	// $('.inc.pls').click(function(){
	// 	var inptval = parseInt($(this).parent().find('input').val());
	// 	//alert(inptval);
	// 	if(!inptval){
	// 		inptval = 0;
	// 	}
	// 	inptval++;
	// 	$(this).parent().find('input').val(inptval);
	// 	//alert(inptval);
	// });
	
	// $('.inc.min').click(function(){
	// 	var inptval = parseInt($(this).parent().find('input').val());
	// 	//alert(inptval);
	// 	if(!inptval){
	// 		inptval = 0;
	// 	}else{
	// 		inptval--;
	// 		$(this).parent().find('input').val(inptval);
	// 		//alert(inptval);
	// 	}
	// });



});


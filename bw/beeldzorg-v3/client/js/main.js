(function($) {
  "use strict";

  jQuery(document).ready(function($) {
    $("#Elchat").ChatSocket({
      lblEntradaNombre: "Enter a user name in the field below for the chat room"
    });

    $(".chat__box--btn").on("click", function() {
      $(".chat__box-field").toggleClass("open");
      if ($(".chat__box-field").hasClass("open")) {
        $(this).removeClass("active");
      }
    });

    $("#txtMensaje").on("click", function() {
      $(".chat__box--btn").removeClass("active");
    });
  });

  jQuery(window).load(function() {});
})(jQuery);

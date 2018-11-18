(function($) {
  "use strict";

  jQuery(document).ready(function($) {
    $(".chat__box--btn").on("click", function() {
      $(".chat__box-field").toggleClass("open");
      if ($(".chat__box-field").hasClass("open")) {
        $(this).removeClass("active");
      }
    });

    $("#txtMensaje").on("click", function() {
      console.log("Hello");

      $(".chat__box--btn").removeClass("active");
    });
  });

  jQuery(window).load(function() {});
})(jQuery);

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
      $(".chat__box--btn").removeClass("active");
    });

    $(".info-left-icon button").on("click", function() {
      $(".info-list").toggleClass("active");

      DetectRTC.load(function() {
        if (DetectRTC.isWebRTCSupported === true) {
          $(".info-list li:eq(0) span").text("yes");
        } else {
          $(".info-list li:eq(0) span").text("No");
        }
        if (DetectRTC.hasSpeakers === true) {
          $(".info-list li:eq(1) span").text("Yes");
        } else {
          $(".info-list li:eq(1) span").text("No");
        }
        if (DetectRTC.hasWebcam === true) {
          $(".info-list li:eq(2) span").text("Yes");
        } else {
          $(".info-list li:eq(2) span").text("No");
        }
        if (
          navigator.connection &&
          navigator.connection.type === "cellular" &&
          navigator.connection.downlinkMax <= 0.115
        ) {
          $(".info-list li:eq(3) span").text("Yes");
        } else {
          $(".info-list li:eq(3) span").text("No");
        }
        if (DetectRTC.isMobileDevice === true) {
          $(".info-list li:eq(4) span").text("Yes");
        } else {
          $(".info-list li:eq(4) span").text("No");
        }
        if (DetectRTC.isWebsiteHasWebcamPermissions === true) {
          $(".info-list li:eq(5) span").text("Yes");
        } else {
          $(".info-list li:eq(5) span").text("No");
        }
      });
    });
  });

  jQuery(window).load(function() {});
})(jQuery);

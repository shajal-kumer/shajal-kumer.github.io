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

    setInterval(() => {
      if ($(window).innerWidth() < 992) {
        $("#iframeCall")
          .contents()
          .find(".patient-two .media-container")
          .css({
            width: 100 + "%",
            height: $("#iframeCall").innerHeight() / 2 + "px"
          });
        $("#iframeCall")
          .contents()
          .find(".patient-two .media-box")
          .css({
            height: 100 + "%"
          });
        $("#iframeCall")
          .contents()
          .find(".patient-two .media-box video")
          .css({
            height: 100 + "%"
          });

        var patientIframeHight = localStorage.getItem("iframeCallHeight");
        $("#iframeCall")
          .contents()
          .find(".patient-one .media-container")
          .css("height", "");
        $("#iframeCall")
          .contents()
          .find(".patient-one .media-box video")
          .css("height", patientIframeHight + "px");
      } else {
        $("#iframeCall")
          .contents()
          .find(".patient-two .media-container")
          .css({
            width: 50 + "%",
            float: "left"
          });

        $("#iframeCall")
          .contents()
          .find(".patient-one .media-container")
          .css({
            width: 100 + "%",
            float: "none"
          });
      }
    }, 1000);
  });

  jQuery(window).load(function() {});
})(jQuery);

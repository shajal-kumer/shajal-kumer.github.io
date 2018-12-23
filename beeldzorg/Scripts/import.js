// Default Google Drive Link
var gDrive = "https://drive.google.com/uc?export=download&id=";

// To Fetch Required Information From URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Get FileId From Url
function getIdFromUrl(url) { return url.match(/[-\w]{25,}/); }

$(function () {
    // Import Button Click
    $("#btnImport").click(function () {
        // Reset UI Elements
        $(".msg-success").slideUp();
        $(".icon-default").hide();
        $(".icon-load").show();
        $("#btnImport").attr("disabled", true);

        var _importLink = $("#txtLink").val();
        var downloadLink = "";
        if ($.trim(_importLink) == "") {
            $("#txtLink").focus();
            return;
        }
        else if (_importLink.includes("drive.google.com") && getParameterByName('id', _importLink).length > 0) {
            downloadLink = gDrive + getParameterByName('id', _importLink);
        }
        else if (_importLink.includes("docs.google.com") && _importLink.includes("/d")) {
            debugger
            var temp = getIdFromUrl(_importLink);
            downloadLink = temp.input.substring(0, temp.input.indexOf(temp[0])) + temp[0] +  "/export?format=xlsx&id=" + temp[0];
        }
        else if (_importLink.includes("iframe") && _importLink.includes("src") && _importLink.includes("onedrive.live.com/embed")) {
            downloadLink = $($.parseHTML(_importLink)[0]).attr("src");
            downloadLink = downloadLink.replace("embed", "download");
        }
        else if (!_importLink.includes("iframe") && !_importLink.includes("src") && _importLink.includes("//onedrive.live.com/embed")) {
            downloadLink = _importLink.replace("embed", "download");
        }
        else
        {
            $(".msg-success").hide();
            $(".msg-error").text("Provided link is invalid.").slideDown();
            $(".icon-default").show();
            $(".icon-load").hide();
            $("#btnImport").attr("disabled", false);
            return;
        }
        $.ajax({
            type: "POST",
            url: "importData.aspx/importExcel",
            data: "{downloadLink: '" + downloadLink + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (res) {
                if (res && res.d == "success") {
                    $(".msg-success").slideDown();
                    $(".msg-error").hide();
                }
                else if (res && res.d != "success") {
                    $(".msg-success").hide();
                    $(".msg-error").text(res.d).slideDown();
                }
            },
            error: function (e, x) {
                $(".msg-success").hide();
                $(".msg-error").text(e.message).slideDown();
            },
            complete: function () {
                $(".icon-default").show();
                $(".icon-load").hide();
                $("#btnImport").attr("disabled", false);
            }
        });
    });
});

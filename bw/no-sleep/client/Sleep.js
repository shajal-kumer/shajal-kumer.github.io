var btnEnter = document.querySelector(".btn-enter");
var popup2 = document.querySelector("#popup2");

var noSleep = new NoSleep();
function enableNoSleep(e) {
  noSleep.enable();
  popup2.style.display = "none";
  e.preventDefault();
}

btnEnter.addEventListener("click", enableNoSleep, false);
popup2.style.display = "block";
function isMobile() {
  try {
    if (
      /Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return true;
    }
    return false;
  } catch (e) {
    console.log("Error in isMobile");
    return false;
  }
}
if (isMobile()) {
  //   popup2.style.display = "block";
}

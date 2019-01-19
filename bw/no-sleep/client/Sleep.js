var btnEnter = document.querySelector(".btn-enter");
var popup2 = document.querySelector("#popup2");

var noSleep = new NoSleep();
function enableNoSleep() {
  noSleep.enable();
  popup2.style.display = "none";
}

btnEnter.addEventListener("click", enableNoSleep, false);

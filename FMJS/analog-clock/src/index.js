let hour = document.querySelector(".hour");
let minute = document.querySelector(".minute");
let second = document.querySelector(".second");

function setTime(element, degree) {
  degree -= 90;
  element.style.transform = `rotateZ(${degree}deg)`;
}

function tick() {
  let d = new Date();
  let h = d.getHours();
  let m = d.getMinutes();
  let s = d.getSeconds();

  // set hours
  setTime(hour, h * 30);
  setTime(minute, m * 6);
  setTime(second, s * 6);
}

setInterval(tick, 1000);

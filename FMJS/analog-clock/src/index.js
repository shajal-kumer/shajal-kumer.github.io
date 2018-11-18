let hour = document.querySelector(".hour");
let minute = document.querySelector(".minute");
let second = document.querySelector(".second");

function setTime(element, degree) {
  element.style.transform = `rotateZ(${degree}deg)`;
}

function tick() {
  let d = new Date();
  let h = d.getHours();
  let m = d.getMinutes();
  let s = d.getSeconds();

  setTime(second, s * 6);
  let secondsDegrees = (s / 60) * 360 - 90;
  setTime(second, secondsDegrees);
  console.log(secondsDegrees);

  setTime(minute, m * 6);
  let minsDegrees = (m / 60) * 360 + (s / 60) * 6 - 90;
  setTime(minute, minsDegrees);

  let hourDegree = (h / 12) * 360 + (m / 60) * 30 - 90;
  setTime(hour, hourDegree);
}

setInterval(tick, 1000);

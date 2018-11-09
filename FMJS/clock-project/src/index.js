let result = document.querySelector(".result");

function setTime() {
  let time = new Date();
  let h = time.getHours();
  let m = time.getMinutes();
  let s = time.getSeconds();
  let session = "AM";

  if (h === 0) {
    h = 12;
  }
  if (h > 12) {
    session = "PM";
    h -= 12;
  }

  result.innerHTML = `${h} : ${m} : ${s} ${session}`;
}

setInterval(setTime, 1000);

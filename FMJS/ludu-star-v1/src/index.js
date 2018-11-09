 var cube = document.getElementById("cube");
      let action = document.querySelector(".action");
      let img = document.querySelector(".image");

      var min = 1;
      var max = 24;

      action.onclick = function() {
        img.removeAttribute("src");
        img.classList.remove("show");

        var xRand = getRandom(max, min);
        var yRand = getRandom(max, min);

        cube.style.webkitTransform =
          "rotateX(" + xRand + "deg) rotateY(" + yRand + "deg)";
        cube.style.transform =
          "rotateX(" + xRand + "deg) rotateY(" + yRand + "deg)";
        setTimeout(() => {
          let ludo = Math.ceil(Math.random() * 6);
          img.classList.add("show");
          img.setAttribute("src", "src/dice-" + ludo + ".png");
          
        }, 6000);
      };

      function getRandom(max, min) {
        return (Math.floor(Math.random() * (max - min)) + min) * 90;
      }
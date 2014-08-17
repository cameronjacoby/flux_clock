$(document).ready(function() {
  var canvas = $('#canvas')[0],
    context = canvas.getContext('2d'),
    body = $('body');

  (function(clock, $, undefined) {

    var now,
      hour,
      min,
      sec,
      w = canvas.width,
      h = canvas.height,
      center = w / 2;

    var makeMarks = function(distance) {
      var theta = 0;

      for (var i = 0; i < 60; i += 1) {
        theta = theta + (6 * Math.PI / 180);
        x = center + distance * Math.cos(theta);
        y = center + distance * Math.sin(theta);

        context.beginPath();
        context.fillStyle = '#A8A7B0';
        context.arc(x, y, 1, 0, Math.PI * 2, true);
        context.fill();
        context.closePath();
      }
    };

    var makeSecHand = function() {
      makeMarks(100);
      var theta = (6 * Math.PI / 180);
      var x = center + 100 * Math.cos(sec * theta - Math.PI / 2);
      var y = center + 100 * Math.sin(sec * theta - Math.PI / 2);

      context.fillStyle = '#28ca9c';
      context.beginPath();
      context.arc(x, y, 5, 0, 2 * Math.PI);
      context.fill();
    };

    var makeMinHand = function() {
      makeMarks(180);
      var theta = (6 * Math.PI / 180);
      var x = center + 180 * Math.cos((min + (sec / 60)) * theta - Math.PI / 2);
      var y = center + 180 * Math.sin((min + (sec / 60)) * theta - Math.PI / 2);

      context.fillStyle = '#28ca9c';
      context.beginPath();
      context.arc(x, y, 10, 0, 2 * Math.PI);
      context.fill();
    };

    var makeNumbers = function() {
      var theta = 0;

      for (var i = 4; i <= 16; i += 1) {
        theta = theta + (30 * Math.PI / 180);
        x = center + 250 * Math.cos(theta);
        y = center + 250 * Math.sin(theta);

        context.font = "16px 'Futura'";
        context.textBaseline = 'middle';
        context.textAlign = 'center';
        context.fillStyle = '#A8A7B0';

        if (i < 13) {
          context.fillText(i, x, y);
        } else if (i >= 13) {
          context.fillText(i - 12, x, y);
        }
      }
    };

    var makeHourHand = function() {
      makeNumbers();
      hour = hour >= 12 ? hour - 12 : hour;
      var theta = (30 * Math.PI / 180),
        x = center + 250 * Math.cos((hour + (min / 60) + (sec / 3600)) * theta - Math.PI / 2),
        y = center + 250 * Math.sin((hour + (min / 60) + (sec / 3600)) * theta - Math.PI / 2);

      context.fillStyle = '#28ca9c';
      context.beginPath();
      context.arc(x, y, 20, 0, 2 * Math.PI);
      context.fill();
    };

    var makeClock = function() {
      makeHourHand();
      makeMinHand();
      makeSecHand();
    };

    var changeColor = function() {
      var r,
        g,
        b;

      var modCheck = function() {
        if (min % 4 === 0) {
          min = min;
        }
        else if (min % 2 === 0) {
          min = min + 2;
        }
        else if (min % 3 === 0) {
          if (min === 9 || min === 21 || min === 33 || min === 45 || min === 57) {
            min = min + 3;
          }
          else {
            min = min + 1;
          }
        }
        else if (min % 1 === 0) {
          if (min === 7 || min === 11 || min === 19 || min === 23 || min === 31 ||
            min === 35 || min === 47 || min === 43 || min === 55 || min === 59) {
              min = min + 1;
          }
          else {

            min = min + 3;
          }
        }
      };

      if (hour < 1) {
        modCheck();
        r = 20 - 0.25 * min;
        g = 22 - 0.25 * min;
        b = 59 - 0.75 * min;
      }

      else if (hour < 2) {
        modCheck();
        r = 15 + 0.75 * min;
        g = 6 + 0.25 * min;
        b = 5 + 0.25 * min;
      }

      else if (hour < 3) {
        modCheck();
        r = 63 + 0.75 * min;
        g = 25 + 0.25 * min;
        b = 21 + 0.25 * min;
      }

      else if (hour < 4) {
        modCheck();
        r = 111 + 0.75 * min;
        g = 44 + 0.25 * min;
        b = 36 + 0.25 * min;
      }

      else if (hour < 5) {
        modCheck();
        r = 159 + 0.75 * min;
        g = 62 + 0.25 * min;
        b = 52 + 0.25 * min;
      }

      else if (hour < 6) {
        modCheck();
        r = 207 + 0.75 * min;
        g = 81 + 0.25 * min;
        b = 67 + 0.25 * min;
      }

      else if (hour < 7) {
        modCheck();
        r = 255;
        g = 100 + 0.25 * min;
        b = 83;
      }

      else if (hour < 8) {
        modCheck();
        r = 255;
        g = 122 + 0.25 * min;
        b = 86;
      }

      else if (hour < 9) {
        modCheck();
        r = 255;
        g = 144 + 0.25 * min;
        b = 88;
      }

      else if (hour < 10) {
        modCheck();
        r = 255;
        g = 166 + 0.25 * min;
        b = 91;
      }

      else if (hour < 11) {
        modCheck();
        r = 255;
        g = 188 + 0.25 * min;
        b = 93;
      }

      else if (hour < 12) {
        modCheck();
        r = 255;
        g = 210 + 0.25 * min;
        b = 95 + 1.25 * min;
      }

      else if (hour < 13) {
        modCheck();
        r = 255;
        g = 230 + 0.25 * min;
        b = 165 + 1.25 * min;
      }

      else if (hour < 14) {
        modCheck();
        r = 255 - 0.5 * min;
        g = 249;
        b = 234 + 0.25 * min;
      }

      else if (hour < 15) {
        modCheck();
        r = 227 - 0.5 * min;
        g = 244;
        b = 245 + 0.25 * min;
      }

      else if (hour < 16) {
        modCheck();
        r = 199 - 1.25 * min;
        g = 239 - 0.5 * min;
        b = 255;
      }

      else if (hour < 17) {
        modCheck();
        r = 122 - 1.25 * min;
        g = 208 - 0.5 * min;
        b = 255;
      }

      else if (hour < 18) {
        modCheck();
        r = 44 + 0.5 * min;
        g = 177 - 0.75 * min;
        b = 255;
      }

      else if (hour < 19) {
        modCheck();
        r = 72 + 0.5 * min;
        g = 130 - 0.75 * min;
        b = 255;
      }

      else if (hour < 20) {
        modCheck();
        r = 100 - 0.25 * min;
        g = 83;
        b = 255 - 0.5 * min;
      }

      else if (hour < 21) {
        modCheck();
        r = 85 - 0.25 * min;
        g = 77;
        b = 226 - 0.5 * min;
      }

      else if (hour < 22) {
        modCheck();
        r = 69 - 0.25 * min;
        g = 71 - 0.25 * min;
        b = 196 - 0.75 * min;
      }

      else if (hour < 23) {
        modCheck();
        r = 53 - 0.25 * min;
        g = 55 - 0.25 * min;
        b = 150 - 0.75 * min;
      }

      else {
        modCheck();
        r = 37 - 0.25 * min;
        g = 38 - 0.25 * min;
        b = 105 - 0.75 * min;
      }

      body.css("background-color", "rgb(" + r + ", " + g + ", " + b + ")");
    };

    var getTime = function() {
      now = new Date();
      hour = now.getHours();
      min = now.getMinutes();
      sec = now.getSeconds();

      console.log(hour, min, sec);
    };

    clock.display = function() {
      context.clearRect(0, 0, w, h);
      getTime();
      changeColor();
      makeClock();
    };


  }(window.clock = window.clock || {}, jQuery));

  clock.display();

  setInterval(clock.display, 1000);

});
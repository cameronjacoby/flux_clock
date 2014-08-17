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
      var theta = 0,
        x,
        y;

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
      var theta = (6 * Math.PI / 180),
        x = center + 100 * Math.cos(sec * theta - Math.PI / 2),
        y = center + 100 * Math.sin(sec * theta - Math.PI / 2);

      context.fillStyle = '#28ca9c';
      context.beginPath();
      context.arc(x, y, 5, 0, 2 * Math.PI);
      context.fill();
    };


    var makeMinHand = function() {
      makeMarks(180);
      var theta = (6 * Math.PI / 180),
        x = center + 180 * Math.cos((min + (sec / 60)) * theta - Math.PI / 2),
        y = center + 180 * Math.sin((min + (sec / 60)) * theta - Math.PI / 2);

      context.fillStyle = '#28ca9c';
      context.beginPath();
      context.arc(x, y, 10, 0, 2 * Math.PI);
      context.fill();
    };


    var makeNumbers = function() {
      var theta = 0,
        x,
        y;

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
        b,
        pickColor;

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
          } else {
            min = min + 1;
          }
        }
        else if (min % 1 === 0) {
          if (min === 7 || min === 11 || min === 19 || min === 23 || min === 31 ||
            min === 35 || min === 47 || min === 43 || min === 55 || min === 59) {
              min = min + 1;
          } else {
            min = min + 3;
          }
        }
      };

      modCheck();

      if (hour < 1) {
        r = 20 - 0.25 * min;
        g = 22 - 0.25 * min;
        b = 59 - 0.75 * min;
      }

      else if (hour < 6) {
        pickColor = function(red, green, blue) {
          r = red + 0.75 * min;
          g = green + 0.25 * min;
          b = blue + 0.25 * min;
        };
        if (hour < 2) {
          pickColor(15, 6, 5);
        }
        else if (hour < 3) {
          pickColor(63, 25, 21);
        }
        else if (hour < 4) {
          pickColor(111, 44, 36);
        }
        else if (hour < 5) {
          pickColor(159, 62, 52);
        } else {
          pickColor(207, 81, 67);
        }
      }

      else if (hour < 11) {
        pickColor = function(green, blue) {
          r = 255;
          g = green + 0.25 * min;
          b = blue;
        };
        if (hour < 7) {
          pickColor(100, 83);
        }
        else if (hour < 8) {
          pickColor(122, 86);
        }
        else if (hour < 9) {
          pickColor(144, 88);
        }
        else if (hour < 10) {
          pickColor(166, 91);
        } else {
          pickColor(188, 93);
        }
      }

      else if (hour < 13) {
        pickColor = function(green, blue) {
          r = 255;
          g = green + 0.25 * min;
          b = blue + 1.25 * min;
        };
        if (hour < 12) {
          pickColor(210, 95);
        } else {
          pickColor(230, 165);
        }
      }

      else if (hour < 15) {
        pickColor = function(red, green, blue) {
          r = red - 0.5 * min;
          g = green;
          b = blue + 0.25 * min;
        };
        if (hour < 14) {
          pickColor(255, 249, 234);
        } else {
          pickColor(227, 244, 245);
        }
      }

      else if (hour < 17) {
        pickColor = function(red, green) {
          r = red - 1.25 * min;
          g = green - 0.5 * min;
          b = 255;
        };
        if (hour < 16) {
          pickColor(199, 239);
        } else {
          pickColor(122, 208);
        }
      }

      else if (hour < 19) {
        pickColor = function(red, green) {
          r = red + 0.5 * min;
          g = green - 0.75 * min;
          b = 255;
        };
        if (hour < 18) {
          pickColor(44, 177);
        } else {
          pickColor(72, 130);
        }
      }

      else if (hour < 21) {
        pickColor = function(red, green, blue) {
          r = red - 0.25 * min;
          g = green;
          b = blue - 0.5 * min;
        };
        if (hour < 20) {
          pickColor(100, 83, 255);
        } else {
          pickColor(85, 77, 226);
        }
      }

      else {
        pickColor = function(red, green, blue) {
          r = red - 0.25 * min;
          g = green - 0.25 * min;
          b = blue - 0.75 * min;
        };
        if (hour < 22) {
          pickColor(69, 71, 196);
        }
        else if (hour < 23) {
          pickColor(53, 55, 150);
        } else {
          pickColor(37, 38, 105);
        }
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
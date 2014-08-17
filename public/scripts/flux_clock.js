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
      center = w / 2,
      complement;


    // function to create hour, min, sec circles
    var fillCircles = function(radius, x, y) {
      context.fillStyle = complement;
      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI);
      context.fill();
    };


    // function to make min & sec marks
    var makeMarks = function(distance) {
      var theta = 0,
        x,
        y;

      for (var i = 0; i < 60; i += 1) {
        theta = theta + (6 * Math.PI / 180);
        x = center + distance * Math.cos(theta);
        y = center + distance * Math.sin(theta);

        context.beginPath();
        context.fillStyle = complement;
        context.arc(x, y, 1, 0, Math.PI * 2, true);
        context.fill();
        context.closePath();
      }
    };


    // function to make sec marks & sec hand
    var makeSecHand = function() {
      makeMarks(100);
      var theta = (6 * Math.PI / 180),
        x = center + 100 * Math.cos(sec * theta - Math.PI / 2),
        y = center + 100 * Math.sin(sec * theta - Math.PI / 2);

      fillCircles(5, x, y);
    };


    // function to make min marks & min hand
    var makeMinHand = function() {
      makeMarks(180);
      var theta = (6 * Math.PI / 180),
        x = center + 180 * Math.cos((min + (sec / 60)) * theta - Math.PI / 2),
        y = center + 180 * Math.sin((min + (sec / 60)) * theta - Math.PI / 2);

      fillCircles(10, x, y);
    };


    // function to make numbers for hours
    var makeNumbers = function() {
      var theta = 0,
        x,
        y;

      for (var i = 4; i <= 16; i += 1) {
        theta = theta + (30 * Math.PI / 180);
        x = center + 250 * Math.cos(theta);
        y = center + 250 * Math.sin(theta);

        context.font = '16px "Futura"';
        context.textBaseline = 'middle';
        context.textAlign = 'center';
        context.fillStyle = complement;

        if (i < 13) {
          context.fillText(i, x, y);
        } 
        else if (i >= 13) {
          context.fillText(i - 12, x, y);
        }
      }
    };


    // function to make hour numbers & hour hand
    var makeHourHand = function() {
      makeNumbers();
      hour = hour >= 12 ? hour - 12 : hour;
      var theta = (30 * Math.PI / 180),
        x = center + 250 * Math.cos((hour + (min / 60) + (sec / 3600)) * theta - Math.PI / 2),
        y = center + 250 * Math.sin((hour + (min / 60) + (sec / 3600)) * theta - Math.PI / 2);

      fillCircles(20, x, y);
    };


    // makeClock calls functions to make hours, mins, secs
    var makeClock = function() {
      makeHourHand();
      makeMinHand();
      makeSecHand();
    };


    // function to change background color based on time
    var changeColor = function() {
      var m,
        r,
        g,
        b;

      // color incrememts only work on mins that are multiples of 4
      // transform each minute into a multiple of four
      // background will increment color every 4 mins
      var modCheck = function() {
        if (min % 4 === 0) {
          m = min;
        }
        else if (min % 2 === 0) {
          m = min + 2;
        }
        else if (min % 3 === 0) {
          if (min === 9 || min === 21 || min === 33 || min === 45 || min === 57) {
            m = min + 3;
          }
          else {
            m = min + 1;
          }
        }
        else if (min % 1 === 0) {
          if (min === 7 || min === 11 || min === 19 || min === 23 || min === 31 ||
            min === 35 || min === 47 || min === 43 || min === 55 || min === 59) {
              m = min + 1;
          }
          else {
            m = min + 3;
          }
        }
      };

      // call modCheck to transform mins into multiples of 4
      modCheck();

      // pickColor sets up formula to increment background color
      var pickColor = function(red, green, blue, rTimes, gTimes, bTimes) {
        r = red + rTimes * m;
        g = green + gTimes * m;
        b = blue + bTimes * m;
      };

      // set starting point and color increments for every hour
      if (hour < 1) {
        pickColor(20, 22, 59, -0.25, -0.25, -0.75);
      }
      else if (hour < 2) {
        pickColor(15, 6, 5, 0.75, 0.25, 0.25);
      }
      else if (hour < 3) {
        pickColor(63, 25, 21, 0.75, 0.25, 0.25);
      }
      else if (hour < 4) {
        pickColor(111, 44, 36, 0.75, 0.25, 0.25);
      }
      else if (hour < 5) {
        pickColor(159, 62, 52, 0.75, 0.25, 0.25);
      } 
      else if (hour < 6) {
        pickColor(207, 81, 67, 0.75, 0.25, 0.25);
      }
      else if (hour < 7) {
        pickColor(255, 100, 83, 0, 0.25, 0);
      }
      else if (hour < 8) {
        pickColor(255, 122, 86, 0, 0.25, 0);
      }
      else if (hour < 9) {
        pickColor(255, 144, 88, 0, 0.25, 0);
      }
      else if (hour < 10) {
        pickColor(255, 166, 91, 0, 0.25, 0);
      }
      else if (hour < 11) {
        pickColor(255, 188, 93, 0, 0.25, 0);
      }
      else if (hour < 12) {
        pickColor(255, 210, 95, 0, 0.25, 1.25);
      }
      else if (hour < 13) {
        pickColor(255, 230, 165, 0, 0.25, 1.25);
      }
      else if (hour < 14) {
        pickColor(255, 249, 234, -0.5, 0, 0.25);
      }
      else if (hour < 15) {
        pickColor(227, 244, 245, -0.5, 0, 0.25);
      }
      else if (hour < 16) {
        pickColor(199, 239, 255, -1.25, -0.5, 0);
      }
      else if (hour < 17) {
        pickColor(122, 208, 255, -1.25, -0.5, 0);
      }
      else if (hour < 18) {
        pickColor(44, 177, 255, 0.5, -0.75, 0);
      }
      else if (hour < 19) {
        pickColor(72, 130, 255, 0.5, -0.75, 0);
      }
      else if (hour < 20) {
        pickColor(100, 83, 255, -0.25, 0, -0.5);
      }
      else if (hour < 21) {
        pickColor(85, 77, 226, -0.25, 0, -0.5);
      }
      else if (hour < 22) {
        pickColor(69, 71, 196, -0.25, -0.25, -0.75);
      }
      else if (hour < 23) {
        pickColor(53, 55, 150, -0.25, -0.25, -0.75);
      }
      else {
        pickColor(37, 38, 105, -0.25, -0.25, -0.75);
      }

      // set background rgb color that corresponds to time
      body.css('background-color', 'rgb(' + r + ', ' + g + ', ' + b + ')');

      // find complementary color for clock face
      complement = 'rgb(' + (255 - r) + ', ' + (255 - g) + ', ' + (255 - b) + ')';
    };


    // get current time
    var getTime = function() {
      now = new Date();
      hour = now.getHours();
      min = now.getMinutes();
      sec = now.getSeconds();
    };


    // display clock
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
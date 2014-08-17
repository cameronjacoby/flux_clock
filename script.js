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
      console.log(hour);
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

    // 0 (20.25, 21.5, 58.75)

    // 1 dark blue (4, 5, 13)
    // 1 dark orange (15, 6, 5) ***

    // 2 (63, 24.75, 20.5)

    // 3 (111, 43.5, 36)

    // 4 (159, 62.25, 51.5)

    // 5 (207, 81, 67)

    // 6 bright orange (255, 100, 83)

    // 7 (255, 122, 85.5)

    // 8 (255, 144, 88)

    // 9 (255, 166, 90.5)

    // 10 (255, 188, 93)

    // 11 light gold (255, 210, 95)

    // 12 (255, 229.5, 164.6)

    // 13 pale yellow (255, 249, 234)

    // 14 (227, 244, 244.5)

    // 15 pale blue (199, 239, 255)

    // 16 (121.5, 208, 255)

    // 17 bright blue (44, 177, 255)

    // 18 (72, 130, 255)

    // 19 blue-purple (100, 83, 255)

    // 20 (84.5, 77, 225.5)

    // 21 blue (69, 71, 196)

    // 22 (52.75, 54.5, 150.25)

    // 23 (36.5, 38, 104.5)

    var changeColor = function() {
      console.log(hour, min, sec);
      var r = 100 - 0.5 * sec,
        g = 83 - 0.25 * sec,
        b = 255 - sec;
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
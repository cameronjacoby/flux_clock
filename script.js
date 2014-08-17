$(document).ready(function() {
  var canvas = $('#canvas')[0];
  var context = canvas.getContext('2d');

  (function(clock, $, undefined) {

    var now,
      hour,
      min,
      sec,
      w = canvas.width,
      h = canvas.height,
      center = w / 2;

    makeMarks = function(distance) {
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

    makeSecHand = function() {
      makeMarks(100);
      var theta = (6 * Math.PI / 180);
      var x = center + 100 * Math.cos(sec * theta - Math.PI / 2);
      var y = center + 100 * Math.sin(sec * theta - Math.PI / 2);

      context.fillStyle = '#28ca9c';
      context.beginPath();
      context.arc(x, y, 5, 0, 2 * Math.PI);
      context.fill();
    };

    makeMinHand = function() {
      console.log('making marks');
      makeMarks(180);
      var theta = (6 + Math.PI / 180);
      var x = center + 180 * Math.cos((min + (sec / 60)) * theta - Math.PI / 2);
      var y = center + 180 * Math.sin((min + (sec / 60)) * theta - Math.PI / 2);

      context.fillStyle = '#28ca9c';
      context.beginPath();
      context.arc(x, y, 10, 0, 2 * Math.PI);
      context.fill();
    };

    makeNumbers = function() {
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

    makeHourHand = function() {
      console.log('making numbers');
      makeNumbers();
      var theta = (Math.PI / 180);
      var x = center + 250 * Math.cos(theta);
      var y = center + 250 * Math.sin(theta);

      context.fillStyle = '#28ca9c';
      context.beginPath();
      context.arc(x, y, 20, 0, 2 * Math.PI);
      context.fill();
    };

    makeClock = function() {
      console.log('making hour hand');
      makeHourHand();
      console.log('making min hand');
      makeMinHand();
      console.log('making sec hand');
      makeSecHand();
    };

    getTime = function() {
     var now = new Date(),
        hour = now.getHours(),
        min = now.getMinutes(),
        sec = now.getSeconds();

        hour = hour >= 12 ? hour - 12 : hour;
        console.log(hour, min, sec);
    };

    clock.display = function() {
      context.clearRect(0, 0, w, h);
      getTime();
      makeClock();
    };


  }(window.clock = window.clock || {}, jQuery));
  
  // function showClock() {

  //   if (canvas.getContext) {

  //     context.fillStyle = "rgba(0, 200, 0, 0.5)";
  //     context.beginPath();
  //     context.arc(275,275,10,0,Math.PI*2,true); // Outer circle
  //     context.fill();

  //     context.beginPath();
  //     context.arc(275,375,10,0,Math.PI*2,true); // Outer circle
  //     context.fill();

  //   } else {
  //     // DISPLAY DIGITAL CLOCK TEXT AS IE FALLBACK
  //   }
  // }

  clock.display();

  setInterval(clock.display, 1000);

});
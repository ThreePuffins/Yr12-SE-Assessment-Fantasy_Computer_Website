var ctx = document.getElementById('canvas').getContext('2d');

window.addEventListener('resize', function() {
  resizeWindow(window.innerWidth, window.innerHeight);
}, false);

function resizeWindow(window_width, window_height) {
  var width  = window_width * 2 / 3
  var height = width
  ctx.canvas.width  = width;
  ctx.canvas.height = height;
}

resizeWindow(window.innerWidth, window.innerHeight);
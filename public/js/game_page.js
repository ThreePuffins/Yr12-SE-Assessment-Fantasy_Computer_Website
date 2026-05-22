var ctx = document.getElementById('canvas').getContext('2d');

window.addEventListener('resize', function() {
  resizeWindow(window.innerWidth);
}, false);

function resizeWindow(window_width) {
  var width  = window_width * 2/5;
  var height = width;
  ctx.canvas.width  = width;
  ctx.canvas.height = height;
}

resizeWindow(window.innerWidth, window.innerHeight);


let pixels = [];
function setPixel(x, y, col) {
  pixels[x][y] = col;
}
for (let i = 0; i < 128; i++) {
    pixels[i] = [];
    for (let j = 0; j < 128; j++) {
        pixels[i][j] = (i+j) % 2 === 0 ? "#ffffff": "#121212";
    }
}

// returns 
function getInputs() {
  return
}

function render() {
  for (let x = 0; x < 128; x++) {
    for (let y = 0; y < 128; y++) {
      ctx.fillStyle = pixels[x][y]; 
      const pix_size = ctx.canvas.width / 128;
      ctx.fillRect(pix_size * x, pix_size * y, pix_size, pix_size); 
    }
  }
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
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

// up, down, left, right, z/c, x
var inputs = 0b000000;

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case "ArrowUp": 
      inputs |= (1 << 5);
      break;
    case "ArrowDown": 
      inputs |= (1 << 4);
      break;
    case "ArrowLeft": 
      inputs |= (1 << 3);
      break;
    case "ArrowRight": 
      inputs |= (1 << 2);
      break;
    case "c": 
      inputs |= (1 << 1);
      break;
    case "z": 
      inputs |= (1 << 1);
      break;
    case "x": 
      inputs |= (1 << 0);
      break;
  }
});

document.addEventListener('keyup', (event) => {
  switch (event.key) {
    case "ArrowUp": 
      inputs &= ~(1 << 5);
      break;
    case "ArrowDown": 
      inputs &= ~(1 << 4);
      break;
    case "ArrowLeft": 
      inputs &= ~(1 << 3);
      break;
    case "ArrowRight": 
      inputs &= ~(1 << 2);
      break;
    case "c": 
      inputs &= ~(1 << 1);
      break;
    case "z": 
      inputs &= ~(1<< 1);
      break;
    case "x": 
      inputs &= ~(1 << 0);
      break;
  }
});

function getInputs() {
  return inputs;
}

function render() {
  loop(getInputs());
  pixels = getPixels();
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
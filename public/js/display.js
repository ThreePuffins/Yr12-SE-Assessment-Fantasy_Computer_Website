let pixels = [];

for (let i = 0; i < 128; i++) {
    pixels[i] = [];
    for (let j = 0; j < 128; j++) {
        pixels[i][j] = "#121212";
    }
}

function setPixel(x, y, col) {
  pixels[x][y] = col;
}

function getPixels() {
    return pixels;
}
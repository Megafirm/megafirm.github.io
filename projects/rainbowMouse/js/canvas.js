//canvas setup
let canvas;
let width, height;
let padding = 20;

function setupCanvas() {
  canvas = createCanvas(window.innerWidth - padding, window.innerHeight - padding);
  canvas.style('display', 'block');
  width = window.innerWidth;
  height = window.innerHeight;
  colorMode(HSB, 360, 100, 100, 255);

  //Remove Freewha Logo
  $(document).ready(function() {
    $('body').find('img[src$="https://www.freewebhostingarea.com/images/poweredby.png"]').remove();
  });
}

//window resized
function windowResized() {
  canvas = resizeCanvas(window.innerWidth - padding, window.innerHeight - padding);
  width = window.innerWidth;
  height = window.innerHeight;

  blocksHeight = height * 2.5 / 3;
  blockSize = blocksHeight / difficulty.dimensions.y;
  blocksOffset = createVector(pad, 2 * pad);
}

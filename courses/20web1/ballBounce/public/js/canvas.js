//canvas setup
let canvas;
let width, height;
let padding = 20;
let fullscreen = true;

function setupCanvas() {
  canvas = createCanvas(window.innerWidth - padding, window.innerHeight - padding);
  canvas.style('display', 'block');
  width = canvas.width;
  height = canvas.height;
  colorMode(HSB, 360, 100, 100, 255);
}

//hide freeWHA logo
function hideFreeWHA() {
  $(document).ready(function() {
    $('body').find('img[src$="https://www.freewebhostingarea.com/images/poweredby.png"]').remove();
  });
}

//window resized
function windowResized() {
  if (fullscreen) {
    canvas = resizeCanvas(window.innerWidth - padding, window.innerHeight - padding);
    width = window.innerWidth;
    height = window.innerHeight;
  }
}

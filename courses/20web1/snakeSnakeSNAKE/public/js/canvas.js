//canvas setup
let canvas;
let padding = 20;
let fullscreen = false;

function setupCanvas() {
  createCanvas(window.innerWidth - padding, window.innerHeight - padding);
  fullscreen = true;
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

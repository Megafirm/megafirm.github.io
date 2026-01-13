/*
  Rendering vars
*/

var canvas = document.createElement("canvas");
var ctx;
var keys = [];

window.addEventListener('keydown', function (e) {
  keys = (keys || []);
  keys[e.keyCode] = true;
})
window.addEventListener('keyup', function (e) {
  keys[e.keyCode] = false;
})

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
/*
  Program vars
*/

var A = 65;
var D = 68;

var W = 87;
var S = 83;

var ys = [];
var x = 0;
var y = 0;
var t = 0;

function start() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = this.canvas.getContext("2d");
  document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  animloop();
}
function update() {
  if(keys[A]) {
    x--;
  }
  if(keys[D]) {
    x++;
  }
  if(keys[W]) {
    y--;
  }
  if(keys[S]) {
    y++;
  }
  t++;
  updateYs();
}
function updateYs() {
  for(var i = 0; i < canvas.width; i++) {
    ys[i] = getY(x+i,y,t)-y;
  }
}
function getY(x,y,t) {
  return Math.sin(x/100)*(t*t)/1000;
}

/*
  Rendering functions
*/

function animloop() {
  requestAnimFrame(animloop);
  update();
  render();
}
function render() {
  clear();

  ctx.beginPath();
  ctx.moveTo(0, getY(x-1,t));

  for(var i in ys) {
    ctx.lineTo(i,ys[i]);
  }
  ctx.stroke();

}
function clear() {
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

start();

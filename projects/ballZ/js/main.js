var texCanvas = document.createElement('canvas');
var texContext = texCanvas.getContext('2d');

var SPACE = 32;

var keys = {};

var vp;
var canvas;
var ctx;

var cFPS = 0;

var textures = {};
var sounds = {};

var ticks = 0;

var mouseX = 0;
var mouseY = 0;

var ballz = 300;
var launcherPos;
var ballSpeed = 100;

var balls = [];

var canFire = true;

var tiles;
var points;

var aklsklasskl = true;

var playing = true;

function init() {
  canvas = document.getElementById("canvas");

  // size canvas
  var vp = {
    width:window.innerWidth,
    height:window.innerHeight
  }
  canvas.width = vp.width;
  canvas.height = vp.height;

  // set textures
  setTextures();
  // set sounds
  setSounds();

  // set fps interval
  setInterval(function() {
    console.log(cFPS);
    cFPS = 0;
  },1000);

  // get context
  ctx = canvas.getContext('2d');


  // non rendering stuff

  launcherPos = {
    x: canvas.width/2,
    y: canvas.height
  };

  tiles = [...Array(Math.floor(canvas.width/100))].map(e => Array(Math.floor(canvas.height/100)));

  for(var y = 0; y < tiles[0].length; y++) {
    for(var x = 0; x < tiles.length; x++) {
      tiles[x][y] = 0;
    }
  }

  points = [...Array(Math.floor(canvas.width/100))].map(e => Array(Math.floor(canvas.height/100)));

  for(var y = 0; y < points[0].length; y++) {
    for(var x = 0; x < points.length; x++) {
      points[x][y] = 0;
    }
  }
  window.onkeyup = function(e) { keys[e.keyCode] = false; }
  window.onkeydown = function(e) { keys[e.keyCode] = true; }

  canvas.addEventListener("click", mouseClicked, false);
  canvas.addEventListener("mousemove", mouseMoved, false);

  // finally, draw
  draw();
  setInterval(function() {
    tick();
    draw();
  },1000 / 60);
}
function setTextures() {

}
function setSounds() {

}
function addTexture(name, path) {
  textures[name] = new Image();
  textures[name].src = path;
}
function addSound(name, path) {
  sounds[name] = new Audio(path);
}
function tick() {
  for(var i = balls.length-1; i >= 0; i--) {
    var b = balls[i];

    for(var j = 0; j < ballSpeed; j++) {
      var l = true;
      if(b.y > canvas.height) {
        if(balls.length == 1) {
          launcherPos.x = b.x;
        }
        balls.splice(i,1);
        break;
      }
      if(b.x > canvas.width || b.x < 0) {
        b.xVel *= -1;
        l = false;
      }
      if(b.y < 0) {
        b.yVel *= -1;
        l = false;
      }
      var nextX = b.x + b.xVel;
      var nextY = b.y + b.yVel;
      if(nextX > canvas.width || nextX < 0) {
        l = false;
      }
      if(nextY < 0) {
        l = false;
      }

      if(l) {
        var currTileX = Math.floor(b.x/canvas.width*tiles.length);
        var currTileY = Math.floor(b.y/canvas.height*tiles[0].length);

        var nextTileX = Math.floor(nextX/canvas.width*tiles.length);
        var nextTileY = Math.floor(nextY/canvas.height*tiles[0].length);

        if(points[currTileX][currTileY] > 0) {
          ballz += points[currTileX][currTileY];
          points[currTileX][currTileY] = 0;
        }

        if(tiles[nextTileX][currTileY] > 0) {
          tiles[nextTileX][currTileY]--;
          b.xVel *= -1;
        }
        if(tiles[currTileX][nextTileY] > 0) {
          tiles[currTileX][nextTileY]--;
          b.yVel *= -1;
        }
      }

      b.x += b.xVel;
      b.y += b.yVel;
    }
  }
  if(balls.length == 0) {
    canFire = true;
    if(aklsklasskl) {
      endTurn();
      aklsklasskl = false;
    }
  } else {
    canFire = false;
    aklsklasskl = true;
  }
  if(keys[SPACE]) {
    ballSpeed = prompt("How zoomy?");

    keys[SPACE] = false;
  }
  ticks++;
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(canFire) {
    var a = angle(launcherPos.x, launcherPos.y, mouseX, mouseY);

    var xStep = Math.sin(a);
    var yStep = -Math.cos(a);

    var cX = launcherPos.x;
    var cY = launcherPos.y;

    ctx.fillStyle = "#fff";

    for(var i = 0; i < 30; i++) {
      ctx.beginPath();
      ctx.arc(cX, cY,
        3,
      0, 2 * Math.PI);
      ctx.fill();
      cX += xStep*50;
      cY += yStep*50;
    }
  }
  var tWidth = canvas.width / tiles.length;
  var tHeight = canvas.height / tiles[0].length;

  var cX = 0;
  var cY = 0;

  ctx.font = "40px Monospace";

  for(var x = 0; x < tiles.length; x++) {
    for(var y = 0; y < tiles[0].length; y++) {
      if(points[x][y] > 0) {
        ctx.fillStyle = "#aaa";
        ctx.fillRect(cX, cY, tWidth, tHeight);

        var txt = points[x][y].toString();
        ctx.fillStyle = "#fff";
        ctx.fillText(txt, cX, cY+tHeight);
      } else if(tiles[x][y] > 0) {
        ctx.fillStyle = "#a09";
        ctx.fillRect(cX, cY, tWidth, tHeight);

        var txt = tiles[x][y].toString();
        ctx.fillStyle = "#fff";
        ctx.fillText(txt, cX, cY+tHeight);
      }
      cY += tHeight;
    }
    cX += tWidth;
    cY = 0;
  }

  ctx.fillStyle = "#05f";
  for(var i in balls) {
    var b = balls[i];

    ctx.beginPath();
    ctx.arc(b.x, b.y,
      10,
    0, 2 * Math.PI);
    ctx.fill();
  }

  ctx.fillStyle = "#fff";
  ctx.font = "100px Monospace";
  ctx.fillText(ballz, 0, 100);
  if(!playing) {
    ctx.fillText("You lose! Your score is:", 0, 300);

    ctx.fillStyle = "#f00";

    ctx.font = "300px Monospace";
    ctx.fillText(ballz, 200, 600);
    canFire = false;
  }
  cFPS++;
}
function endTurn() {
  for(var x = 0; x < tiles.length; x++) {

    var prev = Math.round(Math.random()*ballz*2);
    var addTile = Math.random() > 0.75 ? true : false;

    for(var y = 1; y < tiles[x].length; y++) {
      var b = tiles[x][y];
      if(addTile) {
        tiles[x][y] = prev;
      } else {
        tiles[x][y] = 0;
      }
      prev = b;
      addTile = true;
    }
    addTile = Math.random() > 0.95 ? true : false;
    prev = 1;
    for(var y = 1; y < points[x].length; y++) {
      var b = points[x][y];
      if(addTile) {
        points[x][y] = prev;
        if(points[x][y] == 1) {
          tiles[x][y] = 0;
        }
      } else {
        points[x][y] = 0;
      }
      prev = b;
      addTile = true;
    }
  }
  for(var x = 0; x < tiles.length; x++) {
    if(tiles[x][tiles[x].length-1] > 0) {
      playing = false;
    }
  }
}
function playSound(sound) {
  sound.play();
}
function loopSound(sound) {
  sound.loop = true;
  var promise = sound.play();
  if(promise !== undefined) {
    promise.then(_ => {

    })
    .catch(error => {

    });
  }
}
function mouseMoved(evt) {
  mouseX = evt.clientX;
  mouseY = evt.clientY;
}
function mouseClicked(evt) {
  if(canFire) {

    var a = angle(launcherPos.x, launcherPos.y, mouseX, mouseY);

    var xVel = Math.sin(a);
    var yVel = -Math.cos(a);

    var i = 1;

    var iv = setInterval(function() {
      balls.push({
        x:launcherPos.x,
        y:launcherPos.y,
        xVel:xVel,
        yVel:yVel
      });
      i++;
      if(i > ballz) {
        clearInterval(iv);
      }
    },100);
  }
}
//Get Mouse Position
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
function angle(x1, y1, x2, y2) {
    var deltaY = (y1 - y2);
    var deltaX = (x2 - x1);
    var result = Math.atan2(deltaY, deltaX);
    return Math.PI*2.5-result;
}

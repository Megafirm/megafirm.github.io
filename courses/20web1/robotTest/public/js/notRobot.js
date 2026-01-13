let col = 0;

function setup() {
  setupCanvas();
  hideFreeWHA();
}

function draw() {
  background(col, 100, 100);
  col = (col+3)%360;

  textAlign(CENTER, CENTER);
  textSize(50);
  fill(0, 0, 100);
  text("You're not a robot!", width/2, height/2);
}
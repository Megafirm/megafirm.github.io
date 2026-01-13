let pm;
let movedCounter = 60;

function setup() {
  setupCanvas();

  colorMode(HSB);

  noCursor();

  pm = createVector(mouseX, mouseY);
}

function draw() {
  noStroke();
  fill(6 * frameCount % 360, 10, 100, 50);
  rectMode(CORNERS);
  rect(0, 0, width, height)

  let pmEase = 1;
  pm.x -= (pm.x - pmouseX) / pmEase;
  pm.y -= (pm.y - pmouseY) / pmEase;
  stroke(6 * frameCount % 360, 100, 75);
  strokeWeight(10);
  line(mouseX, mouseY, pm.x, pm.y);

  //input variables
  inputManage();
}

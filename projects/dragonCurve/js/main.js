let system;
let offset;

function setup() {
  createCanvas(700, 700);
  hideFreeWHA();
  colorMode(HSB);

  background(0, 0, 0);

  system = systemStart;

  createP("\n");
  createP("Pan the camera with the mouse!");
  createP("Press any key to iterate the curve...\n");
  createP("");
  // createP(system);

  drawSystem(system);

  //mouse offset
  offset = createVector(0, 0);
}

function draw() {
  //move offset
  if (mouseClicked) {
    offset = createVector(offset.x + mouseX - pmouseX, offset.y + mouseY - pmouseY);
  }

  if (keyTap) {
    system = iterateSystem(system);
    createP(system);
  }

  push();
  translate(offset.x, offset.y);
  drawSystem(system);
  pop();

  //input variables
  inputManage();
}


let zoom = 1;
function mouseWheel(event) {
  let n = event.delta/abs(event.delta);
  let spd = 0.1;
  let z = 1 - n*spd;
  zoom *= z;
}


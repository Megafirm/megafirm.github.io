//input variables
let keyClicked, keyTap, pkeyClicked;
let mouseClicked, mouseTap, pmouseClicked;

// input functions
function inputManage() {
  //input variables
  if (!pkeyClicked && keyClicked) keyTap = true;
  else keyTap = false;
  pkeyClicked = keyClicked;
  if (!pmouseClicked && mouseClicked) mouseTap = true;
  else mouseTap = false;
  pmouseClicked = mouseClicked;
}

function keyPressed() {
  keyClicked = true;
}

function keyReleased() {
  keyClicked = false;
}

function mousePressed() {
  mouseClicked = true;
}

function mouseReleased() {
  mouseClicked = false;
}

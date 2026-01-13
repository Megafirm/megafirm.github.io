let player;

let food = [];

//HTML elements
let elements = false;
let foodSlider;
let boundsButton, bounds = false;
let randomingButton, randoming = false;

function setup() {
  setupCanvas();
  hideFreeWHA();

  frameRate(100);

  //HTML Elements
  if (!elements) {
    let padd = 25;

    //food slider
    let slWidth = 400;
    foodSlider = createSlider(0, 1000, 250, 1);
    foodSlider.position(width / 2 - slWidth / 2, height - padd);
    foodSlider.style('width', slWidth + 'px');

    //bounds button
    boundsButton = createButton('Torus Edges');
    boundsButton.position(padd, height - padd);
    boundsButton.mousePressed(toggleBounds);
    toggleBounds();

    //randoming button
    randomingButton = createButton('Freeroam');
    randomingButton.position(width - 55 - padd, height - padd);
    randomingButton.mousePressed(toggleRandoming);
    randomingButton.style('background-color', 'rgb(252, 199, 199)');

    elements = true;
  }

  while (food.length < foodSlider.value()) {
    food.push(new Food());
  }
  for (let i = 0; i < food.length; i++) {
    food[i].eat();
  }

  player = new Snake(width / 2, height / 2, random(360));

  colorMode(HSB);
}

function draw() {
  background(255);

  let foodLength = foodSlider.value();
  while (food.length < foodLength) {
    food.push(new Food());
  }
  while (food.length > foodLength) {
    food.pop();
  }

  for (let f of food) {
    f.display();
  }

  player.move();
  player.display();
}

function toggleBounds() {
  if (!randoming) {
    bounds = !bounds;

    if (bounds) boundsButton.style('background-color', 'rgb(199, 252, 214)');
    else boundsButton.style('background-color', 'rgb(252, 199, 199)');
  } else {
    boundsButton.style('background-color', 'rgb(204, 242, 255)');
  }
}

function toggleRandoming() {
  setup();

  randoming = !randoming;
  bounds = true;

  if (randoming) randomingButton.style('background-color', 'rgb(199, 252, 214)');
  else randomingButton.style('background-color', 'rgb(252, 199, 199)');

  toggleBounds();
}
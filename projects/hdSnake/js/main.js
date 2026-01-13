let player;

let food = [];

function setup() {
  setupCanvas();
  hideFreeWHA();

  frameRate(100);

  while(food.length < 250) {
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

  for (let f of food) {
    f.display();
  }

  player.move();
  player.display();
}

class Food {
  constructor() {
    this.pos;
    this.col;
    this.r;
    this.a = 0;
    this.eat();
  }

  eat() {
    this.r = random(5, 10);
    this.pos = createVector(random(this.r, width - this.r), random(this.r, height - this.r))
    this.col = random(360);
    this.a = 0;
  }

  display() {
    noStroke();
    fill(this.col, 100, 100, this.a);
    this.col += 1;
    this.col %= 360;
    if (this.a < 255) this.a += 0.01;
    ellipseMode(CENTER);
    ellipse(this.pos.x, this.pos.y, 2 * this.r, 2 * this.r);
  }
}
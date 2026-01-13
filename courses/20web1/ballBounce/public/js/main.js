let grav;
let fric;
let spring;

let balls = [];
let movement = [];
let max = 300;

let slider;

function setup() {
  setupCanvas(); //custom function
  hideFreeWHA();

  //slider
  slider = createSlider(-1, 1, 0.5, 0.01);
  slider.position(width / 2, height - 25);
  slider.style('width', '200px');

  grav = createVector(0, slider.value());
  fric = 0.8;
  spring = 0.5;

  for (let i = 0; i < 10; i++) {
    rVec = p5.Vector.random2D().setMag(10);
    balls.unshift(new Ball(random(width), random(height), rVec.x, rVec.y));
  }
}

function draw() {
  background(255);

  grav = createVector(0, slider.value());

  noStroke();
  fill(0, 0, 90);
  beginShape();
  vertex(0, height);
  for (let i = 0; i < movement.length; i++) {
    if (movement[i] > max) max -= (max - movement[i]) / 50;
    vertex(map(i, 1, movement.length - 1, 0, width), map(movement[i], 0, max, height, 0));
  }
  vertex(width, height);
  endShape();

  movement[frameCount] = 0;
  for (let b of balls) {
    b.update();
    b.collide();
    b.display();

    //calculating total energy
    let KE = 0.5 * (b.vel.mag() ** 2);
    let PTE = 1 * grav.y * (-b.pos.y + height);
    // movement[frameCount] += b.vel.mag();
    movement[frameCount] += PTE + KE;
  }
  console.log(movement[frameCount]);
}

function mousePressed() {
  if (mouseY < height - 30)
    balls.unshift(new Ball(mouseX, mouseY, mouseX - pmouseX, mouseY - pmouseY));
}

class Ball {
  constructor(x, y, vx, vy) { //velocity in constructor
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);

    this.r = random(20, 30);
    this.col = color(random(360), random(90, 100), random(90, 100));
  }

  update() {
    //physics
    let acc = createVector();
    acc.add(grav);
    this.vel.add(acc);
    this.pos.add(this.vel);

    //bouncing
    if (this.pos.x < this.r) {
      this.vel.x = abs(this.vel.x);
      this.pos.x = this.r;
      this.vel.mult(fric);
    }
    if (this.pos.x > width - this.r) {
      this.vel.x = -abs(this.vel.x);
      this.pos.x = width - this.r;
      this.vel.mult(fric);
    }
    if (this.pos.y < this.r) {
      this.vel.y = abs(this.vel.y);
      this.pos.y = this.r;
      this.vel.mult(fric);
    }
    if (this.pos.y > height - this.r) {
      this.vel.y = -abs(this.vel.y);
      this.pos.y = height - this.r;
      this.vel.mult(fric);
    }
  }

  collide() {
    //bouncing against other balls
    for (let b of balls) {
      if (b != this) {
        let dx = b.pos.x - this.pos.x;
        let dy = b.pos.y - this.pos.y;
        let distance2 = dx * dx + dy * dy;
        let minDist = b.r + this.r;
        if (distance2 < minDist ** 2) {

          // for (let b of balls) {
          //   if (b != this) {
          //     let d = dist(b.pos.x, b.pos.y, this.pos.x, this.pos.y);
          // if (d <= b.r + this.r) {
          let angle = atan2(dy, dx);
          let targetX = this.pos.x + cos(angle) * minDist;
          let targetY = this.pos.y + sin(angle) * minDist;
          let ax = (targetX - b.pos.x) * spring;
          let ay = (targetY - b.pos.y) * spring;
          // vx -= ax;
          // vy -= ay;
          this.vel.sub(ax, ay);
          // b.vx += ax;
          // b.vy += ay;
          b.vel.add(ax, ay);
        }
      }
    }
    // for (let b of balls) {
    //   if (b != this) {
    //     let d = dist(b.pos.x, b.pos.y, this.pos.x, this.pos.y);
    //     if (d <= b.r + this.r) {
    //       let vel1 = this.vel * 0.5;
    //       let vel2 = b.vel * 0.5;
    //       this.vel.mult(-0.5);
    //       b.vel.mult(-0.5);
    //       b.vel.add(vel1);
    //       this.vel.add(vel2);
    //
    //       //prevent them from getting stuck
    //       let m1 = this.vel;
    //       let m2 = b.vel;
    //       let override = 0;
    //       while (dist(b.pos.x, b.pos.y, this.pos.x, this.pos.y) <= b.r + this.r || override > 60) {
    //         this.pos.add(m1);
    //         b.pos.add(m2);
    //         override += 1;
    //       }
    //     }
    //   }
    // }
  }

  display() {
    //ball
    noStroke();
    fill(this.col);
    ellipseMode(CENTER);
    ellipse(this.pos.x, this.pos.y, 2 * this.r, 2 * this.r);
  }
}
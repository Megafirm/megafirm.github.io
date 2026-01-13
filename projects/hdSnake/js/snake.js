class Snake {
  constructor(x, y, dir) {
    this.path = [];
    this.path.unshift(createVector(x, y));

    this.dir = dir;
    this.spd = 3;

    this.r = 15;
    this.length = 5 * this.r;
    this.spacing = 2 * this.r;
  }

  move() {
    // //key input
    // let dirSpeed = 5;
    // if (keyIsDown(LEFT_ARROW)) {
    //   this.dir -= dirSpeed;
    // }
    // if (keyIsDown(RIGHT_ARROW)) {
    //   this.dir += dirSpeed;
    // }
    // this.dir = this.dir % 360; //normalize dir

    //control pos with mouse [KINDA SORTA BROKEN]
    // let dirSpeed = 5;
    //
    // let p = createVector(this.path[0].x, this.path[0].y);
    // let mouse = createVector(mouseX, mouseY);
    // let dir = p5.Vector.sub(mouse, p);
    // this.dir = dir;
    //
    //
    // let toDir = degrees(atan2(mouseY - p.y, mouseX - p.x));
    // toDir = (toDir + 360) % 360; //normalize toDir
    // let toDirAddOptions = [toDir - this.dir, toDir + 360 - this.dir, toDir - 360 - this.dir];
    // let toDirAddOptionsAbs = [];
    // for (let i = 0; i < toDirAddOptions.length; i++) toDirAddOptionsAbs.push(abs(toDirAddOptions[i]));
    // let toDirAdd = min(toDirAddOptionsAbs);
    // for (let i = 0; i < toDirAddOptions.length; i++) {
    //   if (toDirAdd == abs(toDirAddOptions[i])) toDirAdd = toDirAddOptions[i];
    //   break;
    // }
    // this.dir += toDirAdd / abs(toDirAdd) * dirSpeed;


    //move path as many times as speed
    for (let i = 0; i < this.spd; i++) {
      let pos = createVector(this.path[0].x, this.path[0].y);
      let addVec = p5.Vector.fromAngle(radians(this.dir));
      addVec.setMag(1);
      pos.add(addVec);
      pos.set((pos.x + width) % width, (pos.y + height) % height); //loop within screen bounds
      // if (pos.x < 0 || pos.x > width || pos.y < 0 || pos.y > height) setup(); //die out of bounds
      this.path.unshift(pos);

      //remove path end
      while (this.path.length > this.length) {
        this.path.pop();
      }

      //eating
      for (let f of food) {
        let d = dist(pos.x, pos.y, f.pos.x, f.pos.y);
        if (d <= this.r + f.r) {
          f.eat();
          this.nom(2 * f.r);
        }
      }

      //collision
      let collBuffer = this.r + 10;
      for (let i = collBuffer; i < this.path.length && this.path.length > collBuffer; i += this.spacing) {
        let coll = createVector(this.path[i].x, this.path[i].y);
        let d = dist(pos.x, pos.y, coll.x, coll.y);
        if (d <= this.r) {
          setup();
        }
      }
    }

    // //AI randoming
    // let n = noise(frameCount / 50);
    // let toDir = (360 * n + frameCount / 5) % 360;
    // this.dir -= (this.dir - toDir);
  }

  nom(add) {
    this.length += add;
  }

  display() {
    let drawPath = [];
    for (let i = 0; i < this.path.length; i += this.spacing) {
      drawPath.unshift(createVector(this.path[i].x, this.path[i].y, i));
    }

    //end body
    let endLength = this.path.length - 1;
    let tail = createVector(this.path[endLength].x, this.path[endLength].y, endLength);
    drawPath.unshift(tail);

    //inside body and beginning
    noStroke();
    ellipseMode(CENTER);
    rectMode(CENTER);
    for (let i = 0; i < drawPath.length; i++) {
      fill(drawPath[i].z % 360, 100, 100);
      rect(drawPath[i].x, drawPath[i].y, 2 * this.r, 2 * this.r);
    }
  }
}
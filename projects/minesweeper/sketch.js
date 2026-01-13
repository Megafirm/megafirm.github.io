//canvas
let canvas;
let width, height;

//blocks
let blocks = [];
let blockSize;
let blocksOffset;
let blocksHeight;
let pad;

//game
let mode;
let difficulty; //vector of difficulty dimensions
let gameOver, win;


//input variables
let keyClicked, keyTap, pkeyClicked;
let mouseClicked, mouseTap, pmouseClicked;

function setup() {
  let padding = 0;
  canvas = createCanvas(window.innerWidth - padding, window.innerHeight - padding);
  canvas.style('display', 'block');
  width = window.innerWidth;
  height = window.innerHeight;
  colorMode(HSB, 360, 100, 100, 255);

  gameOver = false;
  win = false;
  mode = 0;
  /*
   * 0: Difficulty Select
   * 1: Set Blocks
   * 2: Playing
   * 3: Win Lose Sequence
   */

   blocksHeight = height*2.5/3;
   pad = 20;
}

function draw() {
  background(211, 16, 100);
  inputManage();

  //text setup
  pad = width/50;
  textSize(width/50);
  textAlign(LEFT, TOP);
  fill(0, 0, 0);
  noStroke();

  //difficulty select
  if (mode == 0) {
    text("Welcome to Minesweeper!\nSelect a Gamemode (press a key):\n1: Beginner\n2: Intermediate\n3: Expert\n4: Demon", pad, pad);
    if (keyTap == true) {
      //beginner
      if (key == '1') {
        difficulty = {
          dimensions: createVector(8, 8),
          mines: 10
        }
        mode = 1; //move to next step
      }
      //intermediate
      if (key == '2') {
        difficulty = {
          dimensions: createVector(16, 16),
          mines: 40
        }
        mode = 1; //move to next step
      }
      //expert
      if (key == '3') {
        difficulty = {
          dimensions: createVector(24, 24),
          mines: 99
        }
        mode = 1; //move to next step
      }
      //demon
      if (key == '4') {
        difficulty = {
          dimensions: createVector(30, 30),
          mines: 140
        }
        mode = 1; //move to next step
      }
      //AAAAAH
      if (key == '5') {
        difficulty = {
          dimensions: createVector(100, 100),
          mines: 150
        }
        mode = 1; //move to next step
      }
    }
  }
  //set blocks
  if (mode == 1) {
    //initialize blocks array (with normal blocks)
    for (let x = 0; x < difficulty.dimensions.x; x++) {
      blocks[x] = [];
      for (let y = 0; y < difficulty.dimensions.y; y++) {
        blocks[x][y] = new Block(x, y, 0); //set normal blocks
      }
    }

    //set mines
    let mines = [];
    for (let i = 0; i < difficulty.mines; i++) {
      let regen = true;

      //debug
      let regenCount = -1;

      mines[i] = int(random(difficulty.dimensions.x*difficulty.dimensions.y));
      while (regen) {
        //prevent duplicates
        if (i != 0) {
         let difMineCount = 0; //number of different mines
         for (let n = i; n != 0; n -= 1)
           if (mines[n-1] != mines[i]) difMineCount += 1;
         //see if it's different to all other mines
         if (difMineCount != i) {
            mines[i] += 1;
            if (mines[i] >= difficulty.dimensions.x*difficulty.dimensions.y) mines[i] = 0;
          } else regen = false;

        } else regen = false;

        //debug
        regenCount += 1;
        if (!regen) print("Mine " + str(i) + " - Regens: " + str(regenCount) + "\n");
      }

      //set block in blocks array to mine
      let bx = int(mines[i] % difficulty.dimensions.x);
      let by = int(mines[i] / difficulty.dimensions.x);
      blocks[bx][by].type = 1;
    }

    //set number in blocks
    for (let x = 0; x < difficulty.dimensions.x; x++)
      for (let y = 0; y < difficulty.dimensions.y; y++)
        blocks[x][y].setCount();

    //set offset and size
    blockSize = blocksHeight/difficulty.dimensions.y;
    blocksOffset = createVector(pad, 2*pad);

    mode = 2; //move to next step
  }
  //play
  if (mode == 2 || mode == 3) {
    text("Minesweeper", pad, pad);

    for (let x = 0; x < difficulty.dimensions.x; x++)
      for (let y = 0; y < difficulty.dimensions.y; y++) {
        blocks[x][y].update();
        blocks[x][y].display();
      }

    if (mode == 3) {

    }
  }
}

//blocks
class Block {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.fill = color(0, 0, 60);
    this.type = type;
    this.count = 0;

    this.clicked = false;
  }

  update() {
    //clicking
    if (dist(blockSize*(this.x + 0.5) + blocksOffset.x, blockSize*(this.y + 0.5) + blocksOffset.y, mouseX, mouseY) < blockSize/2) {
      //hover
      this.fill = color(0, 0, 50);

      if (mouseClicked) {
        this.clicked = true;
      }
    }
    else this.fill = color(0, 0, 40);

    if (this.clicked) {
      if (this.type == 1) {
        gameOver = true;
        win = false;
        mode = 3;
      }
    }

    if (this.type == 1 && gameOver && !win) this.fill = color(0, 100, 100);
  }

  display() {
    stroke(0, 0, 0);
    strokeWeight(0.1*blockSize);
    fill(this.fill);
    rectMode(CORNER);

    let padding = blockSize/5;

    push();
    translate(blockSize*this.x + blocksOffset.x, blockSize*this.y + blocksOffset.y);
    rect(padding, padding, blockSize - padding, blockSize - padding);

    if (this.clicked) {
      if (this.type == 0) {
        noStroke();
        fill(0, 0, 0);
        textAlign(CENTER, CENTER);
        textSize(blockSize/4);
        text(this.count, 0.6*blockSize, 0.5*blockSize);
      }
    }

    pop();
  }

  setCount() {
    // count surrounding blocks
    this.count = 0;
    for (let bx = this.x-1; bx <= this.x+1; bx++)
      for (let by = this.y-1; by <= this.y+1; by++)
        this.count += this.testBlock(bx, by);
  }

  testBlock(x, y) {
    try {
      return blocks[x][y].type;
    }
    catch(error) {
      console.error(error);
      return 0;
    }
  }
}


//input functions
function inputManage() {
  //input variables
  if (!pkeyClicked && keyClicked) keyTap = true;
  else keyTap = false;
  pkeyClicked = keyClicked;
  if (!pmouseClicked && mouseClicked) keyTap = true;
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

//window functions
function windowResized() {
  let padding = 0;
  canvas = resizeCanvas(window.innerWidth - padding, window.innerHeight - padding);
  width = window.innerWidth;
  height = window.innerHeight;

  blocksHeight = height*2.5/3;
  blockSize = blocksHeight/difficulty.dimensions.y;
  blocksOffset = createVector(pad, 2*pad);
}

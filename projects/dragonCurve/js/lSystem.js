let systemStart = "F";
let zoomFactor = 0.7;
let angle = 90;

let rules = [
  //rules for generation
  {
    in: "F",
    out: "F+G"
  },
  {
    in: "G",
    out: "F-G"
  }
]

let iteration = 0;

function iterateSystem(system) {
  iteration += 1;
  let newSystem = "";
  print("count: " + system.length);
  for (let i = 0; i < system.length; i++) {
    //current char
    let char = system.charAt(i);
    //test each rule
    for (rule of rules) {
      if (char == rule.in) {
        char = rule.out;
      }
    }
    //add to newSystem
    newSystem += char;
    // print("working...");
  }
  print("done!");

  return newSystem;
}

function drawSystem(system) {
  let len = width/2;
  len *= pow(zoomFactor, iteration);
  let _angle = radians(angle);

  translate(width/4, height/2);
  rotate(radians(-45*iteration));
  translate(-width/4, -height/2);

  background(0, 0, 0);
  translate(width / 4, height / 2);
  stroke(255);
  colorMode(HSB);
  for (let i = 0; i < system.length; i++) {
    stroke(360 * (i / system.length), 100, 100);
    let char = system.charAt(i);

    if (char === "F" || char === "G") {
      line(0, 0, len, 0);
      translate(len, 0);
    } else if (char === "+") {
      rotate(_angle);
    } else if (char === "-") {
      rotate(-_angle);
    } else if (char === "[") {
      push();
    } else if (char === "]") {
      pop();
    } else if (char === "|") {
      rotate(radians(180));
    }
  }
}

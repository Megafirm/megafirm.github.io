let tests = [
  // types of robot tests
  {
    button: document.getElementById("b0").addEventListener("click", test1, false),
    target: document.getElementById("n0"),
    output: document.getElementById("v0"),
    notRobot: false
  },
  {
    button: null,
    target: document.getElementById("n1"),
    output: document.getElementById("v1"),
    notRobot: false
  }
]

submit = document.getElementById("submit").addEventListener("click", submit, false);

function setup() {
  // setupCanvas();
  noCanvas();
  hideFreeWHA();

  tests[0].target.innerHTML = parseInt(random(0, 20));
  tests[0].output.innerHTML = 0;

  tests[1].target.innerHTML = parseInt(random(1000, 10000));
  tests[1].output.value = '';

  colorMode(HSB);
}

function submit() {
  if (tests[0].target.innerHTML === tests[0].output.innerHTML) tests[0].notRobot = true;
  if (tests[1].target.innerHTML === tests[1].output.value) tests[1].notRobot = true;

  let notRobots = 0;
  for (let t of tests) {
    if (t.notRobot) notRobots += 1;
  }
  if (notRobots >= tests.length) window.location.href = "notRobot.html";
  else location.reload();
}

function test1() {
  tests[0].output.innerHTML = (parseInt(tests[0].output.innerHTML) + 1) % 20;
}
// array of references to number buttons
var numbers = document.getElementsByClassName("nums");
for (var k = 0; k < numbers.length; k = k + 1) {
  numbers[k].addEventListener('mousedown', getInput, false);
}
var ops = document.getElementsByClassName("oper");
for (var k = 0; k < ops.length; k = k + 1) {
  ops[k].addEventListener('mousedown', getInput, false);
}
window.addEventListener('keypress', getKey, false);

var eq = "";
var ans = "";

//// these are the functions for the event listeners
function getInput(e) { // get the event information
  //idk what this stuff does but I'm still awesome haha epic
  var buttonPressed = e.target;
  console.log(buttonPressed.value);
  var inVal = buttonPressed.value;

  // if the inVal is a number
  if (inVal != "=" && inVal != "C") {
    eq += inVal;
    document.getElementById('display').innerHTML = eq;
  }

  if (inVal == "=") {
    if (eq != "") {
      ans = eval(eq);
      document.getElementById('display').innerHTML = eq + " = " + ans;
      eq = ans;
    }
  }
  if (inVal == "C") {
    ans = "";
    eq = "";
    document.getElementById('display').innerHTML = "<br>";
  }

  console.log(eq);

}

function getKey(e) {
  console.log(e.key);
}

function getOne() {
  console.log("We got a click!");
}

function getTwo() {
  console.log("button two");
}
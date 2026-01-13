//Request stuff
let request;
let categories = ["inspire", "management", "sports", "life", "funny", "love", "art", "students"];

// let category = categories[parseInt(categories.length * Math.random())];
let a = location.href;
let category = a.substring(a.indexOf("?") + 1);

let quote;
let preview = document.getElementById("preview");
let title = document.getElementById("title");
let results = document.getElementById("results");
makeReq(); //generate quote
// quote = "asdfghjkl";

function makeReq() {
  request = new XMLHttpRequest();
  request.addEventListener('load', getResponse, false);
  request.open("GET", "http://quotes.rest/qod?category=" + category);
  request.send();
}

function getResponse() {
  console.log();
  let data = JSON.parse(request.response);
  console.log(data);
  quote = data.contents.quotes[0].quote;
}

//Typing stuff (wpm calculator)
let wpm = {
  frames: 0,
  seconds: 0
}
let typing = false;
let finish = false;

let textbox = {
  textbox: document.getElementById("textbox"),
  text: "",
  blinkerCount: 0,
  blinkerReset: 45,
  blink: function() {
    let blinker = "";
    this.blinkerCount -= 1;
    if (this.blinkerCount < -this.blinkerReset) {
      this.blinkerCount = this.blinkerReset;
    }
    if (this.blinkerCount > 0) blinker = "|";
    this.textbox.innerHTML = this.text + blinker;
  }
}

function draw() {
  if (quote) {
    if (keyIsPressed) {
      textbox.blinkerCount = textbox.blinkerReset;
    }

    //draw highlight
    // preview.innerHTML = "";
    // for (let i = 0; i <= textbox.text.length; i++) {
    //   // let highlight;
    //   // if (quote.substring(i, i + 1) == textbox.text.substring(i, i+1)) highlight = "<span style='background-color: rgb(128, 255, 162);'>";
    //   // else highlight = "<span style='background-color: rgb(255, 0, 0);'>"
    //   // preview.innerHTML += highlight + quote.substring(i, i+1) + "</span>";
    //   // preview.innerHTML = preview.innerHTML + quote.substring(i, i+1);
    // }
    // preview += quote.substring(textbox.text.length, quote.length);

    let highlight;
    if (quote.substring(0, textbox.text.length) == textbox.text) highlight = "<span style='background-color: rgb(128, 255, 162);'>";
    else highlight = "<span style='background-color: rgb(255, 0, 0);'>"
    preview.innerHTML = highlight + quote.substring(0, textbox.text.length) + "</span>" + quote.substring(textbox.text.length, quote.length);

    //calculate wpm
    if (typing) {
      wpm.frames += 1;
      wpm.seconds = wpm.frames / 60;
      title.innerHTML = "Go go go!";
    }

    //finish
    if (quote == textbox.text) finish = true;
    if (finish) {
      url = "Great Job!";
      if (title.innerHTML != url)
        title.innerHTML = url;
      typing = false;
      textbox.textbox.innerHTML = "";
    } else {
      //keyboard & typing
      keyboard.backspacer();
      textbox.blink();
      // textbox.textbox.innerHTML = textbox.text;
    }

    let finalWpm;
    if (typing || finish) {
      if (!finish) {
        finalWpm = 60 * (textbox.text.length / parseInt(wpm.seconds)) / 5;
        finalWpm = round(finalWpm);
        if (results.innerHTML != "Average WPM: " + finalWpm) results.innerHTML = "Average WPM: " + finalWpm;
      } else {
        finalWpm = 60 * (textbox.text.length / wpm.seconds) / 5;
        finalWpm = round(finalWpm);
        results.innerHTML = "Average WPM: " + finalWpm;
      }
    } else results.innerHTML = "Average WPM: 0";
  }
}

//Keyboard stuff
let keyboard = {
  backspacing: false,
  backspaceReset: 30,
  backspaceTimer: this.backspaceReset,
  backspacer: function() {
    if (keyIsPressed && key == "Backspace") {
      this.backspaceTimer -= 1;
      if (this.backspaceTimer < 0) this.backspace();
    }
  },
  backspace: function() {
    let newLength = textbox.text.length - 1;
    if (newLength < 0) newLength = 0;
    textbox.text = textbox.text.substring(0, newLength);
  }
}

function keyPressed() {
  if (!finish) {
    if (key.length == 1) {
      textbox.text += key;

      typing = true;
    }
    if (key == "Backspace") {
      keyboard.backspace();
    }
  }
}

function keyReleased() {
  keyboard.backspaceTimer = keyboard.backspaceReset;
}
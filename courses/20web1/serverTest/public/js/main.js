// function setup() {
//   setupCanvas();
//   hideFreeWHA();
// }
//
// function draw() {
//   background(255);
// }

console.log("linked");

var userId="";
document.getElementById("login"),addEventListener("change",getLogin,false);

function getLogin(){
   userId = document.getElementById("login").value;
   console.log(userId);
   joinServer();

}

var request;
// send info to server
function joinServer(){
   request = new XMLHttpRequest;  // a new object
   request.addEventListener('load',gotResp,false);   /// where to go with the response
   request.open("GET","/joinServer?uid="+userId);
   request.send();

}
// receive the response from the server
function gotResp(){
   var input=request.response;
   console.log(input);
}

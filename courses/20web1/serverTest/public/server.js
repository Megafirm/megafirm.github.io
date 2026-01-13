// this our javascript node server\
var exp = require('express');   // load the express library\
var app = exp();   // make our own app a special version of express\
var path = require('path');  // use the path module\
// define the global list variable that we will store the info in
var userList=[];


app.use(exp.static(path.join(__dirname,'public')));

// sends back index.html
app.get('/',function(req,res){
   res.send("Hello World!");
});

// process the user login
app.get('/joinServer',function(req,res){
   console.log("got message");
   var user = req.query.uid;
   console.log(user);

});


app.listen(3000, function(){   // hang out on port 3000 waiting for requests\
   console.log("listening on 3000");
});

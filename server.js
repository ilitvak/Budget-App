var express = require('express');
var app = express();

//// set port
//var port = process.env.PORT || 8080


// allows us to serve static files (images / css)
app.use(express.static(__dirname + '/public'));

// routes 

app.get("/", function(req, res){
    res.render("index");
});

var port = process.env.PORT || 5000

// set port
app.listen(port,  function(){
    console.log("App is running on port " + port);
});
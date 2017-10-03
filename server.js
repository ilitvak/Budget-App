var express = require('express');
var app = express();

//// set port
//var port = process.env.PORT || 8080


// allows us to serve static files (images / css)
app.use(express.static(__dirname));

// routes 

app.get("/", function(req, res){
    res.render("index");
});

// set port
app.listen(process.env.PORT || 5000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
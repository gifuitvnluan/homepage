var express = require('express');
var app = express();

app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set("views","./views");


app.listen(8888, function() {
    console.log("đã mở cổng");
})

// All router
app.get('/', function(req, res) {
    res.render('index');
})

app.get('/about', function(req, res) {
    res.render('about');
})


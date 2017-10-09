var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var app = express();
var routes = require('./routes/index');

//configure app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// use middleware
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + 'bower_components')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log('ready on port 3000 or ' + port);
});


module.exports = app;

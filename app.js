var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  ejs = require('ejs'),
  bodyParser = require('body-parser');


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res) {
  res.render('index');
});


server.listen(process.env.PORT || 3000, function() {
  console.log('server started');
});
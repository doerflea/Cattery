var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'login'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function (req,res){
  var context = {};
  mysql.pool.query('SELECT * FROM cat', function(err, rows, fields){
  	res.status(200).render('catteryPage', {catData: rows});
	});
});

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});

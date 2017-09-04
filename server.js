var compression = require('compression');
var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 3900;

//app.use(compression());
app.use(express.static(path.join(__dirname, '/dist')));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, './dist/index.html'));
})

app.get('/*', function(req, res){
	res.sendFile(path.join(__dirname, './dist/index.html'));
});


app.listen(port);
console.log('Server running on port: ' + port);
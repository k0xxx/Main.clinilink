var compression = require('compression');
var express = require('express');
var https = require('https');
var fs = require('fs');
var path = require('path');

// Загрузка базовых настроек
const mainConf = require('./main.config.js');

var app = express();

//app.use(compression());
app.use(express.static(path.join(__dirname, '/dist')));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, './dist/index.html'));
})

app.get('/*', function(req, res){
	res.sendFile(path.join(__dirname, './dist/index.html'));
});

// Загрузка файлов серитификата
if(mainConf.isSSL){
	var privateKey = fs.readFileSync(mainConf.privateKey);
	var certificate = fs.readFileSync(mainConf.certificate);
	var credentials = {key: privateKey, cert: certificate};
	var server = https.createServer(credentials, app);
}else{
	var server = http.createServer(app);
}


// Старт сервера на порту
httpsServer.listen(mainConf.port, function(){
	console.log('Server running on port: ' + mainConf.port);
});
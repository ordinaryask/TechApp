const express 		= require('express');
const bodyParser 	= require('body-parser');
const app 			= express();
var server  		= require('http').createServer(app);
var events			= require('events');
var myEmit			= new events.EventEmitter();
var io				= require('socket.io').listen(server);
const fs = require("fs");
const readline = require("readline");

let port 			= process.env.PORT || 5000;
server.listen(port, () => {
	console.log("Listening Port " + port);
});

app.use(express.static(__dirname + '/dist'));
app.use('/public',express.static('public'));

app.get('/', (req, res) => {
	res.sendFile('index.html',{root : __dirname});
});

var file = "base.csv";

var rl = readline.createInterface({
       input: fs.createReadStream(file),
       output: null,
       terminal: false
})
var mas = [];
rl.on("line", function(line) {
       mas.push(line);
});

rl.on("close", function() {
       console.log("All data processed.");
});

io.sockets.on('connection',(socket) => {
	console.log('Good connection');

	app.post('/',(req, res) => {
		res.send(JSON.stringify(mas));
	});

	socket.on('disconnect',(socket) => {
		console.log('disconnect');
	});
});
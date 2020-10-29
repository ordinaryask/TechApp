const express 		= require('express');
const bodyParser 	= require('body-parser');
const app 			= express();
const server  		= require('http').createServer(app);
const events			= require('events');
const io				= require('socket.io').listen(server);
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

const file = "police.csv";

const rl = readline.createInterface({
       input: fs.createReadStream(file),
       output: null,
       terminal: false
});

let mas = [];

rl.on("line", function(line) {
       mas.push(line);
       mas.length % 100 == 0 ? rl.pause() : '';
});
rl.on("pause", function(){
	console.log('Reading is stoped');
});
rl.on('resume', () =>{
	console.log('Reading is resumed');
});

rl.on("close", function() {
       console.log("All data processed.");
});

io.sockets.on('connection',(socket) => {
	console.log('Good connection');

	app.post('/',(req, res) => {
		res.send(JSON.stringify(mas));
	});
	app.post('/getTable',(req, res) => {
		rl.resume();
		res.send(JSON.stringify(mas));
	});

	socket.on('disconnect',(socket) => {
		console.log('disconnect');
	});
});
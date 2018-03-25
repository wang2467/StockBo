const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const port = 4001;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
	console.log("user connected");

	socket.on('disconnect', () => {
		console.log("user disconnected");
	});
});

server.listen(port, ()=>{
	console.log(`listening on port ${port}`);
});
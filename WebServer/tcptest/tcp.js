const net = require('net');
const server = net.createServer((socket) => {
	// 'connection' listener
	console.log('client connected');

	// 给client发送
	socket.write('hello\r\n');

	socket.on('data', (data) => {
		console.log(`data=${data}`);
	});
	socket.on('end', () => {
		console.log('client disconnected');
	});

	// 设置超时时间
	socket.setTimeout(3000);
	socket.on('timeout', () => {
		console.log('socket timeout');
		socket.end();
	});
});

server.on('error', (err) => {
	throw err;
});

server.listen(8124, () => {
	console.log('server bound');
});
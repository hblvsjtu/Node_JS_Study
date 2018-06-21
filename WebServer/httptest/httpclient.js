/**
 * 
 * @authors Lv Hongbin (hblvsjtu@163.com)
 * @date    2018-06-20 12:13:09
 * @version 1.0.0
 * @description test for http as client
 */

const http = require('http');
const querystring = require('querystring');

const postData = querystring.stringify({
	'msg': 'Hello World!'
});

var options = {
	hostname: '127.0.0.1',
	port: 8124,
	path: '/?name=lvhongbin&sex=male',
	method: 'GET',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': Buffer.byteLength(postData)
	}
}

const req = http.request(options, (res) => {
	console.log('已连接！');
	console.log(`状态码: ${res.statusCode}`);
	console.log(`响应头: ${JSON.stringify(res.headers)}`);
	var chunks = [];
	res.on('data', function(chunk) {
		chunks.push(chunk);
	})
	res.on('end', function() {
		console.log(Buffer.concat(chunks).toString());
	})
});

req.write(postData, 'utf8');
req.end();

req.on('information', (res) => {
	console.log(`在主响应之前获得信息: ${res.statusCode}`);
});

req.on('upgrade', (res, socket, upgradeHead) => {
	console.log('got upgraded!');
	socket.end();
	process.exit(0);
});

req.once('response', (res) => {
	const ip = req.socket.localAddress;
	const port = req.socket.localPort;
	console.log(`你的IP地址是 ${ip}，你的源端口是 ${port}。`);
	// consume response object
});
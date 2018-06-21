 /**
  * 
  * @authors Lv Hongbin (hblvsjtu@163.com)
  * @date    2018-06-21 11:02:19
  * @version 1.0.0
  * @description test for stream on the client
  */

 const http = require('http');
 const querystring = require('querystring');
 const fs = require('fs');

 const postData = querystring.stringify({
 	'msg': 'Hello World!'
 });

 var options = {
 	hostname: '127.0.0.1',
 	port: 8124,
 	path: '/?name=lvhongbin&sex=male',
 	method: 'POST',
 	headers: {
 		'Content-Type': 'application/x-www-form-urlencoded',
 		'Content-Length': Buffer.byteLength(postData) // 限制发送的字节长度
 	}
 }

 const req = http.request(options, (res) => {
 	console.log('已连接！');
 	console.log(`状态码: ${res.statusCode}`);
 	console.log(`响应头: ${JSON.stringify(res.headers)}`);
 	var chunks = [];
 	res.on('data', function(chunk) {
 		chunks.push(chunk);
 	});

 	res.on('end', function() {
 		const buf = Buffer.concat(chunks);
 		console.log(buf.toString());
 		console.log(`the text size = ${Buffer.byteLength(buf)} Byte`);
 	})

 	req.on('error', (err) => {
 		console.log(`err: ${err}`);
 	})
 });

 const chunk = Buffer.from(postData);
 if (req.write(chunk) == false) {
 	console.log('传送失败！');
 };
 req.end();

 req.once('response', (res) => {
 	const ip = req.socket.localAddress;
 	const port = req.socket.localPort;
 	console.log(`你的IP地址是 ${ip}，你的源端口是 ${port}。`);
 	// consume response object
 });
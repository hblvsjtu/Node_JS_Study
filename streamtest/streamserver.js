 /**
  * 
  * @authors Lv Hongbin (hblvsjtu@163.com)
  * @date    2018-06-21 11:02:19
  * @version 1.0.0
  * @description test for stream on the server
  */

 const http = require('http');
 const stream = require('stream');
 const fs = require('fs');

 const server = http.createServer((req, res) => {
 	// req 是 http.IncomingMessage 的实例，这是一个 Readable Stream
 	// res 是 http.ServerResponse 的实例，这是一个 Writable Stream

 	console.log('已连接！');
 	console.log(`请求头: ${JSON.stringify(req.headers)}`);

 	let body = '';
 	// 接收数据为 utf8 字符串，
 	// 如果没有设置字符编码，将接收到 Buffer 对象。
 	//req.setEncoding('utf8');

 	// 如果监听了 'data' 事件，Readable streams 触发 'data' 事件 
 	req.on('data', (chunk) => {
 		body += chunk;
 	});

 	req.on('end', () => {
 		console.log(body);
 	});

 	req.on('error', (err) => {
 		console.log(`err: ${err}`);
 	})

 	// 设置超时时间5S 5S*1000=S
 	res.setTimeout(5000);
 	res.on('timeout', () => {
 		console.log('oh no! timeout');
 		res.end();
 	});

 	const readStream = fs.createReadStream('1.txt');
 	readStream.on('data', (chunk) => {
 		res.write(chunk);
 	})

 });

 server.listen(8124, () => console.log('i am listening!'));

 // $ curl localhost:1337 -d "{}"
 // object
 // $ curl localhost:1337 -d "\"foo\""
 // string
 // $ curl localhost:1337 -d "not json"
 // error: Unexpected token o in JSON at position 1
 /**
  * 
  * @authors Lv Hongbin (hblvsjtu@163.com)
  * @date    2018-06-21 11:02:19
  * @version 1.0.0
  * @description test for stream on the server
  */

 const http = require('http');
 const zlib = require('zlib');
 const fs = require('fs');

 // 服务端示例
 // 对每一个请求运行 gzip 操作的成本是十分高昂的.
 // 缓存压缩缓冲区是更加高效的方式.
 const server = http.createServer((req, res) => {
 	// res.write("welcome to my home!");

 	let encoding = req.headers['accept-encoding']; //这里要全小写
 	if (!encoding) {
 		encoding = '';
 	}

 	const gzip = zlib.createGzip();
 	const deflate = zlib.createDeflate();
 	const raw = fs.createReadStream('./index.html');
 	if (/\bdeflate\b/.test(encoding)) {
 		res.writeHead(200, {
 			'Content-Encoding': 'deflate'
 		});
 		raw.pipe(deflate).pipe(res);
 	} else if (/\bgzip\b/.test(encoding)) {
 		res.writeHead(200, {
 			'Content-Encoding': 'gzip'
 		});
 		raw.pipe(gzip).pipe(res);
 	} else {
 		res.writeHead(200, {});
 		raw.pipe(res);
 	}

 	res.setTimeout(10000);
 	res.on('timeout', () => {
 		console.log('oh no, timeout!');
 		res.end();
 	});

 });

 server.listen(8124, () => {
 	console.log('i am listening!');
 });
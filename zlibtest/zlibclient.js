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

const request = http.get({
	host: '127.0.0.1',
	path: '/',
	port: 8124,
	headers: {
		'accept-encoding': 'gzip'
	}
});

request.on('response', (response) => {
	const output = fs.createWriteStream('example.com_index.html');

	switch (response.headers['content-encoding']) {
		// 或者, 只是使用 zlib.createUnzip() 方法去处理这两种情况
		case 'gzip':
			console.log(`server encoding=zip`);
			response.pipe(zlib.createUnzip()).pipe(output);
			break;
		case 'deflate':
			response.pipe(zlib.createInflate()).pipe(output);
			break;
		default:
			response.pipe(output);
			break;
	}
});

request.on('error', (err) => {
	console.log(`err: ${err}`);
});
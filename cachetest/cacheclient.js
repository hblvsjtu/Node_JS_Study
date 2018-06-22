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
const crypto = require('crypto');

fs.readFile('client/index.html', function(err, fd) {
	let hashsum;
	if (!err) {
		// 获取文件的hash值
		const hash = crypto.createHash('sha256');
		hash.update(fd);
		hashsum = hash.digest('hex');
	}
	let option = {
		host: '127.0.0.1',
		path: '/',
		port: 8124,
		headers: {
			'accept-encoding': 'gzip',
			'if-modified-since': 'Fri, 22 Jun 2018 08:36:18 GMT',
			'if-none-match': hashsum
		}
	}
	var request = http.get(option);
	request.on('response', (response) => {

		// 获取所有响应头信息
		console.log(`Printing Header ...`);
		for (let prop in response.headers) {
			console.log(`${prop} = ${response.headers[prop]}`);
		}

		// 获取状态码statusCode
		const code = response.statusCode;
		console.log(`statusCode = ${code}`);

		// 获取状态码ETag
		const etag = response.headers['etag'];

		if (code == 304) {

			// 文件没有过期，不需要更新
			console.log(`文件没有过期，不需要更新`);
		} else if (code == 200) {

			// 文件已过期，需要重新写入
			fs.open('example.com_index.html', 'wx', (err, fd) => {
				if (err) {
					if (err.code === 'EEXIST') {
						console.error('文件已存在');
						return;
					}
					throw err;
				} else {
					console.error('文件不存在，正在创建。。。');
					fs.createReadStream('example.com_index.html');
				}
			})

			const output = fs.createWriteStream('example.com_index.html');

			// 判断
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
		}
	});

	request.on('error', (err) => {
		console.log(`err: ${err}`);
	});
});
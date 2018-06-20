/**
 * 
 * @authors Lv Hongbin (hblvsjtu@163.com)
 * @date    2018-06-20 10:21:59
 * @version 1.0.0
 * @description test for http 
 */

const http = require('http');
const url = require('url');

function parseCookie(cookie) {
	let cookies = {};
	if (!cookie) {
		return cookies;
	} else {
		let list = cookie.split(';');
		let i;
		let length = list.length;
		for (i = 0; i < length; i++) {
			let pair = list[i].split('=');
			let key = pair[0].trim();
			let name = pair[1].trim();
			cookies[key] = name;
		}
		return cookies;
	}
}

//创建http server
const server = http.createServer((req, res) => {

	// 设置响应头
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('X-Foo', 'bar');
	res.setHeader('Set-Cookie', ['system=Mac', 'tool=node']);
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});


	res.write('welcome!\n\r');

	// 打印请求信息
	const header = req.headers;
	console.log('\n\r打印header...');
	for (let props in header) {
		console.log(`${props} = ${header[props]}`);
	}
	console.log(`req.url = ${req.url}`);
	console.log(`req.method = ${req.method}`);
	console.log(`req.httpVersions = ${req.httpVersions}`);

	// 打印cookie
	console.log('\n\r打印cookie...');
	const cookie = parseCookie(header.cookie);
	for (let key in cookie) {
		console.log(`${key} = ${cookie[key]}`);
	}

	// 打印IP地址
	const ip = res.socket.remoteAddress;
	const port = res.socket.remotePort;
	console.log(`你的IP地址是 ${ip}，你的源端口是 ${port}。`);

	// 获取路径对象
	const clientPath = url.parse(req.url, true);

	// 获取参数对象
	console.log('\n\r打印参数对象...');
	const param = clientPath.query;
	for (let props in param) {
		console.log(`${props} = ${param[props]}`);
	}
	// 设置超时时间3min 3*60*1000=18000
	res.setTimeout(18000);
	res.on('timeout', () => console.log('oh no! timeout'));

	res.end('ok');
});

// http协议升级时使用
server.on('upgrade', (req, socket, head) => {
	socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
		'Upgrade: WebSocket\r\n' +
		'Connection: Upgrade\r\n' +
		'\r\n');

	socket.pipe(socket);
});

// 设置错误监听
server.on('clientError', (err, socket) => {
	console.log(`err = ${err}`)
	socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});


// 设置监听端口和回调函数
server.listen(8124, () => console.log('The http server is listening!'));
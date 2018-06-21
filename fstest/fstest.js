 /**
  * 
  * @authors Lv Hongbin (hblvsjtu@163.com)
  * @date    2018-06-21 11:02:19
  * @version 1.0.0
  * @description test for fs
  */

 const fs = require('fs');

 // 验证文件的可读可写行
 fs.open('1.txt', 'r', (err, fd) => {
 	if (err) {
 		if (err.code === 'ENOENT') {
 			console.error('文件不存在');
 			return;
 		}
 		throw err;
 	}

 	//readMyData(fd);
 	console.log('文件可读');

 	// 关闭文件
 	//fs.close(fd);
 });

 fs.open('1.txt', 'wx', (err, fd) => {
 	if (err) {
 		if (err.code === 'EEXIST') {
 			console.error('文件已存在');
 			return;
 		}
 		throw err;
 	}

 	//writeMyData(fd);
 	console.log('文件可写');

 	// 关闭文件
 	//fs.close(fd);
 });


 // 数据流的用法
 const defaultsReadStreamOption = {
 	flags: 'r',
 	encoding: null,
 	fd: null,
 	mode: 0o666,
 	autoClose: true,
 	highWaterMark: 64 * 1024
 };

 const defaultsWriteStreamOption = {
 	flags: 'w',
 	encoding: 'utf8',
 	fd: null,
 	mode: 0o666,
 	autoClose: true
 };

 let readStream = fs.createReadStream('./1.txt', defaultsReadStreamOption);
 let writeStream = fs.createWriteStream('./2.txt', defaultsWriteStreamOption);
 readStream.on('data', (chunk) => {
 	writeStream.write(chunk);
 });
 readStream.on('readable', () => {
 	console.log(`readable: ${readStream.read()}`);
 });
 readStream.on('end', () => {
 	console.log('end');
 });

 // 验证文件的监视
 fs.watch('./1.txt', [true, 'utf8'], (eventType, fd) => {
 	console.log(`事件类型是: ${eventType}`);
 	if (fd) {
 		console.log(`提供的文件名的标志符: ${fd}`);
 	} else {
 		console.log('未提供文件名');
 	}
 });

 // 文件的状态
 fs.stat('./1.txt', (err, stats) => {
 	if (err) throw err;
 	console.log(`文件属性: ${JSON.stringify(stats)}`);
 	console.log(`文件大小为：${stats.size}Byte`);
 });
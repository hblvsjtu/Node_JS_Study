# Node_JS_Study

## 五、相关API的使用
        
------        
        
### 作者：冰红茶  
### 参考书籍：《深入浅出node.js》 朴灵  
### 参考源：[Node：https://nodejs.org/en/](https://nodejs.org/en/)
### 参考源：[Node API文档：https://nodejs.org/dist/latest-v10.x/docs/api/](https://nodejs.org/dist/latest-v10.x/docs/api/)

            
------    
            
        

   本来我是想看完ES6之后就去看React全栈技术的，发现很多东西需要Node.JS的支持，所以我还是调转方向，先去搞朴灵老师的《深入浅出node.js》，后面再去搞React。后来发现node前面几章实在有点难度，遂先去搞React和MERN全栈了。再看Node的时候，才发现正确的打开方式应该是从书的最后几章看起，一直往前看。朴灵老师的这本著作得到阿里CNode社区创始人空无的背书，质量应该不错^_ ^
  
## 目录

## [五、相关API的使用](#5)
### [5.1 url](#5.1)
### [5.2 querystring](#5.2)
### [5.3 stream](#5.3)
### [5.4 fs](#5.4)
### [5.5 Zlib](#5.5)
### [5.6 crypto (加密)](#5.6)
            
        
<h2 id='5'>五、其他API</h2>
        
<h3 id='5.1'>5.1 url</h3>  
        
#### 1) url.parse(urlString[, parseQueryString[, slashesDenoteHost]]) 
> - url.parse() 方法会解析一个 URL 字符串并返回一个 URL 对象
> - parseQueryString < boolean> 如果为 true，则 query 属性总会通过 querystring 模块的 parse() 方法生成一个对象urlObject。 如果为 false，则返回的 URL 对象上的 query 属性会是一个未解析、未解码的字符串。 默认为 false。
#### 2) urlObject
> - urlObject.auth
> - urlObject.hash
> - urlObject.host
> - urlObject.hostname
> - urlObject.href
> - urlObject.path
> - urlObject.pathname
> - urlObject.port
> - urlObject.protocol
> - urlObject.query
> - urlObject.search
> - urlObject.slashes  
                
                Url {
                  protocol: null,
                  slashes: null,
                  auth: null,
                  host: null,
                  port: null,
                  hostname: null,
                  hash: null,
                  search: '?name=ryan',
                  query: 'name=ryan',
                  pathname: '/status',
                  path: '/status?name=ryan',
                  href: '/status?name=ryan' }
#### 3) url.resolve(from, to)
> - from < string> 解析时相对的基本 URL。
> - to < string> 要解析的超链接 URL。
                
                const url = require('url');
                url.resolve('/one/two/three', 'four');         // '/one/two/four'
                url.resolve('http://example.com/', '/one');    // 'http://example.com/one'
                url.resolve('http://example.com/one', '/two'); // 'http://example.com/two'

        
<h3 id='5.2'>5.2 querystring</h3>  
        
#### 1) 安装
> - querystring 模块提供了一些实用函数，用于解析与格式化 URL 查询字符串。 可以通过以下方式使用
                
                const querystring = require('querystring'); 
#### 2) querystring.parse(str\[, sep\[, eq\[, options\]\]\])
> - str < string> 要解析的 URL 查询字符串。
> - sep < string> 用于界定查询字符串中的键值对的子字符串。默认为 '&'。
> - eq < string> 用于界定查询字符串中的键与值的子字符串。默认为 '='。
> - options < Object>
>> - decodeURIComponent < Function> 解码查询字符串的字符时使用的函数。默认为 querystring.unescape()。
>> - maxKeys < number> 指定要解析的键的最大数量。指定为 0 则不限制。默认为 1000。
                
                // 例如：查询字符串 'foo=bar&abc=xyz&abc=123' 被解析成：

                {
                  foo: 'bar',
                  abc: ['xyz', '123']
                }
#### 3) querystring.stringify(obj\[, sep\[, eq\[, options\]\]\])#
                
                querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
                // 返回 'foo=bar&baz=qux&baz=quux&corge='

                querystring.stringify({ foo: 'bar', baz: 'qux' }, ';', ':');
                // 返回 'foo:bar;baz:qux'
 

<h3 id='5.3'>5.3 stream</h3>  
        
#### 1) 简介
> - 流（stream）在 Node.js 中是处理流数据的抽象接口（abstract interface）
> - 流可以是可读的、可写的，或是可读写的。所有的流都是 EventEmitter 的实例
> - 例如， HTTP 请求 和 process.stdout 就都是流的实例
#### 2）引入
                
                const stream = require('stream');
#### 3）流的类型
> - Readable - 可读的流 (例如 fs.createReadStream()).
> - Writable - 可写的流 (例如 fs.createWriteStream()).
> - Duplex - 可读写的流 (例如 net.Socket).
> - Transform - 在读写过程中可以修改和变换数据的 Duplex 流 (例如 zlib.createDeflate())
#### 4）缓冲
> - Writable 和 Readable 流都会将数据存储到内部的缓冲器（buffer）中。这些缓冲器可以 通过相应的 writable._writableState.getBuffer() 或 readable._readableState.buffer 来获取。
> - 缓冲器的大小取决于传递给流构造函数的 highWaterMark 选项。 对于普通的流， highWaterMark 选项指定了总共的字节数。对于工作在对象模式的流， highWaterMark 指定了对象的总数。
#### 5）可读流
> - 可读流（Readable streams）是对提供数据的 源头 （source）的抽象
>> - HTTP responses, on the client
>> - HTTP requests, on the server
>> - fs read streams
>> - zlib streams
>> - crypto streams
>> - TCP sockets
>> - child process stdout and stderr
>> - process.stdin
> - on 事件类型
>> - close 'close' 事件将在流或其底层资源（比如一个文件）关闭后触发。'close' 事件触发后，该流将不会再触发任何事件。
>> - data
>> - end 
>> - error
>> - readable
> - 两种模式  
>> - 在 flowing 模式下， 可读流自动从系统底层读取数据，并通过 EventEmitter 接口的事件尽快将数据提供给应用。
>> - 在 paused 模式下，必须显式调用 stream.read() 方法来从流中读取数据片段。
> - 可以通过下面三种途径切换到 flowing 模式
>> - 监听 'data' 事件。
>> - 调用 stream.resume() 方法。
>> - 调用 stream.pipe() 方法将数据发送到 Writable。 
> - 可以通过下面两种途径切换到 paused 模式
>> - 如果不存在管道目标（pipe destination），可以通过调用 stream.pause() 方法实现。
>> - 如果存在管道目标，可以通过取消 'data' 事件监听，并调用 stream.unpipe() 方法移除所有管道目标来实现。  
#### 6）可写流
> - 可写流是对数据写入'目的地'的一种抽象。
>> - HTTP requests, on the client
>> - HTTP responses, on the server
>> - fs write streams
>> - zlib streams
>> - crypto streams
>> - TCP sockets
>> - child process stdin
>> - process.stdout, process.stderr
> - pipe 与 unpipe 管道的用法
                
                const writer = getWritableStreamSomehow();
                const reader = getReadableStreamSomehow();
                writer.on('unpipe', (src) => {
                  console.error('Something has stopped piping into the writer.');
                  assert.equal(src, reader);
                });
                reader.pipe(writer);
                reader.unpipe(writer);
#### 7) 文件流的用法 
> - 创建读写流
            
                // 读
                var readStream = fs.createReadStream('./1.txt');

                // 写
                var writeStream = fs.createWriteStream('./2.txt');
> - 监视流的事件
                
                readStream.on('data', (chunk) => {
                    writeStream.write(chunk);
                });           
> - 举例子
                
                const fs = require('fs');
                var readStream = fs.createReadStream('./1.txt');
                var writeStream = fs.createWriteStream('./2.txt');

                // 处理update事件
                readStream.on('data', (chunk) => {
                    if(writeStream.write(chunk) == false) {
                        readStream.pause();
                    };
                });

                // 处理再次写入的事件
                writeStreamre.on('train', () => {
                    readStream.resume();
                })

                // 处理结束事件
                readStream.on('end', () => {
                    writeStream.end();
                });

                // 处理错误
                readStream.on('error', function(error){
                    console.log(error);
                });

              
<h3 id='5.4'>5.4 fs</h3>  
        
#### 1) fs - 文件系统
> - const fs = require('fs');
> - 所有的外部变量都无法传入，所有的内部变量都无法传出
> - 所有的文件系统操作都有异步和同步两种形式
> - 创建一个文件 
                
                //异步地写入数据到文件，如果文件已经存在，则覆盖文件。 data 可以是字符串或 buffer。    
                fs.writeFile('message.txt', 'Hello Node.js', (err) => {
                  if (err) throw err;
                  console.log('The file has been saved!');
                });

                //或者利用创建流的方法，两种方法都可以
                fs.createReadStream('example.com_index.html');
                fs.createWriteStream('example.com_index.html');
#### 2) 异步操作用法
> - 注意，异步的方法不能保证执行顺序。 所以下面的例子可能会出错，因为 fs.stat() 操作可能在 fs.rename() 操作之前完成
> - 在繁忙的进程中，建议使用函数的异步版本。 同步的方法会阻塞整个进程，直到完成（停止所有连接）。
> - 大多数 fs 函数可以省略回调函数，在这种情况下，会使用默认的回调函数。 若要追踪最初的调用点，可设置 NODE_DEBUG 环境变量：
> - 不建议省略异步函数的回调函数，未来的版本可能会导致抛出错误
                

                fs.rename('/tmp/hello', '/tmp/world', (err) => {
                  if (err) throw err;
                  console.log('重命名完成');
                });
                fs.stat('/tmp/world', (err, stats) => {
                  if (err) throw err;
                  console.log(`文件属性: ${JSON.stringify(stats)}`);
                });

                // 若想按正确的顺序执行操作，则需要把 fs.stat() 放到 fs.rename() 操作的回调函数中：
                fs.rename('/tmp/hello', '/tmp/world', (err) => {
                  if (err) throw err;
                  fs.stat('/tmp/world', (err, stats) => {
                    if (err) throw err;
                    console.log(`文件属性: ${JSON.stringify(stats)}`);
                  });
                });
#### 3) 利用文件的打开检测可读可写性 fs.open
> - 可读
                
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
                });
> - 可写
                    
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
                });
>> - 大部分 fs 操作接受字符串、Buffer、或使用 file: 协议的 URL 对象作为文件路径，可以使用绝对路径或者相对路径
>> - 相对路径会相对于 process.cwd() 定义的当前工作目录进行处理
>> - file: URL 必须是绝对路径，且只支持使用 file: 协议的 URL 对象这就意味着必须使用new URL(file\://绝对路径)
                
                LvHongbins-Mac-2:streamtest lvhongbin$ node
                > process.cwd()
                '/Users/lvhongbin/Desktop/Node_JS_Study/streamtest'
#### 4) 读文件fs.readFile
> - fs.readFile(path\[, options\], callback) 
> - 异步地读取一个文件的全部内容
> - 同步版本 fs.readFileSync(path\[, options\])
> - 回调有两个参数 (err, data)，其中 data 是文件的内容
> - 如果 options 是一个字符串，则它指定了字符编码和File System Flags
>> - 'a' - Open file for appending. The file is created if it does not exist.
>> - 'ax' - Like 'a' but fails if the path exists.
>> - 'a+' - Open file for reading and appending. The file is created if it does not exist.
>> - 'ax+' - Like 'a+' but fails if the path exists.
>> - 'as' - Open file for appending in synchronous mode. The file is created if it does not exist.
>> - 'as+' - Open file for reading and appending in synchronous mode. The file is created if it does not exist.
>> - 'r' - Open file for reading. An exception occurs if the file does not exist.
>> - 'r+' - Open file for reading and writing. An exception occurs if the file does not exist.
>> - 'rs+' - Open file for reading and writing in synchronous mode. Instructs the operating system to bypass the local file system cache.
>> - 'w' - Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
>> - 'wx' - Like 'w' but fails if the path exists.
>> - 'w+' - Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).
>> - 'wx+' - Like 'w+' but fails if the path exists.
                
                fs.readFile('streamtest.js', 'utf8', (err, data) => {
                  if (err) throw err;
                  //console.log(data);
                  console.log(data instanceof String);
                  console.log(data instanceof ArrayBuffer);
                  console.log(data instanceof Buffer);
                  console.log(data instanceof string);
                });
> - 同步版本： fs.readFileSync()
#### 5) 读流数据fs.read
>fs.read(fd, buffer, offset, length, position, callback) 用流去读
>> - fd < integer> 文件描述符
>> - buffer < Buffer> | < Uint8Array> 一个Buffer对象，v8引擎分配的一段内存
>> - offset < integer>
>> - length < integer>
>> - position < integer>
>> - callback < Function>
>>> - err < Error>
>>> - bytesRead < integer>
>>> - buffer <Buffer>
#### 6) 写文件 fs.writeFile
> - fs.writeFile(path\[, options\], callback)
#### 7) 写流数据fs.read
> - fs.write(fd, buffer, offset, length, position, callback) 用流去读
> - fs.fsync(fd); //刷新缓冲区
> - fs.close(fd); //关闭文件
#### 8) 文件的监视 
> - 返回fs.FSWatcher 对象
> - fs.watch(filename\[, options\]\[, callback(eventType, filename)\])
> - eventType 可以是 'rename' 或 'change'，filename 是触发事件的文件的名称。
> - 注意，在大多数平台，当一个文件出现或消失在一个目录里时，'rename' 会被触发。
> - options < string> | < Object>
>> - persistent < boolean> 指明如果文件正在被监视，进程是否应该继续运行。默认 = true
>> - recursive < boolean> 指明是否全部子目录应该被监视，或只是当前目录。 适用于当一个目录被指定时，且只在支持的平台（详见 Caveats）。默认 = false
>> - encoding < string> 指定用于传给监听器的文件名的字符编码。默认 = 'utf8'
#### 9) fs.Stats 类 
> - 属性包括
                
                Stats {
                  dev: 2114,
                  ino: 48064969,
                  mode: 33188,
                  nlink: 1,
                  uid: 85,
                  gid: 100,
                  rdev: 0,
                  size: 527,
                  blksize: 4096,
                  blocks: 8,
                  atimeMs: 1318289051000.1,
                  mtimeMs: 1318289051000.1,
                  ctimeMs: 1318289051000.1,
                  birthtimeMs: 1318289051000.1,
                  atime: Mon, 10 Oct 2011 23:24:11 GMT,
                  mtime: Mon, 10 Oct 2011 23:24:11 GMT,
                  ctime: Mon, 10 Oct 2011 23:24:11 GMT,
                  birthtime: Mon, 10 Oct 2011 23:24:11 GMT }
> - 用法
                
                // 文件的状态
                fs.stat('./1.txt', (err, stats) => {
                    if (err) throw err;
                    console.log(`文件属性: ${JSON.stringify(stats)}`);
                    console.log(`文件大小为：${stats.size}Byte`);
                });                  
#### 10) 例子
> -  streamserver.js
                
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
> -  streamclient.js
                
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

              
<h3 id='5.5'>5.5 Zlib</h3>  
        
#### 1) 介绍
> - zlib模块提供通过 Gzip 和 Deflate/Inflate 实现的压缩功能，可以通过这样使用它
                
                const zlib = require('zlib');
> - 压缩或者解压数据流(例如一个文件)通过zlib流将源数据流传输到目标流中来完成
                
                const gzip = zlib.createGzip();
                const fs = require('fs');
                const inp = fs.createReadStream('input.txt');
                const out = fs.createWriteStream('input.txt.gz');

                inp.pipe(gzip).pipe(out);

                //或者 要求解压的是Buffer
                const input = '.................................';
                zlib.deflate(input, (err, buffer) => {
                  if (!err) {
                    console.log(buffer.toString('base64'));
                  } else {
                    // handle error
                  }
                });

                const buffer = Buffer.from('eJzT0yMAAGTvBe8=', 'base64');
                zlib.unzip(buffer, (err, buffer) => {
                  if (!err) {
                    console.log(buffer.toString());
                  } else {
                    // handle error
                  }
                });
#### 2) 用于stream的相关函数 可使用pipe
> - zlib 可以用来实现对 HTTP 中定义的 gzip 和 deflate 内容编码机制的支持。
> - zlib.createDeflate(\[options\])
> - zlib.createDeflateRaw(\[options\])
> - zlib.createGunzip(\[options\])
> - zlib.createGzip(\[options\])
> - zlib.createInflate(\[options\])
> - zlib.createInflateRaw(\[options\])
> - zlib.createUnzip(\[options\])
#### 3) 用于buffer的相关函数
> - zlib.deflate(buffer\[, options\], callback)
> - zlib.deflateSync(buffer\[, options\])
> - zlib.deflateRaw(buffer\[, options\], callback)
> - zlib.deflateRawSync(buffer\[, options\])
> - zlib.gunzip(buffer\[, options\], callback)
> - zlib.gunzipSync(buffer\[, options\])
> - zlib.gzip(buffer\[, options\], callback)
> - zlib.gzipSync(buffer\[, options\])
> - zlib.inflate(buffer\[, options\], callback)
> - zlib.inflateSync(buffer\[, options\])
> - zlib.inflateRaw(buffer\[, options\], callback)
> - zlib.inflateRawSync(buffer\[, options\])
> - zlib.unzip(buffer\[, options\], callback)
> - zlib.unzipSync(buffer\[, options\])
#### 4）option
> - flush < integer> Default: zlib.constants.Z_NO_FLUSH
> - finishFlush < integer> Default: zlib.constants.Z_FINISH
> - chunkSize < integer> Default: 16 * 1024
> - windowBits < integer>
> - level < integer> (compression only)
> - memLevel < integer> (compression only)
> - strategy < integer> (compression only)
> - dictionary < Buffer> | < TypedArray> | < DataView> | < ArrayBuffer> (deflate/inflate only, empty dictionary by default)
> - info < boolean> (If true, returns an object with buffer and engine.)
#### 5) 例子
> - zlibserver.js
                
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
> - zlibclient.js
                
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

              
<h3 id='5.6'>5.6 crypto (加密)</h3>  
        
#### 1) 介绍
> - crypto 模块提供了加密功能，包含对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装。
> - 使用 require('crypto') 来访问该模块。
> - 最简单的使用方法
                    
                // 获取文件的hash值
                const hash = crypto.createHash('sha256');
                hash.update(fd);
                const hashsum = hash.digest('hex');
                console.log(`hash = ${hashsum}`);
# Node_JS_Study

        
------        
        
### 作者：冰红茶  
### 参考书籍：《深入浅出node.js》 朴灵  
## 参考源：[Node：https://nodejs.org/en/](https://nodejs.org/en/)
## 参考源：[Node API文档：https://nodejs.org/dist/latest-v10.x/docs/api/](https://nodejs.org/dist/latest-v10.x/docs/api/)

            
------    
            
        

   本来我是想看完ES6之后就去看React全栈技术的，发现很多东西需要Node.JS的支持，所以我还是调转方向，先去搞朴灵老师的《深入浅出node.js》后，后面再去搞React 朴灵老师的这本著作得到阿里CNode社区创始人空无的背书，质量应该不错^_ ^
  
## 目录

## [一、Node简介](#1)
### [1.1 两个为什么](#1.1)
### [1.2 Node对JS的意义](#1.2)   
### [1.3 Node的特点](#1.3)
## [二、Buffer](#2)
### [2.1 简介](#2.1)
### [2.2 语法与使用](#2.2)   
### [2.3 其他API](#2.3)
## [三、网络编程](#3)
### [3.1 简介](#3.1)
### [3.2 构建TCP服务器](#3.2)   
### [3.3 构建HTTP服务](#3.3)
## [四、构建Web应用](#4)
### [4.1 简介](#4.1)
### [4.2 请求方法与路径解析](#4.2)   
### [4.3 URL中查询字符串的解析与Cookies解析](#4.3)
## [五、相关API的使用](#5)
### [5.1 url](#5.1)
### [5.2 querystring](#5.2)
### [5.3 stream模块](#5.3)
### [5.4 fs模块](#5.4)
          
------      
        
        
<h2 id='1'> 一、Node简介</h2>
<h3 id='1.1'>1.1 两个为什么</h3>  
        
#### 1) 为什么选择JavaScript作为实现的语言
> - 基于事件驱动
> - 没有阻塞I/O开发的历史包袱
> - 高性能
> - 开发门槛低 C语言的开发门槛比较高
#### 2) 为什么叫Node
> - 起初Ryan Dahl称他的项目为web.js，其实就是一个Web服务器
> - 它自身是非常简单的，很容易通过扩展来达到构建大型网络应用的目的
> - “每一个Node进程都构成了这个网络应用中的一个节点，这是它名字所含意义的真谛”
> - 开发门槛低
        
<h3 id='1.2'>1.2 Node对JS的意义</h3>  
        
#### 1) 拓展了JS的应用范围
> - Node因为不像客户端JS那样只需要交互用的单线程功能便可，Node更多的是需要担任异步I/O这样的角色，所以没有支持HTML和Webkit
> - 但是除了没有HTML和Webkit组件外，其他的跟Chrome很相似
>>>>>> ![图1-1 Chrome和Node的组建构成.png](https://github.com/hblvsjtu/Node_JS_Study/blob/master/picture/%E5%9B%BE1-1%20Chrome%E5%92%8CNode%E7%9A%84%E7%BB%84%E5%BB%BA%E6%9E%84%E6%88%90.png?raw=true) 
> - Node转变了JS以前只能跟浏览器打交道的弱势，改为前后端相结合，大大降低了前后端转换所需要付出的代价
        
<h3 id='1.3'>1.3 Node的特点</h3>  
        
#### 1) 异步I/O
> - 符合“Don't call me, I will call you”的原则，在执行等待过程中，其他的语句继续执行，然后等待响应，响应回来了之后就执行回调函数。
> - 异步I/O对两个文件的读取任务取决于最慢的那个文件读取的耗时
> - 同步I/O对两个文件的读取任务耗时为两个任务的耗时之和
> - 异步有一个缺点是是的流程管理不容易被分析
> - “语言层面即可天然并行”，我觉得指的应该是promise.all()和promise.race()
#### 2) 回调函数
> - 异步，事件和回调函数是Node的三大特色
#### 3) 单线程
> - 在Node中，JS与其他线程是无法共享任何状态的
> - 不会发生死锁
> - 也没有线程上下文交换所带来的性能上的开销
> - 缺点：也是大多数单线程的特点，无法使用多核CPU；一旦发生错误就会引发程序崩溃；大量计算占用CPU会导致无法继续调用异步I/O；
> - 为了解决计算量大导致阻塞的问题，Node的解决方案child_process跟HTML5的Web Worker类似，创建工作线程并通过消息传递的方式来传递运行结果给主线程
#### 4) 应用场景
> - I/O密集型 得益于“Node利用事件循环的处理能力，而不是启动每一个线程为每一个请求服务，资源占用极少”
> - CPU密集型 I/O阻塞造成的性能消耗比远比CPU小，而且Node异步I/O已经解决了在单线程上CPU与I/O之间阻塞无法重叠利用的问题；
> - 虽然Node没有提供多线程用于计算，但是还是有办法去充分利用CPU，第一种办法是利编写C/C++拓展的方式，将V8不能 做到极致的地方通过C/C++来实现；第二种方式是通过子进程child_process的方式，将一部分Node进程当作常驻服务进程 用于计算，利用进程间消息来传递结果，将计算和I/O分离
> - “CPU密集并不可怕，如何合理调度是诀窍”
          
------      

               
<h2 id='2'> 二、Buffer</h2>
<h3 id='2.1'>2.1 简介</h3>  
      
#### 1) 什么是Buffer？
> - Buffer像一个Array对象，主要用来操作字节，或者说是一些二进制数据
> - 所占用的内存不是通过V8分配的，属于堆外内存，利用了C++内建模块
> - Buffer 类的实例类似于整数数组，但 Buffer 的大小是固定的、且在 V8 堆外分配物理内存。 Buffer 的大小在被创建时确定，且无法调整。
#### 2) 为什么需要Buffer？
> - 这是因为Node主要用来处理网络应用的一些问题，其中包括网络流和文件的操作，还有大量的二进制数据
> - 而Node自身的字符串无法满足这些需求
> - 所以需要Buffer 
> - 事实上如果是处理UTF-8的字符的话，使用string类操作比使用Buffer类的操作更快，详细看[DoubleSpout的博客](https://cnodejs.org/topic/5189ff4f63e9f8a54207f60c)
       
<h3 id='2.2'>2.2 语法与使用</h3>  
      
#### 1) 安装
> - Buffer 类在 Node.js 中是一个全局变量，因此无需使用 require('buffer').Buffer。
#### 2) new Buffer()
> - 传入不同的参数功能也不一样
>> - 传一个数值作为第一个参数给 Buffer()（如 new Buffer(10)），则分配一个指定大小的新建的 Buffer 对象。
>> - 传一个字符串、数组、或 Buffer 作为第一个参数，则将所传对象的数据拷贝到 Buffer 中。
>> - 传入 ArrayBuffer 或 SharedArrayBuffer，则返回一个与传入的 ArrayBuffer 共享所分配内存的 Buffer。
> - 为了使 Buffer 实例的创建更可靠、更不容易出错，各种 new Buffer() 构造函数已被 废弃，并由 Buffer.from()、Buffer.alloc()、和 Buffer.allocUnsafe() 方法替代。
#### 3) Buffer.from()
> - Buffer.from(array) 返回一个新建的包含所提供的字节数组的副本的 Buffer。 
> - Buffer.from(buffer) 返回一个新建的包含所提供的 Buffer 的内容的副本的 Buffer
> - Buffer.from(string\[, encoding\]) 返回一个新建的包含所提供的字符串的副本的 Buffer。
> - Buffer.from(arrayBuffer\[, byteOffset \[, length\]\])]Buffer.from(arrayBuffer) 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
                
                > var buffer = Buffer.from('lvhongbin');
                undefined
                > buffer
                <Buffer 6c 76 68 6f 6e 67 62 69 6e>
                > buffer.toString("utf8");
                'lvhongbin'
                > var buffer = Buffer.from('吕鸿斌');
                undefined
                > buffer.toString("utf8");
                '吕鸿斌'
                > buffer.toString();
                '吕鸿斌'
                > buffer;
                <Buffer e5 90 95 e9 b8 bf e6 96 8c>
#### 4) Buffer 与 TypedArray
> - TypedArray.buffer 返回一个ArrayBuffer类型
                
                LvHongbins-Mac-2:~ lvhongbin$ node
                > const arr = new Uint16Array(2);
                undefined
                > arr.buffer instanceof ArrayBuffer
                true

                const arr = new Uint16Array(2);

                arr[0] = 5000;
                arr[1] = 4000;

                // 拷贝 `arr` 的内容
                const buf1 = Buffer.from(arr);

                // 与 `arr` 共享内存
                const buf2 = Buffer.from(arr.buffer);

                // 输出: <Buffer 88 a0>
                console.log(buf1);

                // 输出: <Buffer 88 13 a0 0f>
                console.log(buf2);

                arr[1] = 6000;

                // 输出: <Buffer 88 a0>
                console.log(buf1);

                // 输出: <Buffer 88 13 70 17>
                console.log(buf2);
#### 5) Buffer转字符串
> - Buffer.toString(encodeType)
> - encodeType包括：
>> - 'ascii' - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。
>> - 'utf8' - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。
>> - 'utf16le' - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
>> - 'ucs2' - 'utf16le' 的别名。
>> - 'base64' - Base64 编码。当从字符串创建 Buffer 时，按照 RFC4648 第 5 章的规定，这种编码也将正确地接受“URL 与文件名安全字母表”。
>> - 'latin1' - 一种把 Buffer 编码成一字节编码的字符串的方式（由 IANA 定义在 RFC1345 第 63 页，用作 Latin-1 补充块与 C0/C1 控制码）。
>> - 'binary' - 'latin1' 的别名。
>> - 'hex' - 将每个字节编码为两个十六进制字符。 
> - Buffer.isEncoding(encoding) 如果 encoding 是一个支持的字符编码则返回 true，否则返回 false 。 
                
                > Buffer.isEncoding('GBK');
                false
                > Buffer.isEncoding('utf8');
                true

        
<h3 id='2.3'>2.3 其他API</h3>  
      
#### 1) 拼接
> - 类方法：Buffer.concat(list\[, totalLength\])
> - list < Array> 要合并的 Buffer 或 Uint8Array 实例的数组
> - totalLength < integer> 合并时 list 中 Buffer 实例的总长度
> - 返回: < Buffer>
                
                const buf1 = Buffer.alloc(10);
                const buf2 = Buffer.alloc(14);
                const buf3 = Buffer.alloc(18);
                const totalLength = buf1.length + buf2.length + buf3.length;

                // 输出: 42
                console.log(totalLength);

                const bufA = Buffer.concat([buf1, buf2, buf3], totalLength);

                // 输出: <Buffer 00 00 00 00 ...>
                console.log(bufA);

                // 输出: 42
                console.log(bufA.length);
#### 2) 比较
> - buf.compare(target\[, targetStart\[, targetEnd\[, sourceStart\[, sourceEnd\]\]\]\])
> - 如果 target 与 buf 相同，则返回 0 。
> - 如果 target 排在 buf 前面，则返回 1 。
> - 如果 target 排在 buf 后面，则返回 -1 。
                
                const buf1 = Buffer.from('ABC');
                const buf2 = Buffer.from('BCD');
                const buf3 = Buffer.from('ABCD');

                // 输出: 0
                console.log(buf1.compare(buf1));

                // 输出: -1
                console.log(buf1.compare(buf2));

                // 输出: -1
                console.log(buf1.compare(buf3));

                // 输出: 1
                console.log(buf2.compare(buf1));

                // 输出: 1
                console.log(buf2.compare(buf3));

          
------      
        
<h2 id='3'> 三、网络编程</h2>
<h3 id='3.1'>3.1 简介</h3>  
        
#### 1) 网络服务器
> - ASP和ASP.net需要IIS作为服务器
> - PHP需要Apache或者Nginx作为服务器
> - JSP需要Tomcat作为服务器
> - 但是Node自己就可以搭建服务器，不需要额外的容器 
#### 2) Node提供的服务器模块
> - net -> TCP 
> - dgam -> UDP
> - http -> HTTP
> - https -> HTTPS
#### 3) OSI 7层模型
> - 物理层
> - 链路层
> - 网络层 IP
> - 运输层 TCP/UDP
> - 会话层（五层模型没有的）通讯连接/维持会话
> - 表示层（五层模型没有的）用来解谜/加密
> - 应用层 HTTP、SMTP、IMAP
    
<h3 id='3.2'>3.2 构建TCP服务器</h3>  
        
#### 1) 网络服务器 net模块
> - The net module provides an asynchronous network API for creating stream-based TCP or IPC servers (net.createServer()) and clients (net.createConnection()).
#### 2) 基本网络工具 telnet
> - [Telnet协议是TCP/IP协议族中的一员，是Internet远程登陆服务的标准协议和主要方式。它为用户提供了在本地计算机上完成远程主机工作的能力。在终端使用者的电脑上使用telnet程序，用它连接到服务器。终端使用者可以在telnet程序中输入命令，这些命令会在服务器上运行，就像直接在服务器的控制台上输入一样。可以在本地就能控制服务器。要开始一个telnet会话，必须输入用户名和密码来登录服务器。Telnet是常用的远程控制Web服务器的方法。--百度百科](https://baike.baidu.com/item/Telnet/810597?fr=aladdin)
> - 用途
>> - Escape character is '^]' ^表示【ctrl】这一行命令表示退出telnet的命令输入
>> - quit表示退出telnet终端
>> - close关闭当前连接
>> - logout强制退出远程用户并关闭连接
>> - display显示当前操作的参数
>> - mode试图进入命令行方式或字符方式
>> - open连接到某一站点
>> - quit退出
>> - telnetsend发送特殊字符
>> - set设置当前操作的参数
>> - unset复位当前操作参数
>> - status打印状态信息
>> - toggle对操作参数进行开关转换
>> - slc改变特殊字符的状态
>> - auth打开/关闭确认功能z挂起
>> - telnetenviron更改环境变量?显示帮助信息
>> - 启动服务器，用telnet 去查看这个端口是否可用
                
                // 安装
                brew install telnet

                // 使用：
                telnet 114.80.67.193 8080               
#### 3) 服务器事件EventEmitter实例回调函数
> - listening：在server.listen(port, callback)绑定端口或者Domin Socket后触发
                
                server.listen(8124, () => {
                    console.log('server bound');
                });
> - connection: const server = net.createServer(callback(socket))
> - close: server.close([callback])后触发
> - error: 产生错误时触发，一般使用on来监测
                
                server.on('error', (err) => {
                    throw err;
                });
#### 4) 连接事件 socket.on(type, callback)
> - data
> - on
> - connect
> - error
> - close
> - timeout
> - socket.write() 给client发送可写可读的Stream对象
#### 5) 实例
> - tcp.js
                
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
>>>>>> ![图2-1 telnet与tcp连接](https://github.com/hblvsjtu/Node_JS_Study/blob/master/picture/%E5%9B%BE2-1%20telnet%E4%B8%8Etcp%E8%BF%9E%E6%8E%A5.png?raw=true)
        

           
<h3 id='3.3'>3.3 构建HTTP服务</h3>  
        
#### 1) 网络服务器 http模块
> - TCP和UDP都属于网络传输层协议，如果要构建高效的网络应用，就应该从应用层着手
> - 在Node中，HTTP服务继承自TCP服务器，他能够与多个客户端保持连接，由于采用事件驱动的方式，并不为每一个连接创建额外的线程或者进程，保持着很低的内存占用，并能实现高并发。
> - TCP服务以connect为单位进行服务，而HTTP服务则以request为单位进行服务
> - http模块即是将connection到request的过程进行了封装
> - socket.write() -> ServerRequest对象
> - socket.on('data',callback) -> ServerResponse对象
> - HTTP请求对象和HTTP响应对象是相对较底层的封装，现在的Connect和Express都是在这两个对象的基础上进行高层封装完成的
#### 2) http模块安装
> - 要使用 HTTP 服务器与客户端，需要 require('http')
                
                LvHongbins-Mac-2:httptest lvhongbin$ npm install --save-dev http
                npm notice created a lockfile as package-lock.json. You should commit this file.
                npm WARN httptest@1.0.0 No description
                npm WARN httptest@1.0.0 No repository field.

                + http@0.0.0
                added 1 package and audited 1 package in 3.423s
                found 0 vulnerabilities  

> - 安装url处理模块 require('url')
                
                LvHongbins-Mac-2:httptest lvhongbin$ npm install -save-dev url
                npm WARN httptest@1.0.0 No description
                npm WARN httptest@1.0.0 No repository field.

                + url@0.11.0
                added 3 packages from 3 contributors and audited 4 packages in 4.127s
                found 0 vulnerabilities   

> - 安装querystring处理模块 
                
                LvHongbins-Mac-2:httptest lvhongbin$ npm install --save-dev querystring
                npm WARN httptest@1.0.0 No description
                npm WARN httptest@1.0.0 No repository field.

                + querystring@0.2.0
                updated 1 package and audited 5 packages in 3.484s
                found 0 vulnerabilities                         
#### 3) 消息头
> - 消息头的类型是对象，键名是小写的，键值不能修改
                
                { 'content-length': '123',
                  'content-type': 'text/plain',
                  'connection': 'keep-alive',
                  'host': 'mysite.com',
                  'accept': '*/*' }
> - response.writeHead(statusCode、\[, statusMessage\]\[, headers\])  发送一个响应头给请求。 状态码是一个三位数的 HTTP 状态码，如 404。 最后一个参数 headers 是响应头。 第二个参数 statusMessage 是可选的状态描述。
                
                // 返回 content-type = text/plain
                const server = http.createServer((req, res) => {
                  res.setHeader('Content-Type', 'text/html');
                  res.setHeader('X-Foo', 'bar');
                  res.writeHead(200, { 'Content-Type': 'text/plain' });
                  res.end('ok');
                });
#### 4) 客户端创建 http.request(options\[, callback\])
> - option
>> - protocol < string> 使用的协议。默认为 http:。
>> - host < string> 请求发送至的服务器的域名或 IP 地址。默认为 localhost。
>> - hostname < string> host 的别名。为了支持 url.parse()，hostname 优先于 host。
>> - family < number> 当解析 host 和 hostname 时使用的 IP 地址族。 有效值是 4 或 6。当未指定时，则同时使用 IP v4 和 v6。
>> - port < number> 远程服务器的端口。默认为 80。
>> - localAddress < string> 为网络连接绑定的本地接口。
>> - socketPath < string> Unix 域 Socket（使用 host:port 或 socketPath）。
>> - method < string> 指定 HTTP 请求方法的字符串。默认为 'GET'。
>> - path < string> 请求的路径。默认为 '/'。 应包括查询字符串（如有的话）。如 '/index.html?page=12'。 当请求的路径中包含非法字符时，会抛出异常。 目前只有空字符会被拒绝，但未来可能会变化。
>> - headers < Object> 包含请求头的对象。
>> - auth < string> 基本身份验证，如 'user:password' 用来计算 Authorization 请求头。
>> - agent < http.Agent> | < boolean> 控制 Agent 的行为。 可能的值有：
>> - undefined (默认): 对该主机和端口使用 http.globalAgent。
>> - Agent 对象：显式地使用传入的 Agent。
>> - false: 创建一个新的使用默认值的 Agent。
>> - createConnection < Function> 当不使用 agent 选项时，为请求创建一个 socket 或流。 这可以用于避免仅仅创建一个自定义的 Agent 类来覆盖默认的 createConnection 函数。详见 agent.createConnection()。 Any Duplex stream is a valid return value.
>> - timeout < number>: 指定 socket 超时的毫秒数。 它设置了 socket 等待连接的超时时间。
> - response
> - socket
> - Connect
> - upgrade
> - continue
#### 7) 例子
> - httpserver.js                
                
                /**
                 * 
                 * @authors Lv Hongbin (hblvsjtu@163.com)
                 * @date    2018-06-20 10:21:59
                 * @version 1.0.0
                 * @description test for http 
                 */

                const http = require('http');
                const url = require('url');

                //创建http server
                const server = http.createServer((req, res) => {

                    // 设置响应头
                    res.setHeader('Content-Type', 'text/html');
                    res.setHeader('X-Foo', 'bar');
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
> - httpclient.js 
                
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

                req.setHeader('Content-Type', 'application/json');
                req.write('hello,here is client!', 'utf8');
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

           
<h3 id='3.4'>3.4 ab性能测试工具</h3>  
        
#### 1) ab
> - 属于Mac apache的工具
> - -n后面的是请求数
> - -c后面的是并发数
                
                LvHongbins-Mac-2:~ lvhongbin$ ab -n 4 -c 2 https://www.baidu.com/
                This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
                Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
                Licensed to The Apache Software Foundation, http://www.apache.org/

                Benchmarking www.baidu.com (be patient).....done


                Server Software:        BWS/1.1
                Server Hostname:        www.baidu.com
                Server Port:            443
                SSL/TLS Protocol:       TLSv1.2,ECDHE-RSA-AES128-GCM-SHA256,2048,128
                TLS Server Name:        www.baidu.com

                Document Path:          /
                Document Length:        227 bytes

                Concurrency Level:      2
                Time taken for tests:   1.202 seconds
                Complete requests:      4
                Failed requests:        0
                Total transferred:      3488 bytes
                HTML transferred:       908 bytes
                Requests per second:    3.33 [#/sec] (mean)
                Time per request:       601.053 [ms] (mean)
                Time per request:       300.527 [ms] (mean, across all concurrent requests)
                Transfer rate:          2.83 [Kbytes/sec] received

                Connection Times (ms)
                              min  mean[+/-sd] median   max
                Connect:      137  281 151.7    389     434
                Processing:    36   90  59.1    136     146
                Waiting:       36   90  59.2    136     146
                Total:        207  371 160.2    425     570

                Percentage of the requests served within a certain time (ms)
                  50%    425
                  66%    425
                  75%    570
                  80%    570
                  90%    570
                  95%    570
                  98%    570
                  99%    570
                 100%    570 (longest request)

          
------      
        
<h2 id='4'>四、构建Web应用</h2>
<h3 id='4.1'>4.1 简介</h3>  
        
#### 1) 需求
> - 请求方法的判断
> - URL的路径解析
> - URL中查询字符串的解析
> - Cookies大的解析
> - Basic的认证
> - 表单数据的解析
> - 任意格式文件的上传处理
#### 2) 框架 = 创建服务器 + 回调函数
> - 创建服务器
                
                http.createServer(callback).listen(8124);
> - 回调函数
                    
                const callback = function(req, res) {
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.end();
                }

                //或者使用express 或者 connect
                const callback = express();

                const callback = connect();

<h3 id='4.2'>4.2 请求方法与路径解析</h3>  
        
#### 1) 请求方法
> - GET 查看一个资源 C
> - R
> - POST 更新一个资源 U
> - PUT 新建一个资源 U
> - DELETE 删除一个资源 D
                
                function(req, res) {
                    switch req.method {
                        case "POST":
                            update(req, res);
                            break;
                        case "DELETE":
                            delete(req, res);
                            break;
                        case "PUT":
                            create(req, res);
                            break;
                        case "GRT":
                        default:
                            get(req, res);
                    }    
                }
#### 2) 路径解析
> - 使用url包
> - 使用url.parse(req.url, true)获得URL对象
        
<h3 id='4.3'>4.3 URL中查询字符串的解析与Cookies大的解析</h3>  
        
#### 1) URL中查询字符串的解析
> - 首先获得url对象
> - 然后获得query对象
                
                const url = require('url');
                const querystring = require('querystring');
                
                const query = querystring.parse(url.parse(req.url).query);

                // 或者直接放进URL对象
                const query = url.parse(req.url, true).query;

#### 2) Cookies的解析
> - 形式：key1=value1;key2=value2
> - 设置：response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
> - 自制解析函数 parseCookie()
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
> - 性能影响
>> - 减少Cookie的大小 一旦设置的Cookie过多，就会导致报头过大，而且大多数的cookie并不需要每次都用上，因此会造成带宽上的浪费
>> - 为静态组件使用不同的域名，因为域名不同，就不会每次都用上相同的cookie。但是这样会牺牲DNS查询的性能和时间，好在现代的浏览器会进行DNS缓存，把这个冲突的副作用降到最低。
        
<h3 id='4.4'>4.4 session与缓存</h3>  
        
#### 1) session
> - 由于cookie在客户端（document.cookie）和服务器端都能够被修改，所以很容易被一些坏人利用，敏感的数据都不大好放在Cookies上
> - 而session只存放在服务器端，可避免被客户端修改
#### 2) 客户端与服务器端session的对应方式
> - 基于Cookie来实现用户和数据的映射  cookie携带Session的口令session_id
> - 通过查询字符串来实现浏览器端和服务器端数据的对应

          
------      
        
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
        
#### 1) url
> - 
              
<h3 id='5.4'>5.4 fs</h3>  
        
#### 1) url
> - 
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
## [二、网络编程](#2)
### [2.1 简介](#2.1)
### [2.2 构建TCP服务器](#2.2)   
### [2.3 构建HTTP服务](#2.3)
  
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
        
        
<h2 id='2'> 二、网络编程</h2>
<h3 id='2.1'>2.1 简介</h3>  
        
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
    
<h3 id='2.2'>2.2 构建TCP服务器</h3>  
        
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
>>>>>> ![图2-1 telnet与tcp连接]()
        
    
<h3 id='2.3'>2.3 构建HTTP服务</h3>  
        
#### 1) 网络服务器 http模块
> - TCP和UDP都属于网络传输层协议，如果要构建高效的网络应用，就应该从应用层着手
> - 在Node中，HTTP服务继承自TCP服务器，他能够与多个客户端保持连接，由于采用事件驱动的方式，并不为每一个连接创建额外的线程或者进程，保持着很低的内存占用，并能实现高并发。
> - TCP服务以connect为单位进行服务，而HTTP服务则以request为单位进行服务
> - http模块即是将connection到request的过程进行了封装
> - socket.write() -> ServerRequest对象
> - socket.on('data',callback) -> ServerResponse对象
> - HTTP请求对象和HTTP响应对象是相对较底层的封装，现在的Connect和Express都是在这两个对象的基础上进行高层封装完成的
#### 2) http模块的请求
> - 
> - 
> - 
> - 
> - 
> - 
> - 
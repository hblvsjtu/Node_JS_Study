# Node_JS_Study

## 四、构建Web应用
        
------        
        
### 作者：冰红茶  
### 参考书籍：《深入浅出node.js》 朴灵  
### 参考源：[Node：https://nodejs.org/en/](https://nodejs.org/en/)
### 参考源：[Node API文档：https://nodejs.org/dist/latest-v10.x/docs/api/](https://nodejs.org/dist/latest-v10.x/docs/api/)

            
------    
            
        

   本来我是想看完ES6之后就去看React全栈技术的，发现很多东西需要Node.JS的支持，所以我还是调转方向，先去搞朴灵老师的《深入浅出node.js》，后面再去搞React。后来发现node前面几章实在有点难度，遂先去搞React和MERN全栈了。再看Node的时候，才发现正确的打开方式应该是从书的最后几章看起，一直往前看。朴灵老师的这本著作得到阿里CNode社区创始人空无的背书，质量应该不错^_ ^
  
## 目录

## [四、构建Web应用](#4)
### [4.1 简介](#4.1)
### [4.2 请求方法与路径解析](#4.2)   
### [4.3 URL中查询字符串的解析与Cookies解析](#4.3)
### [4.4 YSlow与缓存](#4.4)
### [4.5 Basic认证](#4.5)
### [4.6 数据上传](#4.6)
        
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
        
<h3 id='4.4'>4.4 YSlow与缓存</h3>  
        
#### 1) session
> - 由于cookie在客户端（document.cookie）和服务器端都能够被修改，所以很容易被一些坏人利用，敏感的数据都不大好放在Cookies上
> - 而session只存放在服务器端，可避免被客户端修改
#### 2) 客户端与服务器端session的对应方式
> - 基于Cookie来实现用户和数据的映射  cookie携带Session的口令session_id
> - 通过查询字符串来实现浏览器端和服务器端数据的对应
#### 3) YSlow
> - 什么是YSlow？YSlow [1]  是Yahoo发布的一款基于FireFox的插件，这个插件可以分析网站的页面，并告诉你为了提高网站性能，如何基于某些规则而进行优化。 [--百度百科](https://baike.baidu.com/item/YSLOW/10384699?fr=aladdin)
> - Yslow-23条规则中比较重要的几条：
>> - 减少HTTP请求次数 合并图片、CSS、JS，改进首次访问用户等待时间
>> - 使用CDN  就近缓存==>智能路由==>负载均衡==>WSA全站动态加速(什么是CDN？ content delivery network 内容分发网络。CDN的基本原理是广泛采用各种缓存服务器，将这些缓存服务器分布到用户访问相对集中的地区或网络中，在用户访问网站时，利用全局负载技术将用户的访问指向距离最近的工作正常的缓存服务器上，由缓存服务器直接响应用户请求。[--百度百科](https://baike.baidu.com/item/CDN/420951?fr=aladdin))
>> - 避免空的src和href 当link标签的href属性为空、script标签的src属性为空的时候，浏览器渲染的时候会把当前页面的URL作为它们的属性值，从而把页面的内容加载进来作为它们的值
>> - 为文件头指定Expires 使内容具有缓存性。避免了接下来的页面访问中不必要的HTTP请求
>> - 使用gzip压缩内容 压缩任何一个文本类型的响应，包括XML和JSON
>> - 把CSS放到顶部
>> - 把JS放到底部
>> - 避免使用CSS表达式
>> - 将CSS和JS放到外部文件中。目的是缓存，但有时候为了减少请求，也会直接写到页面里，需根据PV和IP的比例权衡。
>> - 精简CSS和JS
>> - 避免跳转
>> - 删除重复的JS和CSS
>> - 配置ETags
>> - 可缓存的AJAX
>> - 使用GET来完成AJAX请求
>> - 减少DOM元素数量
>> - 避免404
>> - 减少Cookie的大小
>> - 使用无cookie的域
>> - 不要使用滤镜
>> - 不要在HTML中缩放图片
>> - 缩小favicon.ico并缓存
#### 4) ETags
> - 询问有没有缓存可以使用两种方法：时间戳和ETags
> - fs.stat.mtime.toUTCString和时间戳 然后设置请求If-Modified-Since和Last-Modified
> - 但是使用时间戳有两个缺点：
>> - 内容没改但是时间戳改了
>> - 时间戳只能精确到秒，更新频繁的内容无法生效
> - ETags 全称Entity Tag 由服务器端生成的，服务器端的可以决定他的生成规则。而且不使用时间戳 if-modified-since组合，而使用文件散列值 If-None-Match ETags组合
#### 5) Expires和Cache-Control
> - 其实Expires功能是可以的，但是一旦出现服务端和客户端的时间不同步的时候，就会失效
> - 所以最好还是用Cache-Control，设置最大时间，max-age
> - 如果在Cache-Control响应头设置了 "max-age" 或者 "s-max-age" 指令，那么 Expires 头会被忽略。
#### 6) 清除缓存的方法
> - 每次发布，路径中跟随Web应用的版本号；http\://url/?version=v=1234
> - 每次发布，路径中跟随该文件内容的hash值：http\://url/?hash=1234
#### 7) 例子
> - cacheserver.js
                
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


                // 服务端示例
                // 对每一个请求运行 gzip 操作的成本是十分高昂的.
                // 缓存压缩缓冲区是更加高效的方式.
                const server = http.createServer((req, res) => {
                    // res.write("welcome to my home!");

                    // 获取所有请求头信息
                    console.log(`Printing Header ...`);
                    for (let prop in req.headers) {
                        console.log(`${prop} = ${req.headers[prop]}`);
                    }

                    // 获取文件流对象
                    const raw = fs.createReadStream('./index.html');
                    // 允许接收的编码类型
                    let encoding = req.headers['accept-encoding']; //这里要全小写
                    if (!encoding) {
                        encoding = '';
                    }

                    // 获取请求头中的修改时间
                    let ifModifiedSince = req.headers['if-modified-since']; //这里要全小写

                    if (!ifModifiedSince) {
                        ifModifiedSince = '';
                    }

                    // 获取请求头中的if-none-match
                    let ifNoneMatch = req.headers['if-none-match']; //这里要全小写

                    const gzip = zlib.createGzip();
                    const deflate = zlib.createDeflate();

                    // 利用时间戳和if-modified-since判断是否需要缓存
                    // 判断文件的修改时间决定是否发送

                    // fs.stat('./index.html', (err, stat) => {
                    //  // 获取文件最近一次的修改时间
                    //  let lastModified = stat.mtime.toUTCString();
                    //  console.log(`lastModified = ${lastModified}`);
                    //  if (lastModified == ifModifiedSince) {

                    //      // 没有过期
                    //      res.writeHead(304, 'Not Modified');
                    //  } else {

                    //      // 已经过期
                    //      res.setHeader('Last-Modified', lastModified);
                    //      if (/\bdeflate\b/.test(encoding)) {
                    //          res.writeHead(200, {
                    //              'Content-Encoding': 'deflate'
                    //          });
                    //          raw.pipe(deflate).pipe(res);
                    //      } else if (/\bgzip\b/.test(encoding)) {
                    //          res.writeHead(200, {
                    //              'Content-Encoding': 'gzip'
                    //          });
                    //          raw.pipe(gzip).pipe(res);
                    //      } else {
                    //          res.writeHead(200, {});
                    //          raw.pipe(res);
                    //      }
                    //  }
                    // });

                    // 利用ETag和hash值判断是否需要缓存
                    fs.readFile('./index.html', (err, fd) => {

                        // 获取文件的hash值
                        const hash = crypto.createHash('sha256');
                        hash.update(fd);
                        const hashsum = hash.digest('hex');
                        console.log(`hash = ${hashsum}`);
                        if (hashsum == ifNoneMatch) {

                            // 没有过期
                            console.log('没有过期');
                            res.writeHead(304, 'Not Modified');
                        } else {

                            // 已经过期
                            console.log('已经过期');
                            const expires = new Date();
                            expires.setTime(expires.getTime + 10 * 1000); //10秒
                            res.setHeader('Expires', expires.toUTCString());
                            res.setHeader('Cache-Control', 'max-age=' + 10 * 1000); //10秒
                            res.setHeader('ETag', hashsum);
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
                        }
                    })


                    res.setTimeout(1000);
                    res.on('timeout', () => {
                        console.log('oh no, timeout!');
                        res.end();
                    });

                });

                server.listen(8124, () => {
                    console.log('i am listening!');
                });
> - cacheclient.js
                
                /**
                 * 
                 * @authors Lv Hongbin (hblvsjtu@163.com)
                 * @date    2018-06-21 11:02:19
                 * @version 1.0.0
                 * @description test for stream on the client
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

        
<h3 id='4.5'>4.5 Basic认证</h3>  
        
#### 1) 简介
> - Basic是当客户端和服务器端进行请求的时候，允许通过用户名和密码实现的一种身份认证方式
> - 需要再请求报文头中添加Authorization字段的内容
> - Authorization字段 =username:passward【空格】encode 
> - 所以需要使用split(' ')方法先分割出username:passward
> - 然后再使用split(':')方法分割出username和passward
#### 2) 缺点
> - 虽然进过base64的加密，但是还是接近明文的传输，一般只有https协议才会使用，比较鸡肋
        
<h3 id='4.6'>4.6 数据上传</h3>  
        
#### 1) 数据下载
> - 服务器端下载
                
                var chunks = [];
                req.on('data', function(chunk) {
                    chunks.push(chunk);
                });

                req.on('end', function() {
                    const buf = Buffer.concat(chunks);
                    console.log(buf.toString());
                    console.log(`the text size = ${Buffer.byteLength(buf)} Byte`);
                })
> - 客户端被下载 
                
                var chunks = [];
                res.on('data', function(chunk) {
                    chunks.push(chunk);
                });

                res.on('end', function() {
                    const buf = Buffer.concat(chunks);
                    console.log(buf.toString());
                    console.log(`the text size = ${Buffer.byteLength(buf)} Byte`);
                })
#### 2) 数据上传
> - 服务器端上传
                
                res.write();
> - 客户端被上传
                
                req.write();
#### 3) 表单数据
> - Content-Type = "application/x-www-form-urlencoded"
#### 4) 其他格式数据
> - JSON Content-Type = "application/json; charset=utf-8"
> - XML Content-Type = "application/xml" 同时 var xml2js = require('xml2js');
#### 5) 附件上传
> - 需要指定form标签的enctype属性为"multipart/form-data"
#### 6) 数据上传的安全问题
> - 最大的问题是数据过大，为了避免这种情况，有两种解决的思路
> - 限制上传的内容大小，一旦超过限制，就停止接收数据，并响应413状态码 利用Content-Length
                    
                let length = req.headers['Content-Length']?parseInt(req.headers['Content-Length'], 10): null;
                if(length && length > targetLength) {
                    res.writeHead(413);
                    res.end();
                }    
> - 通过流式解析，将数据流导入到磁盘中，Node只保留文件路径等小数据
                let chunks =[];
                let length;
                req.on('data', (chunk) => {
                    length += chunk.length;
                    if(length > targetLength) {

                        // 停止接收数据，并触发end();
                        req.destroy();
                    }else {
                        
                        // 其他操作
                    }
                })
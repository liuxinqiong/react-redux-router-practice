系统架构
* 页面文件结构
  * 组件放在Component文件夹下
  * 页面（业务组件）放在Container文件夹下
  * 页面入口处获取用户信息，决定跳转到哪个页面
* web开发模式
  * 基于cookie用户认证 
    * npm install cookie-parser --save
    * cookie类似于一张身份证，登录后服务端返回，你带着cookie就可以访问受限的资源
    * cookie的管理浏览器自动处理
    * npm install body-parser --save
* 前后端实现

加密
* npm install utility --save
* 加盐

注意ES6箭头函数
* 简写return：如果只有一行语句，省略return和{}，直接写表达式即可
* 如果返回的就要{}对象呢，那么需要使用()包裹{}

属性验证库 PropTypes 
* 15以及15以前是内置在react中的，16被抽离了出来
* npm install prop-types --save
* 具体类型有
  * PropTypes.array
  * PropTypes.bool
  * PropTypes.func
  * PropTypes.number
  * PropTypes.object
  * PropTypes.string
  * PropTypes.symbol
* 追加isRequired声明他是必传的

操作cookies
* npm install browser-cookies --save

高阶组件
* 用来添加和增强功能
* 可以使用装饰器模式@简写
* 两种功能的高阶组件
  * 属性代理：添加额外属性和元素
  * 反向继承：不继承React.Component，而是继承当前组件，添加新函数，或者新生命周期，如果父组件同时存在对应生命周期，则均会执行
* 目的
  * 代码复用
  * 逻辑抽象
  * 反向继承


Socket.io 是什么
* 基于事件的实时双向通信库
* 基于websocket协议

Socket.io(websocket) 与 ajax 区别
* ajax基于http协议，单向，实时获取数据只能轮询
* socket.io 基于websocket双向通信协议，后端可以主动推送数据
* 现代浏览器均支持websocket
* npm install socket.io socket.io-client --save

Socket.io 后端API
* io = require('socket.io')(http)
* io.on
* io.emit

Socket.io 前端API
* import io from 'socket.io-client'
* io.on
* io.emit

forEach map reducer 区别 
* https://www.zhihu.com/question/24927450

1. eslint
2. react16特有的错误处理机制
3. react性能优化
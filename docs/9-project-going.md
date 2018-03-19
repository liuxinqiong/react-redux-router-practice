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


# Socket.io 是什么
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

1. eslint
2. react16特有的错误处理机制
3. react性能优化

# React进阶
* React原理
  * 虚拟DOM
    * beforeTree和afterTree平级对比，而不是递归对比
    * 避免跨DOM层级去操作数据，这样虚拟DOM无法优化
    * 如何做diff，打patch，updateChildren，需深入
  * 组件初始化：constuctor-》componentWillMount-》render-》componentDidMount
  * 生命周期，shouldComponentUpdate(nextProps,nextState)（可优化处，达到最少渲染次数）
  * 组件更新三种策略
    * setState（异步队列更新）：依次调用shouldComponentUpdate-》componentWillUpdate-》render-》componentDidUpdate
    * 父组件renders：componentWillReceiveProps-》shouldComponentUpdate-》componentWillUpdate-》render-》componentDidUpdate
    * forceUpdate：用的较少，不会调用shouldComponentUpdate
* Redux原理（基本API，React-Redux API）
* React + Redux 常见性能优化
  * React本身（组件内部，组件外部）
  * SSR
  * 路由懒加载
  * Redux state到组件显示数据转换，有性能优化空间
* 实现自己thunk

源码分析
```js
React.createElement = function(type,config,children){
  var propName;
  var props={};
  var key=null;
  var ref=null;
  var source=null;
  // ......
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props
  )
}

var ReactElement = function(type,key,ref,self,source,owner,props){
  var element = {
    // this tag allow us to uniquely identify this as a React Element
    $$typeof:REACT_ELEMENT_TYPE,

    // built-in properties that belong on the element
    type:type,
    key:key,
    ref:ref,
    props:props,

    // record the component responsible for creating this element
    _owner:owner
  }
}
```

数组的迭代方法：
* forEach：让数组中的每一项做一件事情
* map：让数组通过某种计算产生一个新的数组
* filter：筛选出数组中符合条件的项，组成新数组
* reduce：让数组的前项和后项做某种计算，并累计最终值
  * 相对比较复杂：正确的语法为 arr.reduce(callback[, initialValue])，callback可以有四个参数，initialValue用作第一个调用 callback的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
  * accumulator：累加器累加回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue
  * currentValue：数组中正在处理的元素。
  * currentIndex：可选，数组中正在处理的当前元素的索引。 如果提供了initialValue，则索引号为0开始，否则为索引为1开始。
  * array：可选，调用reduce的数组
* every：检测数组中每一项是否符合条件，
* some：检测数组中是否有某些符合条件

>  map 和 filter 都是 immutable methods，也就是说它们只会返回一个新数组，而不会改变原来的那个数组

compose 函数组合，用在中间件概念里十分合适
```js
function compose(...funcs){
	if(funcs.length === 0 ){
		return arg => arg
	}
	if(funcs.length === 1){
		return funcs[0];
	}
	return funcs.reduce((ret,item)=> (...args) => ret(item(...args)))
}

// 仅支持打印原本数据
function originFun(target){
	console.log(target);
	return target;
}

// 我们增强它，如果是数组，大声说出来
function middlewareArray(origin){
	return function(next){
		return function(target){
			console.log('middlewareArray',origin,next);
			if(Array.isArray(target)){
				console.log('I am a Array');
				return origin(target);
			}
			return next(target);
		}
	}
}

// 我们增强它，如果是数字，大声说出来
function middlewareNumber(origin){
	return function(next){
		return function(target){
			console.log('middlewareNumber',origin,next);
			if(typeof target === 'number'){
				console.log('I am a Number');
				return next(target);
			}
			return next(target);
		}
	}
}

// origin表示最原始的，next一开始也是原始的，然后就是被处理过的啦
var newOrigin = compose(middlewareNumber(originFun),middlewareArray(originFun))(originFun);
newOrigin(123);
```

React Context API
* 严格类型要求，否则无法获取数据
* 通过将 childContextTypes 和 getChildContext 添加到父组件(context 提供者)，React 自动地向下传递信息，并且子树中的任何组件都可以通过定义 contextTypes 去访问它。如果 contextTypes 没有定义， context 将是一个空对象。
* propTypes：定义组件内部属性的数据格式要求

如果 contextTypes 在组件中定义，下列的生命周期方法将接受一个额外的参数， context 对象：
* constructor(props, context)
* componentWillReceiveProps(nextProps, nextContext)
* shouldComponentUpdate(nextProps, nextState, nextContext)
* componentWillUpdate(nextProps, nextState, nextContext)
* componentDidUpdate(prevProps, prevState, prevContext)

> 从 React 16 开始， componentDidUpdate 不再接收 prevContext 。

在无状态的函数式组件中引用 Context

无状态的函数式组件也可以引用 context , 如果 contextTypes 作为函数的属性被定义。

```js
const PropTypes = require('prop-types');

const Button = ({children}, context) =>
  <button style={{'{{'}}background: context.color}}>
    {children}
  </button>;

Button.contextTypes = {color: PropTypes.string};
```

React 性能优化
* React 组件(间)性能优化
  * 属性传递优化
  * 多组件间优化
  * key
* Redux 性能优化
* React 同构，首屏服务端渲染

纯函数的特点；稳定输入，稳定输出，因此可以做缓存

React 如何做性能检测
* 路径添加 ?react_perf
* 使用chrome自带的performance
* 点击record开启，做出我们想要检测的操作之后，点击stop
* 主要查看User Timing

React 15以后，新增PureComponent，帮你解决了手写shouldComponentUpdate的烦恼。
* 此时性能检测：直接没有渲染，比我们定制的更棒
* 如果你的组件只是根据你传进来的值进行渲染，并没有内部的状态，可以直接继承PureComponent即可

immutablejs存在的意义和使用
* 递归对比，复杂度太高，不可接受
* React妥协，只做浅对比，这也是为什么我们在做redux和state的时候，建议不要那么深层次嵌套
* facebook官方库，在JS里引出一个不可变的数据结构
  * 数据结构一旦创立不能修改，只能生成新的数据结构
  * 我们直接用等号就可以判断两个数据结构是不是相等，这对shouldComponentUpdate而言，简直就是利器
  
* npm install immutable --save
* Map 
* 优点：
  * 节省内存，数据不需要修改
  * 并发安全
  * 降低了可变带来的复杂度，共享可变状态是万恶之源
  * 便于比较复杂数据，定制shouldComponentUpdate方便
  * 时间旅行功能
  * 拥抱函数式编程，纯函数
* 缺点
  * 学习成本
  * 库的大小（seamless-immutable）
  * 对现有项目入侵太严重
    * 新项目使用，老项目值得好好评估

reselect库优化redux
* npm install reselect --save
* 函数记忆，减少重计算

key 属性的重要性
* 删除、新增、移动
* 如何确定是同一个元素呢，就是通过key
* 使用数组的index，除了取消warning，没有其他作用，因为index是变化的

服务端渲染SSR
* server side render
* 传统服务端渲染，JSP、smaty、jinja2
  * 前后端一体
  * 后端模板+数据=》html给浏览器
  * 首屏块，每次获取数据都会刷新页面
* 浏览器渲染，ajax获取数据，前端拼接页面
  * 后端仅提供静态资源和接口
  * 前端写模板，渲染，MVVM大行其道
  * 异步获取数据，无刷新
  * 单页应用，页面跳转也不刷新，体验好
  * 首屏较慢，没办法做SEO，对搜索引擎不友好
  * jQuery 时代 underscore
* 前后同构，首屏服务端渲染
  * node在服务端解析首屏模板
  * 页面渲染逻辑就不需要了，只需要做注水操作（事件响应等）
  * React支持SSR

React同构API
* RenderToString 和 RenderToStaticMarkUp
* React16 新出的 RenderToNodeStream，性能更好
  * RenderToString 解析为字符串
  * RenderToNodeStream 解析为可读的字节流对象
  * 官方说速度会快3倍左右
* React16 里，客户端 ReactDom.hydrate 取代 ReactDom.render

项目SSR具体步骤
* node使用babel-node配置node里的react环境
* 修改客户端代码，抽离App组件，前后端共享
* 服务端生成DOM结构，渲染，加载build后的css和js
  * npm install css-modules-require-hook --save
  * npm install asset-require-hook --save
* node使用babel-node支持jsx
* npm install babel-cli --save
* SEO，加快首屏加载
* 更多
  * [教你如何搭建一个超完美的服务端渲染开发环境](http://blog.csdn.net/wulixiaoxiao1/article/details/57085751)
  * [彻底理解React 之React SSR、React服务端渲染，教你从零搭建配置](https://www.jianshu.com/p/47c8e364d0bc)

eslint
* package.json中默认继承react-app，这是create-react-app默认的配置
* 保证团队代码风格的统一
* 自定义配置
```js
"eslintConfig": {
  "extends": "react-app",
  "rules":{
    "eqeqeq":["off"]
  }
}
```

async+await优化异步代码
* 发展
  * 回调函数，已出现回调地狱，造成不可读，不可调试
  * Promise
  * generator
  * async+await是generator的优化，ES7的内容
* await必须在async内部

React动画解决方案
* CSS动画
  * 官方解决方案：ReactCSSTransitionGroup
* JS动画
* Ant Motion
  * 进出场动画：npm install rc-queue-anim --save

打包编译
* npm run build 
* 编译打包后，生成build目录
* express中间件，拦截路由，手动渲染index.html
* build设置为静态资源地址

React16新特性
* 新的核心算法Fiber
* Render可以数组，字符串
* 错误处理机制：componentDidCatch
* Portals组件
* 更好更快的服务端渲染
* 体积更小，MIT协议

npm scripts
* 有没有觉得奇怪，为什么命令中，可以直接npm start，其余命令却需要使用npm run xxx呢
* 四个常用的 npm 脚本有简写形式
  * npm start是npm run start
  * npm stop是npm run stop的简写
  * npm test是npm run test的简写
  * npm restart是npm run stop && npm run restart && npm run start的简写
* 更多[npm scripts 使用指南](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)
  

组件内引用图片资源
1. 直接import
2. 使用require：webpack 就会识别到，打包上线的时候就会修正路径
3. 图片会经过webpack处理

> 引入asset-require-hook来识别图片资源时候，默认对小于8K的图片转换成base64字符串，大于8k的图片转换成路径引用

使用 create-react-app 脚手架
1. npm start 之后处于开发模式，主要应用src代码
2. npm run build之后，src文件夹其实就可以脱离出来了

Bug List
* SSR之后牛人图片出现问题
  * assethook：添加limit: 8000属性
* build之后icon空缺问题
  * 服务端需要额外配置
  * npm install serve-favicon --save
* SSR server文件引用src下资源，是否合适
* Webpack 是如何处理图片的
* ~~getMsgList接口存在异步问题，同时可以使用连表查询进行优化~~
* ~~初始为空，建立多个socket问题~~
* ~~退出登录开始注册，无法跳转注册页面~~

Better List
* 连表查询
* 消息仅推送给相关人，而不是广播

setState更新可能是异步的
* 你不能依赖this.state 和 this.props的值计算下一个state
* 解决这个问题，使用setState的函数形式，该函数接收前一个状态作为第一个参数，应用更新时props作为第二个参数

线上发布：
* 使用git部署到服务器npm install一直报错killed导致无法完成
  * 有可能是内存太小的问题，设置[swap交换分区](http://man.linuxde.net/mkswap)，但我并没有解决
    * [阿里云服务器Linux环境下执行npm install和webpack打包导致killed问题解决](https://www.imooc.com/article/19208)
  * 切换到cnpm install，问题解决
* 路径问题，mongodb路径和websocket服务路径
  * 设置[mongo用户访问权限](http://www.jb51.net/article/104249.htm)相关时，导致我博客挂了，找不到原因，奇怪的事，我重启一下服务就好了，好像是因为中途数据库断开连接的问题
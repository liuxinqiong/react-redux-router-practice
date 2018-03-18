React-router4
* 官方推荐路由库，4是最新版本，和之前版本不兼容，浏览器和RN均兼容
* 开发单页应用必备，践行路由即组件的概念
* 核心概念：动态路由，router，link，switch
* npm install react-router-dom --save
* Router4使用react-router-dom作为浏览器前端的路由
* 忘记router2的内容，拥抱最新router4吧

入门组件
* BrowerRouter 包裹整个应用
* Router路由对应渲染的组件，可嵌套
* Link跳转专用

其他组件
* url参数，Route组件参数可用冒号标识参数，路由组件给自己的组件添加了很多属性，打印props可以看到，eg：this.props.match.params.paramname读取值
* this.props.match
  * url是实际的路由
  * path是我们定义的路由，有可能有变量
* Redirect组件跳转
* Switch只渲染命中的第一个子Route组件

route + redux
* 复杂redux应用，多个reducer，用combineReducers合并

总结:
* react-router不同于angular路由，在DOM结构上，只要不是当前页面显示的内容，在DOM中直接被移除，不存在缓存的概念
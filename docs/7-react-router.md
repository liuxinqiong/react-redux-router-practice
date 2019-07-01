React-router4
* 官方推荐路由库，4 是最新版本，和之前版本不兼容，浏览器和 RN 均兼容
* 开发单页应用必备，践行路由即组件的概念
* 核心概念：动态路由，router，link，switch
* npm install react-router-dom --save
* Router4 使用 react-router-dom 作为浏览器前端的路由
* 忘记 router2 的内容，拥抱最新 router4 吧

入门组件
* BrowserRouter 包裹整个应用
* Router 路由对应渲染的组件，可嵌套
* Link 跳转专用

其他组件
* url 参数，Route 组件参数可用冒号标识参数，路由组件给自己的组件添加了很多属性，打印 props 可以看到，eg：this.props.match.params.paramName 读取值
* this.props.match
  * url是实际的路由
  * path是我们定义的路由，有可能有变量
* Redirect 组件跳转
* Switch 只渲染命中的第一个子 Route 组件

route + redux
* 复杂 redux 应用，多个 reducer，用 combineReducers 合并

总结:
* react-router 不同于 angular 路由，在DOM结构上，只要不是当前页面显示的内容，在 DOM 中直接被移除，不存在缓存的概念
Redux是什么
* 专注与状态管理的库，和react解耦，在 angular 和 vue 中同样可以使用
* 单一状态，单向数据流

Redux核心概念
* store
* state
* action
* reducer

独立团例子
* 人少的时候，无论兵器还是人员的变更都是setState
* 发展为千人大团之后，决定军事生活分开
* 所有状态归赵政委管(redux)，自己只大战(view显示)

赵政委的能力
* 有一个保险箱(store)，所有人的状态在那里都有记录(state)
* 需要改变的时候，需要告诉专员(dispatch)要干什么(action)
* 处理变化的人(reducer)拿到 state 和 action，生成新的 state

正确的使用方式
* 首先通过 reducer 新建 store，随时通过 store.getState 获取状态
* 需要状态变更，store.dispatch(action) 来修改状态
* reducer 函数接受 state 和 action，返回新的state，可以用 store.subscribe 监听每次修改

Redux 如何和 React 一起使用
* 手动连接（比较痛苦）
  * 把 store.dispatch 方法传递给组件，内部可以调用修改状态
  * subscribe 订阅 render 函数，每次修改都会重新渲染
  * redux 相关内容，移到单独文件 index.redux.js 单独管理
* 处理异步、调试工具、更优雅的和 react 结合
  * redux处理异步，需要 redux-thunk 插件
    * npm install redux-thunk --save
    * 使用 applyMiddleware 开启 thunk 中间件
    * action 可以返回函数，使用 dispatch 提交 action
  * 调试工具
    * chrome 扩展 Redux DevTools
    * 新建 store 的时候判断 window.devToolsExtension
    * 使用 compose 结合 thunk 和 window.devToolsExtension
    * 调试窗 redux 选项卡，实时看到 state
  * npm install redux-devtools-extension 并且开启
  * 使用 react-redux 优雅的链接 react 和 redux
    * npm install react-redux --save
    * 忘记subscribe，记住reducer、action、dispatch即可，也不需要从属性开始传递
    * react-redux 提供 provider 和 connect 两个接口链接

react-redux具体使用
* provider 组件在应用最外层，传入 store 即可，只用一次
* Connect 负责从外部获取组件需要的参数
* Connect 可以用装饰器的方式来写
  * 本质是一个高阶组件
  * 自定义配置 npm run eject
  * npm install babel-plugin-transform-decorators-legacy --save 支持注解
  * package.json 里 babel 加上 plugins 配置

redux 后续
* 什么数据应该放在 react 里
* redux 管理 ajax
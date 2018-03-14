Redux是什么
* 专注与状态管理的库，和react解耦，在angular和vue中同样可以使用
* 单一状态，单项数据流

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
* 处理变化的人(reducer)拿到state和action，生成新的state

正确的使用方式
* 首先通过reducer新建store，随时通过store.getState获取状态
* 需要状态变更，store.dispatch(action)来修改状态
* reducer函数接受state和action，返回新的state，可以用store.subscribe监听每次修改

Redux如何和React一起使用
* 手动连接（比较痛苦）
  * 把store.dispatch方法传递给组件，内部可以调用修改状态
  * subscribe订阅render函数，每次修改都会重新渲染
  * redux相关内容，移到单独文件index.redux.js单独管理
* 处理异步、调试工具、更优雅的和react结合
  * redux处理异步，需要redux-thunk插件
    * npm install redux-thunk --save
    * 使用applyMiddleware开启thunk中间件
    * action可以返回函数，使用dispatch提交action
  * 调试工具
    * chrome扩展Redux DevTools
    * 新建store的时候判断window.devToolsExtension
    * 使用compose结合thunk和window.devToolsExtension
    * 调试窗redux选项卡，实时看到state
  * npm install redux-devtools-extension 并且开启
  * 使用react-redux优雅的链接react和redux
    * npm install react-redux --save
    * 忘记subscribe，记住reducer、action、dispatch即可，也不需要从属性开始传递
    * react-redux提供provider和connect两个接口链接

react-redux具体使用
* provider组件在应用最外层，传入store即可，只用一次
* Connect负责从外部获取组件需要的参数
* Connect可以用装饰器的方式来写
  * 本质是一个高阶组件
  * 自定义配置 npm run eject
  * npm install babel-plugin-transform-decorators-legacy --save-dev
  * package.json里babel加上plugins配置

redux后续
* 什么数据应该放在react里
* redux管理ajax
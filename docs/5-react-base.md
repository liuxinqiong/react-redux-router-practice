React是什么
* 专注 View 层
* 一切皆组件
* ES6 语法，最新版本16

基础语法
* import React
* class 语法新建组件，render 里面直接使用
* render 函数返回值就是 JSX 语法，会把 JSX 转成 JS 执行，实际执行的 React.createElement

JSX基础语法
* JS 直接写 HTML
* class 写成 className
* 变量用 {} 包裹
* 组件只能返回一个根标签，很多时候 return 需要添加 `()`，是因为针对结构复杂的组件时，为了代码结构清晰，需要显示层级结构，此时将HTML 使用括号包裹，return 语句紧跟括号，如果 return 后为空，则会报错。基本原则：多行使用括号。

默认版本还是版本 15，手动更新为 16，PS：目前已经是 16，无需添加 next
* React16 是第一个核心代码重写的版本，整体 API 变化不大
* 主要变更了错误处理、生命周期、打包，对开发影响不是特别大
* npm install --save react@next react-dom@next

组件之间传递数据
* 使用 props
* 内部使用 this.props 获取
* 无状态组件

组件内部state
* JSX 本质就是 js，所以我们可以直接使用 js 的能力
* constructor 设置初始状态，记得执行 super(props)
* state 就是一个不可变对象，使用 this.state 获取

插个题外话：到这里开发让我有点不爽了，主要有两点：
1. 格式化问题
  * vscode shift+option+f(mac)
  * editor.formatOnSave 为 true 启用保存格式化
2. JSX标签自动补齐
  * emmet.triggerExpansionOnTab 为 true
  * 有时候会失效，继续设置"emmet.includeLanguages": {"javascript": "javascriptreact"}
3. 启用ESLint校验
  * 安装ESLint插件
  * 修改配置 eslint.autoFixOnSave 为 ture

react事件
* JSX里，onClick={this.函数名}
* this引用的问题，需要在构造函数中 bind 绑定 this 或箭头函数
* this.setState 修改 state，记得，返回新的 state 而不是修改值

react生命周期
* 初始化周期
* 重新渲染生命周期
* 组件卸载生命周期

react官方推荐插件（chrome扩展）：React Developer Tools

antd-mobile 的使用
* 蚂蚁金服UI组件库，专门针对React
* npm install antd-mobile@next --save
* 兼容 Web 和 ReactNative
* 按需加载
  * 需要babel-plugin-import的支持
  * 在package.json 中 babel 中添加
  ```
    "plugins":[
      ["import",{"libraryName":"antd-mobile","style":"css"}]
    ]
  ```
* 常用组件
  * Layout 布局组件
  * 表单组件，数据展示组件，选择器等
  * 操作组件
React是什么
* 专注View层
* 一切皆组件
* ES6语法，最新版本16

基础语法
* import React
* class语法新建组件，render里面直接使用
* render函数返回值就是JSX语法，会把JSX转成JS执行，实际执行的React.createElement

JSX基础语法
* JS直接写HTML
* class写成className
* 变量用{}包裹
* 组件只能返回一个根标签，很多时候return需要添加()，是因为针对结构复杂的组件时，为了代码结构清晰，需要显示层级结构，此时将HTML使用括号包裹，return语句紧跟括号，如果return后为空，则会报错。基本原则：多行使用括号。

默认版本还是版本15，手动更新为16，PS：目前已经是16，无需添加next
* React16是第一个核心代码重写的版本，整体API变化不大
* 主要变更了错误处理、生命周期、打包，对开发影响不是特别大
* npm install --save react@next react-dom@next

组件之间传递数据
* 使用props
* 内部使用this.props获取
* 无状态组件

组件内部state
* JSX本质就是js，所以我们可以直接使用js的能力
* constructor设置初始状态，记得执行super(props)
* state就是一个不可变对象，使用this.state获取

插个题外话：到这里开发让我有点不爽了，主要有两点：
1. 格式化问题 
  * vscode shift+option+f(mac)
  * editor.formatOnSave为true启用保存格式化
2. JSX标签自动补齐
  * emmet.triggerExpansionOnTab为true
  * 有时候会失效，继续设置"emmet.includeLanguages": {"javascript": "javascriptreact"}
3. 启用ESLint校验
  * 安装ESLint插件
  * 修改配置eslint.autoFixOnSave为ture

react事件
* JSX里，onClick={this.函数名}
* this引用的问题，需要在构造函数中bind绑定this或箭头函数
* this.setState修改state，记得，返回新的state而不是修改值

react生命周期
* 初始化周期
* 重新渲染生命周期
* 组件卸载生命周期

react官方推荐插件（chrome扩展）：React Developer Tools

Antd-mobild的使用
* 蚂蚁金服UI组件库，专门针对React
* npm install antd-mobile@next --save
* 兼容Web和ReactNative
* 按需加载
  * 需要babel-plugin-import的支持
  * 在package.json中babel中添加
  ```
    "plugins":[
      ["import",{"libraryName":"antd-mobile","style":"css"}]
    ]
  ```
* 常用组件
  * Layout布局组件
  * 表单组件，数据展示组件，选择器等
  * 操作组件
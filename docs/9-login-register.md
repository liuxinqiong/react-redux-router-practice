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
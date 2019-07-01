Express
* 快速开发、开放、极简的Web开发框架
* npm install express --save
* nodemon
  * npm install -g nodemon
  * nodemon server.js
* app.use、app.get、app.post、app.send、app.json、app.sendfile

mongodb + mongoose
* brew install mongodb
* 启动：mongod --config path
* npm install mongoose --save

mongoose基础使用
* 链接数据库
* 定义文档模型，Scheme 和 model 新建模型

mongoose文档类型
* String、Number 等数据结构
* create、remove、update 分别用来增、删、改的操作
* find 和 findone 用来查询数据

Express 和 mongodb 结合
* mongodb 独立工具函数
* express 使用 body-parser 支持 post 参数
* 使用 cookie-parser 存储登录信息 cookie
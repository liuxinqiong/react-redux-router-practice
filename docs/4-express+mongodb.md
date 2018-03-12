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
* 定义文档模型，Scheme和model新建模型

mongoose文档类型
* String、Number等数据结构
* 定create、remove、update分别用来增、删、改的操作
* find和findone用来查询数据

Express和mongodb结合
* mongodb独立工具函数
* express使用body-parser支持post参数
* 使用cookie-parser存储登录信息cookie
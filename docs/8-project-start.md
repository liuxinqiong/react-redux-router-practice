文件结构和规范
* src前端源码
* server 后端 express 目录
* 根据功能文件夹：component、container、reducers

前后端联调
* axios 发送异步请求
  * npm install axios --save
  * 不同域？使用 proxy 配置转发，package.json "proxy":"http://localhost:9093"
  * 单独使用直接在组件中 componentDidMount 即可
  * axios 拦截器，统一 loading 处理，axios.interceptors
  * redux 使用异步数据，渲染页面
文件结构和规范
* src前端源码
* server后端express目录
* 根据功能文件夹：component、container、reducers

前后端联调
* axios发送异步请求
  * npm install axios --save
  * 不同域？使用proxy配置转发，package.json "proxy":"http://localhost:9093"
  * 单独使用直接在组件中componentDidMount即可
  * axios拦截器，统一loading处理，axios.interceptors
  * redux使用异步数据，渲染页面
  
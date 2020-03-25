// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/index'


Vue.prototype.Hello = "Hello"
// 挂载在vue原型上的，就是全局对象
    


Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,    //注入，和路由一样都需要注入才能使用
  components: { App },
  template: '<App/>'
})

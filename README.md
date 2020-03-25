# Vue中的全局对象
    Vue.prototype.Hello = "Hello"    挂载在vue原型上的，就是全局对象
# Vue全局对象与Vuex的区别
    1.Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
    2.你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

# Vuex
## 1.Vuex是什么
    Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension ，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。
## 2.Vuex安装
    npm install vuex --save
## 3.引用Vuex
    import Vue from 'vue'
    import Vuex from 'vuex'
    Vue.use(Vuex)
## 4.引入兼容（主要是IE和个别浏览器）
    Vuex 依赖 Promise。如果你支持的浏览器并没有实现 Promise(比如IE)，那么你可以使用一个 polyfill 的库，例如es6-promise。
    安装：npm install es6-promise --save
    引入：import 'es6-promise/auto'
## 5.Vuex使用流程
    创建仓库
    const store = new Vuex.Store({
    state:{
        count:0
    }
    })
    创建后需要注入实例中
## 6.核心概念
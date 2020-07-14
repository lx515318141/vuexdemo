import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'


import defaultState from './defaultState'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import moduleA from './module/moduleA'
import moduleB from './module/moduleB'

import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

export default function(){
    // 创建仓库。和路由类似都是通过new创建
    const store = new Vuex.Store({
        // 动态严格模式，开发时为true，生产时为false
        // strict: process.env.NODE_ENV !== 'production',
        state:defaultState,
        getters,
        mutations,
        actions,
        modules:{
            moduleA,
            moduleB
        },
        plugins: [myPlugin,createLogger()]
    })

    // 热重载
    if (module.hot) {
        // 使所有操作成为可热重载模块
        module.hot.accept(['./mutations', './getters', './actions', './defaultState'], () => {
          // 获取更新后的模块
          // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
          const newMutations = require('./mutations').default
          const newgetters = require('./getters').default
          const newactions = require('./actions').default
          const newdefaultState = require('./defaultState').default
          
          // 加载新模块
          store.hotUpdate({
            mutations: newMutations,
            getters: newgetters,
            actions: newactions,
            defaultState: newdefaultState
          })
        })
      }

    return store
}

const myPlugin = store => {
    // 当 store 初始化后调用
    store.subscribe((mutation, state) => {
      // 每次 mutation 之后调用
      // mutation 的格式为 { type, payload }
      console.log(mutation)
    })
  }

const logger = createLogger({
  collapsed: false, // 自动展开记录的 mutation
  filter (mutation, stateBefore, stateAfter) {
    // 若 mutation 需要被记录，就让它返回 true 即可
    // 顺便，`mutation` 是个 { type, payload } 对象
    return mutation.type !== "aBlacklistedMutation"
  },
  transformer (state) {
    // 在开始记录之前转换状态
    // 例如，只返回指定的子树
    return state.subTree
  },
  mutationTransformer (mutation) {
    // mutation 按照 { type, payload } 格式记录
    // 我们可以按任意方式格式化
    return mutation.type
  },
  logger: console, // 自定义 console 实现，默认为 `console`
})
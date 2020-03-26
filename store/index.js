import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'


import defaultState from './defaultState'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import moduleA from './module/moduleA'
import moduleB from './module/moduleB'

Vue.use(Vuex)

export default function(){
    // 创建仓库。和路由类似都是通过new创建
    const store = new Vuex.Store({
        state:defaultState,
        getters,
        mutations,
        actions,
        modules:{
            moduleA,
            moduleB
        }
    })

    return store
}
import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'

Vue.use(Vuex)

export default function(){
    // 创建仓库。和路由类似都是通过new创建
    const store = new Vuex.Store({
        state:{
        count:10
        }
    })

    return store
}
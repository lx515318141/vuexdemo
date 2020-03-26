export default {
    namespaced: true,
    state:{
        moduleACount:100
    },
    mutations:{
        addACount(state, n){
            state.moduleACount += n
        }
    },
    actions:{
        addACountAction({ dispatch, commit, getters, rootGetters },n){
            commit("addACount",n)
            // 可读取全局的getters
            console.log(rootGetters)
        }
    },
    getters:{
        getModuleACount(state, getters, rootState, rootGetters){
            console.log(rootState)
            console.log(rootGetters);
            
            return state.moduleACount
        }
    }
}
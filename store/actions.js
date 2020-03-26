import { INCREMENT, DECREMENT } from './mutation-types'

export default {
    // context:上下文
    [INCREMENT]({ commit }, n) {
        commit(INCREMENT, n);
    },
    [DECREMENT](context, n) {
        context.commit(DECREMENT, n);
    },
    banners({ commit }){
        // 异步操作
        api.banner.bannerData()
        .then(res => {
            commit("banners",res.data)
        })
    },
    // gotOtherDataAction必须基于gotDataAction执行完成之后执行
    gotDataAction({commit},c){
        commit("gotData","hello");
    },
    async gotOtherDataAction({ dispatch,commit }){
        // 外部调用
        await dispatch("gotDataAction");
        setTimeout(() => {
            commit("gotOtherData",'otherHello');
        },2000);
    }
}
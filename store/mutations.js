import { INCREMENT, DECREMENT } from './mutation-types'

export default {
    [INCREMENT](state,n){
        state.count += n
    },
    [DECREMENT](state,n){
        state.count -= n
        // 对象风格提交方式，当使用对象风格提交方式的时候，传入的n不再是一个数字，而是一个对象
        // state.count -= n.num
    }
}
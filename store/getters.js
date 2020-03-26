export default {
    getCount(state){
        if(state.count <= 0){
            return "数据不合理"
        }else{
            return state.count
        }
        
    }
}
<template>
    <div>
        Home:{{ getHello }}
        <button @click="changeHello">修改Hello</button>
        <V1 @onV1Msg="V1MsgHandler"/>
        <V2 :V2Msg="V2Msg"/>
        <button @click="addHandler">增加</button>
        <button @click="minHandler">减少</button>
        <hr />
        <V3 />
    </div>
</template>

<script>
import V1 from "../../components/V1"
import V2 from "../../components/V2"
import V3 from "../../components/V3"
import { INCREMENT, DECREMENT } from '../../store/mutation-types'
import { mapMutations } from 'vuex'

export default {
    name:"Home",
    data(){
        return{
            V2Msg:"",
            minNum:5
        }
    },
    components:{
        V1,
        V2,
        V3
    },
    methods:{
        V1MsgHandler(data){
            this.V2Msg = data
        },
        changeHello(){
            this.Hello = "World"
            console.log(this.Hello);
        },
        ...mapMutations([INCREMENT,DECREMENT]),
        addHandler(){
            // this.$store.commit(INCREMENT,10)
            // 使用mapMutation
            this.INCREMENT(10)
        },
        minHandler(){
            // this.$store.commit(DECREMENT,this.minNum)
            // 对象风格提交方式
            // this.$store.commit({
            //     type:"decrement",
            //     num:this.minNum
            // })
            // 使用mapMutation
            this.DECREMENT(this.minNum)
            // 如果想使用对象风格提交参数，则写为
            // this.DECREMENT({
            //     num:this.minNum
            // })
        }
    },
    computed:{
        getHello(){
            return this.Hello
        }
    }
}
</script>

<style scoped>

</style>
<template>
    <div>
        Home:{{ getHello }}
        <button @click="changeHello">修改Hello</button>
        <V1 @onV1Msg="V1MsgHandler"/>
        <V2 :V2Msg="V2Msg"/>
    </div>
</template>

<script>
import V1 from "../../components/V1"
import V2 from "../../components/V2"
export default {
    name:"Home",
    data(){
        return{
            V2Msg:""
        }
    },
    components:{
        V1,
        V2
    },
    methods:{
        V1MsgHandler(data){
            this.V2Msg = data
        },
        changeHello(){
            this.Hello = "World"
            console.log(this.Hello);
            
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
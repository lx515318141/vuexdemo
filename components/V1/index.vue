<template>
    <div>
        V1:{{ getHello }}
        <!-- 读取Vuex：{{ this.$store.state.count }} -->
        读取Vuex：{{ getCount }}-{{ text }}
        <button @click="sendHandler">send</button>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"
export default {
    name:"V1",
    data(){
        return{
            Msg:"V1Data"
        }
    },
    methods:{
        sendHandler(){
            this.$emit("onV1Msg",this.Msg)
        }
    },
    computed:{
        getHello(){
            // 在项目中的任何组件内都可以获取到全局属性
            return this.Hello
        },
        ...mapState(["count","text"]),
        ...mapGetters(["getCount"])
    }
}
</script>

<style scoped>

</style>
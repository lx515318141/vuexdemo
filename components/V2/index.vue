<template>
    <div>
        V2:{{ V2Msg }}
        读取Vuex：{{ this.$store.state.count }}
    </div>
</template>

<script>
export default {
    name:"V2",
    props:{
        V2Msg:{
            type:String,
            default:""
        }
    }
}
</script>

<style scoped>

</style>
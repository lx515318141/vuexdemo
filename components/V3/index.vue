<template>
    <div>
        V3:
        moduleA:{{ this.$store.state.moduleA.moduleACount }}
        moduleB:{{ this.$store.state.moduleB.moduleBCount }}
        通过getters读取moduleA：{{ this.$store.getters['moduleA/getModuleACount'] }}
        <div>
            <button @click="addAHandler">addmoduleA</button>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapMutations, mapActions } = createNamespacedHelpers("moduleA")

export default {
    name:"V3",
    methods:{
        ...mapMutations(["addACount"]),
        ...mapActions(["addACountAction"]),
        addAHandler(){
            // 下面为mutation用法
            // this.$store.commit("moduleA/addACount")
            // 下面为action用法
            // this.$store.dispatch("moduleA/addACountAction")
            // 下面为mapMutations用法
            // this.addACount(10)
            // 下面为mapActions用法
            this.addACountAction(5)
            
        }
    }
}
</script>

<style scoped>

</style>
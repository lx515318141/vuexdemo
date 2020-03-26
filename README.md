# Vue中的全局对象
    Vue.prototype.Hello = "Hello"    挂载在vue原型上的，就是全局对象
# Vue全局对象与Vuex的区别
    1.Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
    2.你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

# Vuex
## 1.Vuex是什么
    Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension ，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。
## 2.Vuex安装
    npm install vuex --save
## 3.引用Vuex
    import Vue from 'vue'
    import Vuex from 'vuex'
    Vue.use(Vuex)
## 4.引入兼容（主要是IE和个别浏览器）
    Vuex 依赖 Promise。如果你支持的浏览器并没有实现 Promise(比如IE)，那么你可以使用一个 polyfill 的库，例如es6-promise。
    安装：npm install es6-promise --save
    引入：import 'es6-promise/auto'
## 5.Vuex使用流程
    创建仓库：
    const store = new Vuex.Store({
    state:{
        count:0
    }
    })
    创建后需要注入实例中。
    组件中读取：
    {{ this.$store.state.count }}
## 6.核心概念
### 6.1State
    Vuex 使用单一状态树——是的，用一个对象就包含了全部的应用层级状态。至此它便作为一个“唯一数据源 (SSOT)”而存在。这也意味着，每个应用将仅仅包含一个 store 实例。
    mapState 辅助函数
    使用mapState必须现在组建中引入:
    import { mapState } from 'vuex'
    写在computed中，推荐使用扩展运算符的形式：
    ...mapState(["count","text"])       
    读取：
    {{ count }}-{{ text }}
### 6.2Mutation
    更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
        mutations:{
            increment(state){
                state.count ++
            }
        }
        使用：this.$store.commit("decrement")
    提交载荷(就是可以提交参数的Mutation)
        decrement(state,n){
            state.count -= n
            // 对象风格提交方式，当使用对象风格提交方式的时候，传入的n不再是一个数字，而是一个对象
            // state.count -= n.num
        }
        使用：this.$store.commit("decrement",this.minNum)
        或使用对象风格提交方式
        this.$store.commit({
            type:"decrement",
            num:this.minNum
        })
    ※※※ 很重要 Mutation 需遵守 Vue 的响应规则
        既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：
            1.最好提前在你的 store 中初始化好所有所需属性。(因为store是一个对象。在Vue中给对象增加新的属性比较麻烦，所有要用到的属性最好提前在store中初始化好)
            2.当需要在对象上添加新属性时，你应该
            使用 Vue.set(obj, 'newProp', 123), 或者
            以新对象替换老对象。例如，利用对象展开运算符我们可以这样写：
            state.obj = { ...state.obj, newProp: 123 }
    使用常量替代 Mutation 事件类型
        单纯使用字符串容易出错，所有可以用常量代替 Mutation 事件类型。
        可现在store目录下创建mutation-types.js文件，在其中声明用来代替事件类型的常量
        export const INCREMENT = "INCREMENT"
        export const DECREMENT = "DECREMENT"
        再在index.js中引入
        import { INCREMENT, DECREMENT } from './mutation-types'
        创建事件：
        mutations:{
            [INCREMENT](state,n){
                state.count += n
            },
            [DECREMENT](state,n){
                state.count -= n
                // 对象风格提交方式，当使用对象风格提交方式的时候，传入的n不再是一个数字，而是一个对象
                // state.count -= n.num
            }
        }
        在组件中使用时也要先引入，然后再使用：this.$store.commit(INCREMENT,10)
    ※※※ Mutation 必须是同步函数
        一条重要的原则就是要记住 mutation 必须是同步函数。mutation里面不能放任何异步操作。
    在组件中提交 Mutation
        使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用需要在根节点注入 store）。
        使用方法和mapState类似:
            mapMutations:
            import { mapMutations } from 'vuex'
            写在methods中，推荐使用扩展运算符的形式：
            ...mapMutations([INCREMENT,DECREMENT]), 
            使用时
            this.DECREMENT(this.minNum)
### 6.2Action
    Action 类似于 mutation，不同在于：
        Action 提交的是 mutation，而不是直接变更状态。
        Action 可以包含任意异步操作。
    Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。但 context 对象不是 store 实例本身。
    actions: {
        increment (context) {
        context.commit('increment')
        }
    }
    actions:{
        // context:上下文
        [INCREMENT](context){
            context.commit(INCREMENT);
        }
    }
    banners({ commit }){
        // 异步操作
        api.banner.bannerData()
        .then(res => {
            commit("banners",res.data)
        })
    }
    在组件中分发 Action
    组合 Action
    async gotOtherDataAction({ dispatch,commit }){
        await dispatch("gotDataAction");
        setTimeout(() => {
            commit("gotOtherData",'otherHello');
        },2000);
    }
### 6.2Getters
    可以相当于一个过滤器，对store中的state进行过滤
    mapGetters 辅助函数：使用方法和mapState类似。
### 6.3Module
    创建多个module文件，在index中引入，
    import moduleA from './module/moduleA'
    import moduleB from './module/moduleB'
    注入到
    export default function(){
        const store = new Vuex.Store({
            modules:{
                moduleA,
                moduleB
            }
        })

        return store
    }
    在组件中使用
    {{ this.$store.state.moduleB.moduleBCount }}
    模块的局部状态
    命名空间
    当存在多个module时，各module内的mutation，action中的名字容易重复、冲突或用错，所有需要使用命名空间，在模块module中加入：
    namespaced: true
    再在各组件中调用mutation，action时，前面就要加上module的名称了
    this.$store.commit("moduleA/addACount")
    module中的 action ，getters，还可以获取全局中的getters，state：
        actions:{
            addACountAction({ dispatch, commit, getters, rootGetters },n){
                ...
                // 可读取全局的getters
                console.log(rootGetters)
            }
        }
        getters:{
            getModuleACount(state, getters, rootState, rootGetters){
                ...
                // 可读取全局的state和getters
                console.log(rootState)
                console.log(rootGetters);
                return state.moduleACount
            }
        }
    当使用了带有命名空间的module后，为了便于使用辅助函数mapMutations，mapActions等，可以通过使用 createNamespacedHelpers 创建基于某个命名空间辅助函数：
        import { createNamespacedHelpers } from 'vuex'
        const { mapMutations, mapActions } = createNamespacedHelpers('moduleA')
    在methods中就可以直接使用：
        ...mapMutations(["addACount"]) 和 this.addACount(10)
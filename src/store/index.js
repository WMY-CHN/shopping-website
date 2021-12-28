import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

//引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopCart from './shopCart'
import user from './user'
import trade from './trade'


export default new Vuex.Store({
    //实现vuex仓库模块化存储
    modules: {
        home,
        search,
        detail,
        shopCart,
        user,
        trade
    }
})
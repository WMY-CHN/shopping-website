import Vue from 'vue'
import App from './App.vue'
//引入elementui
import { Button, MessageBox } from 'element-ui';

//三级联动组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)

//轮播图组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)

//分页器组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)

//elementUI组件注册
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入路由
import router from '@/router'
//引入Store仓库
import store from '@/store'

//引入mockServe.js
import '@/mock/mockServe'

//引入swiper样式
import 'swiper/css/swiper.css'

//引入api文件
import * as API from '@/api'

//引入懒加载图片插件
import VueLazyload from 'vue-lazyload'

//引入VeeValidate表单验证
import '@/plugins/validate'
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'dist/error.png',
    loading: 'dist/loading.gif',
    attempt: 1
})
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    // 配置全局事件总线$bus
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$api = API;
    },
    //注册路由
    router,
    //注册仓库(组件实例上会增加一个$store属性)
    store
}).$mount('#app')
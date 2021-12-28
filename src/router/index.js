//引入
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
//使用插件
Vue.use(VueRouter)

//把VueRouter原型对象的rush|replace方法先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写push|replace方法
VueRouter.prototype.push = function(location, res, rej) {
    if (res && rej) {
        originPush.call(this, location, res, rej)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}
VueRouter.prototype.replace = function(location, res, rej) {
    if (res && rej) {
        originReplace.call(this, location, res, rej)
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}

let router = new VueRouter({
    //配置路由
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})

router.beforeEach(async(to, from, next) => {
    if (store.state.user.token) {
        //用户已经登录
        if (to.path == '/login' || to.path == '/register') {
            //去login
            //阻止去login跳转到home
            next('/home')
        } else {
            //不去login
            //如果没有用户信息
            if (!store.state.user.userInfo.name) {
                try {
                    //请求用户信息
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    //请求失败或token失效
                    //退出登录 
                    await store.dispatch('userLogOut')
                        //跳转登录页面
                    next('/login')
                }
            } else { //有用户信息  放行
                next()
            }

        }
    } else {
        //用户未登录
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            next('/login?redirect=' + toPath);
        } else {
            next();
        }
    }
})

export default router
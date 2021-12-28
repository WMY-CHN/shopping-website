//引入需要路由的组件
//一级路由
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

//二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

export default [
    // 主页
    {
        name: 'home',
        path: '/home',
        component: () =>
            import ('@/pages/Home'),
        meta: {
            isShow: true
        }
    },

    //搜索
    {
        name: 'search',
        path: '/search/:keyword?',
        component: () =>
            import ('@/pages/Search'),
        meta: {
            isShow: true
        }
    },

    // 登录
    {
        path: '/login',
        component: () =>
            import ('@/pages/Login'),
        meta: {
            isShow: false
        }
    },

    // 注册
    {
        path: '/register',
        component: () =>
            import ('@/pages/Register'),
        meta: {
            isShow: false
        }
    },

    // 商品详情页
    {
        path: '/detail/:skuid',
        component: () =>
            import ('@/pages/Detail'),
        meta: {
            isShow: true
        }
    },
    // 添加购物车成功页面
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: () =>
            import ('@/pages/AddCartSuccess'),
        meta: {
            isShow: true
        }
    },

    // 购物车页面
    {
        name: 'shopcart',
        path: '/shopcart',
        component: () =>
            import ('@/pages/ShopCart'),
        meta: {
            isShow: true
        }
    },

    // 结算页面
    {
        name: 'trade',
        path: '/trade',
        component: () =>
            import ('@/pages/Trade'),
        meta: {
            isShow: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path == "/shopcart") {
                next()
            } else {
                next(false)
            }
        }
    },

    //支付页面
    {
        name: 'pay',
        path: '/pay',
        component: () =>
            import ('@/pages/Pay'),
        meta: {
            isShow: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path == "/trade") {
                next()
            } else {
                next(false)
            }
        }
    },
    //支付成功页面
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: () =>
            import ('@/pages/PaySuccess'),
        meta: {
            isShow: true
        }
    },
    //个人中心页面
    {
        name: 'center',
        path: '/center',
        component: () =>
            import ('@/pages/Center'),
        meta: {
            isShow: true
        },
        children: [{
                path: '/center',
                redirect: '/center/myOrder'
            }, {
                path: 'myOrder',
                component: MyOrder
            },
            {
                path: 'groupOrder',
                component: GroupOrder
            }
        ]
    },
    // 输入其他路径，重定向主页
    {
        path: '/',
        redirect: '/home'
    }
]
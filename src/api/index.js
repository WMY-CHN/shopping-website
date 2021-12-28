//统一管理API
import requests from "./Ajax"
import mockRequersts from "./mockAjax"
//三级联动的接口
// /api/product/getBaseCategoryList   get  无参数

export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

//获取首页轮播图结构（mock）----banner
export const reqGetBannerList = () => mockRequersts.get('/banner')

//获取floor组件的数据
export const reqFloorList = () => mockRequersts.get('/floor')

//获取search组件数据
export const reqGetSearchInfo = (params) => requests({
    url: '/list',
    method: 'POST',
    data: params
})

//获取detail组件数据
export const reqGoodsInfo = (skuId) => requests({
    url: `/item/${skuId}`,
    method: 'GET'
})

//将产品添加到购物车中  或者更新购物车
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${ skuId }/${ skuNum }`,
    method: 'POST'
})

//获取购物车列表
export const reqCartList = () => requests({
    url: 'cart/cartList',
    method: 'GET'
})

//删除购物车商品
export const reqDeleteCartById = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'DELETE'
})

//修改商品的选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'GET'
})

//获取注册验证码
// /user/passport/sendCode/{phone}
export const reqGetCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'GET'
})

//注册
export const reqUserRegister = (data) => requests({
    url: '/user/passport/register',
    data,
    method: 'POST'
})

//登录
export const reqUserLogin = (data) => requests({
    url: '/user/passport/login',
    data,
    method: 'POST'
})

//首页获取用户信息（带token）
export const reqUserInfo = () => requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'GET'
})


//退出登录
export const reqLogOut = () => requests({
    url: '/user/passport/logout',
    method: 'GET'
})

//获取用户地址信息
export const reqAddressInfo = () => requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'GET'
})

//获取订单商品清单
export const reqOrderInfo = () => requests({
    url: '/order/auth/trade',
    method: 'GET'
})


//提交订单
export const reqSubmitOrder = (tradeNo, data) => requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'POST'
})

//获取订单支付信息
export const reqPayInfo = (orderId) => requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'GET'
})

//获取支付状态
export const reqPayStatus = (orderId) => requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'GET'
})

//获取个人中心订单数据
export const reqMyOrderList = (page, limit) => requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'GET'
})
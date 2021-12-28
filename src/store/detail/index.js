import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
//生成游客身份模块
import { getUID } from '@/utils/uid_token'
const state = {
    goodInfo: {},
    //游客的临时身份
    uid_token: getUID()
}

const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}

const actions = {
    //获取产品信息
    async getGoodsInfo({ commit }, skuId) {
        const result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    //添加/更新购物车
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
            //加入购物车成功
        if (result.code == 200) {
            return 'OK'
        } else {
            return Promise.reject(new Error('fail'))
        }
    }

}

const getters = {
    // 路径导肮数据简化
    categoryView(state) {
        //至少返回一个{}避免报错
        return state.goodInfo.categoryView || {}
    },

    // 产品信息数据简化
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },

    //产品售卖属性简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }


}

export default {
    state,
    mutations,
    actions,
    getters
}
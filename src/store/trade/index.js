import { reqAddressInfo, reqOrderInfo } from "@/api"
//trade
const state = {
    address: [],
    orderInfo: {}
}
const mutations = {
    GETUSERADDRESS(state, address) {
        state.address = address
    },
    GETORDERLIST(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}
const actions = {
    //获取用户地址
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo()
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data)
        }
    },

    //获取商品清单
    async getOrderList({ commit }) {
        let result = await reqOrderInfo()
        if (result.code == 200) {
            commit('GETORDERLIST', result.data)
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}
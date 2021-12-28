import { reqGetSearchInfo } from "@/api"

//search模块仓库
const state = {
    searchList: {}
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
    //获取search模块数据
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }

}
const getters = {
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    trademarkList() {
        return state.searchList.trademarkList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []

    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
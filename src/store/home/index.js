import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api/"
//home模块仓库
const state = {
    //home三级菜单数据
    categoryList: [],
    //首页轮播图数据
    bannerList: [],
    //floor组件数据
    floorList: []
}
const mutations = {
    CATEGOTYLIST(state, categoryList) {
        state.categoryList = categoryList.slice(0, 17)
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}
const actions = {
    async categoryList({ commit }) {
        const result = await reqCategoryList();
        if (result.code == 200) {
            commit('CATEGOTYLIST', result.data)
        }
    },
    //获取首页轮播图地址
    async getBannerList({ commit }) {
        let result = await reqGetBannerList()
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    //获取floor数据
    async getFloorList({ commit }) {
        let result = await reqFloorList()
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data)
        }
    },

}
const getteer = {}

export default {
    state,
    mutations,
    actions,
    getteer
}
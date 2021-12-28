//三级联动组件
<template>
   <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
            <!-- 商品分类列表 -->
            <transition name="sort">
                <div class="sort" v-show="show">
                        <!-- 一级菜单 -->
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex==index}">
                                <h3 @mouseenter="changeIndex(index)">
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                                </h3>
                                <!-- 二级菜单 -->
                                <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                                    <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                            </dt>
                                            <!-- 三级菜单 -->
                                            <dd>
                                                <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </transition>
            </div>
            <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import throttle from 'lodash/throttle'
export default {
 name:'TypeNav',
 data() {
     return {
         //存储用户鼠标移到的一级分类
         currentIndex:-1,
         show:true
     }
 },
 //组件挂载完毕，向服务器请求数据
 mounted() {
     //如果不是home路由组件  将TypeNav隐藏
     if(this.$route.path!='/home'){
         this.show=false
     }
 },
 computed:{
    ...mapState({
        categoryList:state=>state.home.categoryList
    })
 },
 methods: {
    //记录当前鼠标进入的列表index  并进行节流
    changeIndex:throttle(function(index){
        this.currentIndex=index
    },50),

    //进行路由跳转的方法  使用事件委派添加的到a标签的父元素
    //问题：1如何确定点击的是a标签  如何确定标签级数 2如何传参
    goSearch(event){
        let {categoryname,category1id,category2id,category3id} = event.target.dataset
        //元素是否有自定义属性categoryname区分是否a标签
        //元素自定义属性category1Id区分是否a标签
        if(categoryname){
            //整理跳转的参数 
                    //准备路由跳转的参数对象
                let location = { name: "search" };   
                let query = {categoryName:categoryname}
            if(category1id){
                query.category1Id = category1id
            }else if(category2id){
                query.category2Id = category2id
            }else if(category3id){
                query.category3Id = category3id
            }
            if(this.$route.params){
                //合并参数
                location.query = query
                location.params = this.$route.params
                //路由跳转
                this.$router.push(location)
            }
        }
    },
    //鼠标移入事件
    enterShow(){
        //显示TypeNav商品分类列表
        this.show = true
    },

    //鼠标移出事件
    leaveShow(){
        this.changeIndex(-1)
        if(this.$route.path!='/home'){
            this.show = false
        }
        
    }
    
 },
 
}
</script>

<style scoped lang='less'>
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 27px;
                            font-size: 14px;
                            font-weight: 600;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &:hover {
                            .item-list {
                                display: block;
                            }
                        }
                    }
                }
                .cur{
                    background-color: rgb(65, 137, 245);
                }
            }
            
            // 鼠标进入动画样式
            //开始状态
            .sort-enter{
                height: 0;
            }
            //结束状态
            .sort-enter-to{
               height: 461px;
            }
            //定义动画时间速率
            .sort-enter-active{
                transition: all 0.3s ease-out;
            }

            // 鼠标离开动画样式
            //开始状态
            .sort-leave{
                height: 461px;
            }
            //结束状态
            .sort-leave-to{
               height: 0px;
            }
            //定义动画时间速率
            .sort-leave-active{
                transition: all 0.3s ease-out;
            }

        }
    }
    
</style>
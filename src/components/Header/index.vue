// 头部组件
<template>
    <!-- 头部 -->
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>欢迎！</p>
                    <p v-if="!userName">
                        <span>请</span>
                        <router-link to="/login">登录</router-link>
                        <router-link to="/register" class="register">免费注册</router-link>
                    </p>
                    <p v-else>
                        <span>您好：</span>
                        <a >{{userName}}</a>
                        <a class="register" @click="logOut">退出登录</a>

                    </p>
                </div>
                <div class="typeList">
                    <a href="###" @click="$router.push('/center')">我的订单</a>
                    <a href="###" @click="$router.push('/shopcart')">我的购物车</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link class="logo" to="/home">
                    <img src="./images/logo.png" alt="">
                </router-link>
            </h1>
            <div class="searchArea" v-if="$route.path!='/login'&&$route.path!='/register'">
                <form action="###" class="searchForm">
                    <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" @keydown.enter.prevent="goSearch"/>
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name:'Header',
    data() {
        return {
           keyword:'' 
        }
    },
    methods: {
        //搜索按钮的回调函数
        goSearch(){
            //传递搜索框内容给search
            // 第一种方式 字符串拼接 
            // this.$router.push('/search/' + this.keyword + '?k='+ this.keyword.toUpperCase())

            // 第二种方式 模板字符串
            // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)

            // 第三种方式 对象
            // this.$router.push({
            //     name:'search',
            //     params:{keyword:this.keyword || undefined}
            // })
            
            if(this.$route.query){
                let location={
                    name:'search',
                    params:{keyword:this.keyword || undefined}
                }
                location.query = this.$route.query
                this.$router.push(location)
            }
        },
        //退出登录
        async logOut(){
            try {
               await this.$store.dispatch('userLogOut')
               this.$router.push('/home') 
            } catch (error) {
               alert(error.message)
            }
        }
    },
    mounted() {
        this.$bus.$on('clear',()=>{
            this.keyword=''
        });
    },
    computed:{
        userName(){
            return this.$store.state.user.userInfo.name
        }
    }
}
</script>

<style scoped lang="less">
     .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>
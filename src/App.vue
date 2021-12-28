<template>
<div>
  <Header/>
  <router-view></router-view>
  <Footer v-show="$route.meta.isShow"/>
</div>
 
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name:'',
  components:{
    Header,
    Footer
  },mounted() {
    //派发一个action，获取TypeNav数据并存储数据
     this.$store.dispatch('categoryList')
  },
}
</script>

<style>

</style>
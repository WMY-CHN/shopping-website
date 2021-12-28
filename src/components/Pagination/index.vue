<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="pre">上一页</button>
    <!-- 第一页 -->
    <button v-if="startNum>1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
    <button v-if="startNum>2" disabled>···</button>
    <!-- 连续页码 -->
    <button v-for="(current,index) in endNum" :key="index" v-show="current>=startNum" @click="$emit('getPageNo',current)" :class="{active:pageNo==current}">{{current}}</button>

    <button v-if="endNum<totalPage-1" disabled>···</button>
    <!-- 最后一页 -->
    <button v-if="endNum<totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="next">下一页</button> 
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continues'],
    computed:{
        totalPage(){
            return Math.ceil(this.total/this.pageSize)
        },
        //计算连续页码的起始数字和结束数字
        startNum(){
            if(this.continues>this.total){
                return 1
            }else{
                let start = this.pageNo-parseInt(this.continues/2)
                //设置起始页码下限
                if(start<1){
                    start=1
                }
                //设置起始页码上限
                if(start>this.totalPage-this.continues){
                  start=this.totalPage-this.continues+1
                }

                return start
            }
            
        },
        endNum(){
            if(this.continues>this.total){
                return this.totalPage
            }else{
                let end = this.pageNo+parseInt(this.continues/2)
                //设置结束页码下限
                if(end<this.continues){
                    end=this.continues
                }
                //设置结束页码上限
                if(end>this.totalPage){
                    end=this.totalPage
                }

                return end
            }
        },
    },
    methods: {
         //上一页
        pre(){
            this.$emit('getPageNo',this.pageNo-1)
        },

         //下一页
        next(){
            this.$emit('getPageNo',this.pageNo+1)
        }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
      text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;
      transition: all 0.5s;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #ea4a36;
        color: #fff;
      }
    }
    button:hover{
        background-color:#ea4a36;
        color: #fff;
    }
  }
</style>
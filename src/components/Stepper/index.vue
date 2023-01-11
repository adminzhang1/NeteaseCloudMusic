<template>
  <div id="m-pl-pager">
    <div class="u-page">
      <a href="javascript:;" :class="'zbtn zprv ' + (page === 1 ? 'js-disabled' : '')" @click="pre">上一页</a>
      <template v-for="item in stepperList">
        <a href="javascript:;" :class="'zpgi ' + (item === page ? 'js-selected':'')" v-if="item !== null" @click="updatePage(item)">{{ item }}</a>
        <span class="zdot" v-if="item === null">...</span>
      </template>
      <a href="javascript:;" :class="'zbtn znxt ' + (page === Math.ceil(total/pageSize) ? 'js-disabled' : '')" @click="nxt">下一页</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Stepper',
  props: {
    total: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
  },
  data(){
    return {
      stepperList: []
    }
  },
  methods: {
    // 上一页
    pre(){
      if(this.page - 1 <= 0)return;
      this.$emit('setNewPage',this.page - 1)
    },
    // 下一页
    nxt(){
      if(this.page + 1 >= Math.ceil(this.total/this.pageSize))return;
      this.$emit('setNewPage',this.page + 1)
    },
    // 更新页
    updatePage(page){
      this.$emit('setNewPage',page)
    },
    // 更新步进器
    updateSte(){
      let arr = []
      let maxPage = Math.ceil(this.total/this.pageSize)
      if(maxPage < 9){
        for(let i = 1; i <= maxPage; i++){
          arr.push(i)
        }
        this.stepperList = arr
      }else{
        if(this.page <= 5){
          for(let i = 1; i <= 8; i++){
            arr.push(i)
          }
          arr.push(null)
          arr.push(maxPage)
          this.stepperList = arr
        }else if(this.page >= maxPage - 4){
          arr.push(1)
          arr.push(null)
          for(let i = maxPage - 7; i <= maxPage; i++){
            arr.push(i)
          }
          this.stepperList = arr
        }else{
          let x = this.page
          for(let i = 0; i < 7; i++){
            if(i%2 === 0){
              arr.push(x + i)
              x += i
            }else{
              arr.push(x - i)
              x -= i
            }
          }
          arr = arr.sort((a, b) => a - b)
          arr.unshift(null)
          arr.unshift(1)
          arr.push(null)
          arr.push(maxPage)
          this.stepperList = arr
        }
      }
    }
  },
  watch: {
    total: {
      immediate: true,
      handler(newVal){
        if(newVal <= 0)return;
        this.updateSte()
      }
    },
    page: {
      immediate: true,
      handler(newVal){
        if(this.total <= 0)return;
        this.updateSte()
      }
    }
  }
}
</script>

<style lang="less" scoped>
#m-pl-pager{
  div.u-page{
    margin: 20px 0;
    text-align: center;
    a{
      &.zprv.js-disabled,&.zprv.js-disabled:hover{
        background-position: 0 -620px;
        color: #cacaca;
        cursor: default;
      }
      &.znxt.js-disabled,&.znxt.js-disabled:hover{
        background-position: -75px -620px;
        color: #cacaca;
        cursor: default;
      }
      &.js-selected,&.js-selected:hover{
        background-position: 0 -650px;
        border-color: #a2161b;
        color: #fff;
        cursor: default;
      }
    }
    .zprv{
      width: 47px;
      padding-left: 22px;
      background-position: 0 -560px;
      &:hover{
        background-position: 0 -590px;
      }
    }
    .znxt{
      width: 57px;
      padding-left: 12px;
      background-position: -75px -560px;
      &:hover{
        background-position: -75px -590px;
      }
    }
    .zpgi{
      height: 22px;
      padding: 0 8px;
      background-color: #fff;
      line-height: 22px;
      &:hover{
        border-color: #666;
      }
    }
  }
}
</style>

<template>
  <div id="app" :style="{overflowY: isShow ? 'hidden' : 'visible'}">
    <Header />
    <router-view />
    <Footer />
    <a href="javascript:;" title="回到顶部" class="m-back" id="g_backtop" @click="goTop">回到顶部</a>
    <!-- 登陆窗口 -->
    <div class="mrc-modal" v-if="isShow">
      <div class="mrc-modal-mask"></div>
      <div class="mrc-modal-wrapper">
        <LoginQR />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LoginQR from '@/components/LoginQR'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    Header,Footer,LoginQR
  },
  computed: {
    ...mapState('login', ['isShow'])
  },
  data(){
    return {}
  },
  methods: {
    ...mapActions('toplist',['getFirstToplistId']),
    // 返回顶部
    goTop(){
      window.scrollTo(0,0)
    }
  },
  created(){
    this.getFirstToplistId()
  },
  watch: {
    '$route.fullPath': {
      handler(newVal){
        if(newVal === '/found/toplist'){
          this.getFirstToplistId()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.m-back{
  display: block;
  position: fixed;
  left: 50%;
  bottom: 160px;
  width: 49px;
  height: 44px;
  text-indent: -9999px;
  margin-left: 500px;
  background-position: -265px -47px;
  &:hover{
    background-position: -325px -47px;
  }
}
.mrc-modal{
  display: block;
  position: absolute;
  z-index: 1000;
  .mrc-modal-mask{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .65);
  }
  .mrc-modal-wrapper{
    position: fixed;
    display: flex;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    /deep/ .mrc-modal-container{
      position: relative;
      z-index: 9998;
      pointer-events: auto;
      background-color: #fff;
      width: 530px;
      border-radius: 4px;
      box-shadow: 0 5px 16px rgb(0 0 0 / 80%);
      border: 0;
      .mrc-container-top{
        position: relative;
        z-index: 10;
        height: 38px;
        line-height: 38px;
        margin: 0;
        padding: 0 45px 0 18px;
        border-bottom: 1px solid #191919;
        border-radius: 4px 4px 0 0;
        background: #2d2d2d;
        font-weight: bold;
        font-size: 14px;
        color: #fff;
        .clear{
          position: absolute;
          z-index: 20;
          top: 16px;
          right: 20px;
          width: 10px;
          height: 10px;
          overflow: hidden;
          text-indent: -9999px;
          cursor: pointer;
          background: url('@/assets/icons/mrc-modal-icon.png') no-repeat;
          background-position: 0 -95px;
        }
      }
    }
  }
}
</style>

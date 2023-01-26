<template>
  <div id="app" :style="{overflowY: isShow||!footerShow ? 'hidden' : 'visible'}"  @click="handleClick_ChlirenCompontent" ref="app">
    <Header />
    <router-view />
    <Footer v-if="footerShow" />
    <a href="javascript:;" title="回到顶部" class="m-back" id="g_backtop" @click="goTop" v-if="footerShow">回到顶部</a>
    <!-- 登陆窗口 -->
    <div class="mrc-modal" v-if="isShow">
      <div class="mrc-modal-mask"></div>
      <div class="mrc-modal-wrapper">
        <LoginQR />
      </div>
    </div>
    <!-- 底部音乐播放器 -->
    <MusicPlayer ref="musicPlayer" />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LoginQR from '@/components/LoginQR'
import MusicPlayer from '@/components/MusicPlayer'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    Header,Footer,LoginQR,MusicPlayer
  },
  computed: {
    ...mapState('login', ['isShow']),
    ...mapState('music', ['listShow'])
  },
  data(){
    return {
      footerShow: true,
      scroll: true,
    }
  },
  methods: {
    ...mapActions('toplist',['getFirstToplistId']),
    handleClick_ChlirenCompontent(e){
      if(e.target.id !== 'cateToggleLink'){
        this.$bus.$emit('setCatShow',false)
      }else{
        this.$bus.$emit('setCatShow')
      }
      if(!this.$refs.musicPlayer.$el.contains(e.target)&&this.listShow){
        this.$bus.$emit('closeList')
      }
    },
    // 返回顶部
    goTop(){
      window.scrollTo(0,0)
    },
    // 禁用主页面滚动
    stopScroll(e){
      if(!this.scroll){
        e.preventDefault()
      }
    },
  },
  created(){
    this.getFirstToplistId()
    this.$bus.$on('forbidScroll',(data) => {
      this.scroll = data
    })
  },
  mounted(){
    this.$refs.app.addEventListener('wheel',this.stopScroll,{ passive: false })
  },
  beforeDestroy(){
    this.$refs.app.removeEventListener('wheel',this.stopScroll)
    this.$bus.$off('forbidScroll')
  },
  watch: {
    '$route.fullPath': {
      immediate: true,
      handler(newVal){
        if(newVal === '/found/toplist'){
          this.getFirstToplistId()
        }
        if(newVal.indexOf('/my')!==-1){
          this.footerShow = false
        }else{
          this.footerShow = true
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
/*html{
  &::-webkit-scrollbar{
    width: 17px!important;
  }
}*/
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
/deep/ .n-rcmd{
  .m-cvrlst{
    margin-top: 20px;
    li{
      float: left;
      display: block;
      width: 140px;
      height: 204px;
      padding: 0 0 30px 42px;
      overflow: hidden;
      line-height: 1.4;
      p{
        width: 100%;
      }
    }
    li.clearPaddLeft{
      padding-left: 0;
    }
    .u-cover{
      position: relative;
      display: block;
      width: 140px;
      height: 140px;
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
      .msk{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-position: 0 0;
      }
      .bottom{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 27px;
        background-position: 0 -537px;
        color: #ccc;
        .icon-play:hover{
          background-position: 0 -60px;
        }
        .icon-headset{
          float: left;
          width: 14px;
          height: 11px;
          background-position: 0 -24px;
          margin: 9px 5px 9px 10px;
        }
        .nb{
          float: left;
          margin: 7px 0 0 0;
        }
      }
      .u-jp{
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .dec{
      margin: 8px 0 3px;
      font-size: 14px;
      a:hover{
        text-decoration: underline;
      }
      .tit{
        display: inline-block;
        max-width: 100%;
        vertical-align: middle;
        i{
          position: relative;
          top: -1px;
          margin-right: 3px;
          vertical-align: middle;
        }
        .u-icn{
          margin-top: -1px;
        }
      }
    }
  }
}
</style>

<template>
  <div id="index-banner" class="n-ban" :style="{
    backgroundImage: `url(${banners[showBannerIndex]?.imageUrl}?imageView&blur=40x20)`,
    backgroundSize: '6000px',
    backgroundPosition: 'center center'
  }" @mouseenter="clearTimingSwitch" @mouseleave="timingSwitch">
    <div class="wrap">
      <div class="ban pr">
        <!-- 图片 -->
        <div class="ban-img">
          <!-- 歌单 -->
          <router-link hidefocus="true" :to="`/found/playlist?id=${banners[showBannerIndex]?.targetId}`" v-if="banners[showBannerIndex]?.targetType === 1000">
            <img :src="banners[showBannerIndex]?.imageUrl + '?imageView&quality=89'" alt="" />
          </router-link>
          <!-- 单曲 -->
          <router-link hidefocus="true" :to="`/found/song?id=${banners[showBannerIndex]?.targetId}`" v-else-if="banners[showBannerIndex]?.targetType === 1">
            <img :src="banners[showBannerIndex]?.imageUrl + '?imageView&quality=89'" alt="" />
          </router-link>
          <!-- 数字专辑 -->
          <a :href="banners[showBannerIndex]?.url" hidefocus="true" target="_blank" v-else>
            <img :src="banners[showBannerIndex]?.imageUrl + '?imageView&quality=89'" alt="" />
          </a>
        </div>
        <!-- 上一张、下一张 -->
        <a hidefocus="true" href="javascript:;" class="btnl" @click="lastPage">上一张</a>
        <a hidefocus="true" href="javascript:;" class="btnr" @click="nextPage">下一张</a>
        <!-- nav小圆点 -->
        <div class="dots clearfix">
          <a hidefocus="true" href="javascript:;" :class="'pg ' + (index === showBannerIndex ? 'z-slt' : '')" v-for="(_,index) in banners" :key="index" @click="showBannerIndex = index"></a>
        </div>
      </div>
      <div class="download">
        <router-link to="/download" hidefocus="true" class="btn">下载客户端</router-link>
        <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
        <span class="shadow"></span>
        <span class="shadowr"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { getBanner } from '@/api/disvocer'
export default {
  name: 'Swiper',
  data(){
    return {
      banners: [], // 轮播图
      showBannerIndex: 0, // 展示第几个轮播图
    }
  },
  methods: {
    // 定时切换下一页
    timingSwitch(){
      this.bannerTimer = setInterval(this.nextPage,3000)
    },
    // 清除定时器
    clearTimingSwitch(){
      clearInterval(this.bannerTimer)
    },
    // 下一页
    nextPage(){
      if(this.showBannerIndex + 1 === this.banners.length){
        this.showBannerIndex = 0
      }else{
        this.showBannerIndex += 1
      }
    },
    // 上一页
    lastPage(){
      if(this.showBannerIndex - 1 < 0){
        this.showBannerIndex = this.banners.length - 1
      }else{
        this.showBannerIndex -= 1
      }
    },
    // 获取轮播图数据
    async getBannerList(){
      try{
        let res = await getBanner()
        if(res.code === 200){
          this.banners = res.banners
        }
      }catch(e){
        throw e
      }
    }
  },
  created(){
    this.getBannerList()
  },
  mounted(){
    this.timingSwitch()
  },
  destroyed(){
    this.clearTimingSwitch()
  }
}
</script>

<style lang="less" scoped>
.n-ban{
  background-color: black;
  .wrap{
    position: relative;
    width: 982px;
    height: 285px;
    margin: 0 auto;
  }
  .ban{
    width: 982px;
    height: 285px;
    z-index: 10;
    .ban-img{
      width: 100%;
      height: 285px;
      overflow: hidden;
      a{
        display: block;
        width: 730px;
        height: 100%;
        overflow: hidden;
      }
      img{
        display: block;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
      }
    }
    .btnl,.btnr{
      display: block;
      position: absolute;
      top: 50%;
      margin-top: -31px;
      width: 37px;
      height: 63px;
      text-indent: -9999px;
    }
    .btnl{
      left: -68px;
      background-position: 0 -360px;
    }
    .btnr{
      right: -68px;
      background-position: 0 -508px;
    }
    .dots{
      position: absolute;
      top: 259px;
      left: 0;
      width: 730px;
      height: 20px;
      text-align: center;
      .pg{
        display: inline-block;
        width: 20px;
        height: 20px;
        background-position: 3px -343px;
      }
      .z-slt{
        background-position: -16px -343px;
      }
    }
  }
  .download{
    position: absolute;
    top: 0;
    right: -1px;
    width: 254px;
    height: 285px;
    z-index: 20;
    .btn{
      display: block;
      width: 215px;
      height: 56px;
      margin: 186px 0 0 19px;
      background-position: 0 9999px;
      text-indent: -9999px;
      &:hover{
        background-position: 0 -290px;
      }
    }
    p{
      margin: 10px auto;
      text-align: center;
      color: #8d8d8d;
    }
    .shadow,.shadowr{
      display: block;
      position: absolute;
      top: 0;
      left: -20px;
      width: 20px;
      height: 285px;
      background-position: -1px 0;
    }
    .shadowr{
      left: auto;
      right: -20px;
      background-position: -20px 0;
    }
  }
}
</style>
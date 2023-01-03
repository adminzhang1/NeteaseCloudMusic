<template>
  <div class="n-rcmd">
    <!-- 标题 -->
    <div class="v-hd2">
      <router-link to="/found/playlist" class="tit f-ff2">热门推荐</router-link>
      <div class="tab">
        <router-link to="/found/playlist?cat=华语" class="s-fc3">华语</router-link>
        <span class="line">|</span>
        <router-link to="/found/playlist?cat=流行" class="s-fc3">流行</router-link>
        <span class="line">|</span>
        <router-link to="/found/playlist?cat=摇滚" class="s-fc3">摇滚</router-link>
        <span class="line">|</span>
        <router-link to="/found/playlist?cat=民谣" class="s-fc3">民谣</router-link>
        <span class="line">|</span>
        <router-link to="/found/playlist?cat=电子" class="s-fc3">电子</router-link>
      </div>
      <span class="more">
        <router-link to="/found/playlist" class="s-fc3">更多</router-link>
        <i class="cor s-bg s-bg-6"></i>
      </span>
    </div>
    <!-- 内容 -->
    <ul class="m-cvrlst clearfix">
      <li v-for="(item,index) in personalizedList" :key="item.id" :class="index % 4 === 0 ? 'clearPaddLeft' : ''">
        <div class="u-cover">
          <img :src="item.picUrl" alt="" />
          <i class="u-jp u-icn2 u-icn2-jp3" v-if="item.type === 0 && item.highQuality"></i>
          <router-link :to="item.type ? `/found/playlist?id=${item.id}` : `/found/dj?id=${item.id}`" :title="item.name" class="msk"></router-link>
          <div class="bottom">
            <a href="javascript:;" title="播放" class="icon-play fr"></a>
            <span class="icon-headset"></span>
            <span class="nb" v-if="!item.type">{{ item.playCount | newPlayCount }}</span>
            <span class="nb" v-else>{{ item.program.adjustedPlayCount | newPlayCount }}</span>
          </div>
        </div>
        <p class="dec">
          <router-link :to="`/found/playlist?id=${item.id}`" :title="item.name" class="tit s-fc0" v-if="item.type === 0">{{ item.name }}</router-link>
          <router-link :to="`/found/dj?id=${item.id}`" :title="item.name" class="tit s-fc0" v-if="item.type === 1">
            <i class="u-icn u-icn-53"></i>
            {{ item.name }}
          </router-link>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { getHotPalylist, getHotDj } from '@/api/disvocer'
export default {
  name: 'Hot',
  filters: {
    newPlayCount(val){
      if(val >= 1000000){
        return parseInt(val/10000) + '万'
      }
      return val
    }
  },
  data(){
    return {
      personalizedList: [], // 热门推荐数据
    }
  },
  methods: {
    // 获取热门推荐数据
    async getHotData(){
      try{
        let playlist = await getHotPalylist()
        let djlist = await getHotDj()
        if(playlist.code === 200 && djlist.code === 200){
          this.personalizedList = [...playlist.result,...djlist.result.splice(0,3)]
        }else{
          throw '获取热门数据失败'
        }
      }catch(e){
        throw e
      }
    }
  },
  created(){
    this.getHotData()
  }
}
</script>

<style lang="less" scoped>
.n-rcmd{
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

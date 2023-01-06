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
          <img :src="item.picUrl + '?param=140y140'" alt="" />
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

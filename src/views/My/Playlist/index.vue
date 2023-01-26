<template>
  <div class="g-mn3 pr">
    <Loading v-if="loading"/>
    <div class="pr" v-if="!loading">
      <!-- 歌单信息 -->
      <div class="j-falg">
        <!-- 头部信息 -->
        <div class="g-wrap">
          <PlaylistInfo :playlist="playlist" />
        </div>
        <!-- 歌曲列表 -->
        <div class="u-title u-title-1 clearfix">
          <h3>
            <span class="f-ff2">歌曲列表</span>
          </h3>
          <span class="sub s-fc3">{{ playlist.trackCount }}首歌</span>
          <div :class="'more s-fc3 '+(playlist.trackCount?'':'f-hide')">播放：<strong class="s-fc6">{{ playlist.playCount }}</strong>次</div>
        </div>
      </div>
      <!-- 歌曲列表 -->
      <div class="j-falg">
        <NotMusic v-if="playlist.trackCount===0" />
        <Table1 :tracks="playlist.tracks" :userid="playlist.userId" :playid="playlist.id" v-else />
      </div>
      <!-- 评论 -->
      <div class="f-mgt40">
        <div v-if="playlist.trackCount!==0">
          <div class="u-title u-title-1">
            <h3>
              <span class="f-ff2">评论</span>
            </h3>
            <span class="sub s-fc3">共{{ playlist.commentCount }}条评论</span>
          </div>
          <!-- 可以写出去写个组件 -->
          <div class="m-cmmt">
            <!-- 个人输入框 -->
            <div>个人输入框</div>
            <!-- 评论 -->
            <div>评论</div>
            <div>步进器</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPlaylistDetail } from '@/api/user'
export default {
  name: 'MyPlaylist',
  data(){
    return {
      loading: false,
      id: 0,
      playlist: {},
    }
  },
  methods: {
    // 获取歌单信息
    async playlisData(id,cookie){
      try{
        this.loading = true
        let res = await getPlaylistDetail(id,cookie)
        if(res.code === 200){
          this.playlist = res.playlist
        }else{
          throw '获取歌单信息失败'
        }
        this.loading = false
      }catch(e){
        throw e
      }
    }
  },
  watch: {
    '$route.query.id': {
      immediate: true,
      handler(val){
        // console.log(val)
        if(val){
          this.id = parseInt(val)
          this.playlisData(val,this.cookie)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>

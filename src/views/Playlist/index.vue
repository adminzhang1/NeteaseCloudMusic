<template>
  <div id="m-playlist" class="g-bd4 clearfix">
    <div class="g-mn4">
      <div class="g-wrap6">
        <!-- 歌单信息 -->
        <Loading v-if="Object.keys(playlist).length===0"/>
        <PlaylistInfo :playlist="playlist" v-else />
        <!-- 歌单 -->
        <div class="n-songtb">
          <div class="u-title u-title-1 clearfix">
            <h3>
              <span class="f-ff2">歌曲列表</span>
            </h3>
            <span class="sub s-fc3">
              {{ playlist.trackCount }}首歌
            </span>
            <div class="more s-fc3">
              播放：
              <strong class="s-fc6">{{ playlist.playCount }}</strong>
              次
            </div>
            <div class="out out-list s-fc3">
              <i class="u-icn u-icn-95 fl"></i>
              <a href="javascript:;" class="des s-fc7">生成外链播放器</a>
            </div>
          </div>
        </div>
        <Loading v-if="!newTracks"/>
        <div class="j-falg" v-else>
          <NotMusic v-if="playlist.trackCount===0" />
          <Table1 :tracks="newTracks" v-else />
          <DowClient />
        </div>
        <!-- 评论 -->
        <div class="n-cmt"></div>
      </div>
    </div>
    <div class="g-sd4">
      <div class="g-wrap7">
        <!-- 喜欢这个歌单的人 -->
        <h3 class="u-hd3">
          <span class="fl">喜欢这个歌单的人</span>
        </h3>
        <ul class="m-piclist clearfix">
          <li v-for="item in playlist.subscribers" :key="item.userId">
            <router-link :to="`/user/home?id=${item.userId}`" :title="item.nickname">
              <img :src="item.avatarUrl+'?param=40y40'" alt="" />
            </router-link>
          </li>
        </ul>
        <!-- 热门歌单 -->
        <h3 class="u-hd3">
          <span class="fl">热门歌单</span>
        </h3>
        <ul class="m-rctlist clearfix">
          <li v-for="item in hotPlayist" :key="item.id">
            <div class="cver u-cover">
              <router-link :to="`/playlist?id=${item.id}`" :title="item.name">
                <img :src="item.coverImgUrl+'?param=50y50'" alt="" />
                <i class="u-jp u-icn2 u-icn2-jp4" v-if="item.highQuality"></i>
              </router-link>
            </div>
            <div class="info">
              <p class="f-thide">
                <router-link :to="`/playlist?id=${item.id}`" :title="item.name" class="f-fs1 s-fc0">{{ item.name }}</router-link>
              </p>
              <p>
                <span class="by s-fc4">by</span>
                <router-link :to="`/user/home?id=${item.creator.userId}`" class="nm f-thide s-fc3">{{ item.creator.nickname }}</router-link>
                <img :src="item.creator.avatarDetail.identityIconUrl" alt="" v-if="item.creator.avatarDetail" />
              </p>
            </div>
          </li>
        </ul>
        <!-- 网易云音乐多端下载 -->
        <Multi />
      </div>
    </div>
  </div>
</template>

<script>
import Multi from '@/components/Multi'
import { getTopListDetail } from '@/api/toplist'
import { getHotPalylist } from '@/api/disvocer'
export default {
  name: 'Playlist',
  components: {Multi},
  data(){
    return {
      playlist: {}, // 歌单信息
      hotPlayist: [], // 热门歌单信息
    }
  },
  computed: {
    newTracks(){
      if(this.playlist.tracks){
        return this.playlist.tracks.slice(0,20)
      }
      return ''
    },
  },
  methods: {
    // 获取歌单详情
    async ToplistDetail(){
      try{
        let res = await getTopListDetail(this.$route.query.id)
        if(res.code === 200){
          this.playlist = res.playlist
        }else{
          throw '获取歌单数据失败'
        }
      }catch(e){
        throw e
      }
    },
    // 获取热门歌单
    async hotPlaylist(){
      try{
        let hotid = await getHotPalylist()
        if(hotid.code === 200){
          let hot = await Promise.all(hotid.result.map(item => getTopListDetail(item.id)))
          if(hot.every(item => item.code === 200)){
            this.hotPlayist = hot.map(ply => ply.playlist)
          }else{
            throw '获取热门歌单数据失败'
          }
        }else{
          throw '获取热们歌单id失败'
        }
      }catch(e){
        throw e
      }
    }
  },
  created(){
    this.ToplistDetail()
    this.hotPlaylist()
  }
}
</script>

<style lang="less" scoped>
.n-songtb{
  margin-top: 27px;
  .u-title-1{
    height: 33px;
    h3{
      font-size: 20px;
      line-height: 28px;
    }
    .sub{
      margin: 9px 0 0 20px;
    }
    .more{
      margin-top: 5px;
    }
    .out{
      margin-top: 5px;
      float: right;
    }
  }
}
.m-piclist{
  margin-left: -13px;
  padding-bottom: 25px;
  li,li img{
    float: left;
    width: 40px;
    height: 40px;
  }
  li{
    display: inline;
    padding: 0 0 13px 13px;
  }
}
.m-rctlist{
  margin-bottom: 25px;
  li{
    float: left;
    width: 200px;
    height: 50px;
    margin-bottom: 15px;
    line-height: 24px;
  }
  .cver,.cver img{
    float: left;
    width: 50px;
    height: 50px;
  }
  .cver{
    margin-right: -60px;
  }
  .info{
    margin-left: 60px;
    line-height: 24px;
    a:hover{
      text-decoration: underline;
    }
    p{
      width: 140px;
      img{
        display: inline-block;
        width: 13px;
        height: 13px;
        vertical-align: middle;
      }
    }
  }
  .by{
    float: left;
  }
  .nm{
    float: left;
    max-width: 106px;
    margin: 0 2px 0 4px;
  }
}
</style>

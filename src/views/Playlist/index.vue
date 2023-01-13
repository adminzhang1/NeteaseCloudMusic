<template>
  <div id="m-playlist" class="g-bd4 clearfix">
    <div class="g-mn4">
      <div class="g-wrap6">
        <!-- 歌单信息 -->
        <div class="m-info clearfix">
          <div class="cover u-cover u-cover-dj">
            <img :src="playlist.coverImgUrl + '?param=200y200'" alt="" />
            <i class="u-jp u-icn2 u-icn2-jp2" v-if="playlist.highQuality"></i>
            <span class="msk"></span>
          </div>
          <div class="cnt">
            <div class="cntc">
              <!-- 标题 -->
              <div class="hd clearfix">
                <i class="fl u-icn2 u-icn2-jp1" v-if="playlist.highQuality"></i>
                <i class="u-icn u-icn-13 fl pr" v-else></i>
                <div :class="'tit '+(playlist.highQuality?'tit3':'')">
                  <h2 class="f-ff2 f-brk">{{ playlist.name }}</h2>
                </div>
              </div>
              <!-- 用户 -->
              <div class="user clearfix">
                <router-link :to="`/user/home?id=${playlist?.creator?.userId}`" class="face">
                  <img :src="playlist?.creator?.avatarUrl + '?param=40y40'" alt="" />
                </router-link>
                <span class="name">
                  <router-link :to="`/user/home?id=${playlist?.creator?.userId}`" class="s-fc7">{{ playlist?.creator?.nickname }}</router-link>
                </span>
                <img :src="playlist?.creator?.avatarDetail?.identityIconUrl" alt="" v-if="playlist?.creator?.avatarDetail" />
                <span class="time s-fc4">{{ playlist.createTime | crteTime }} 创建</span>
              </div>
              <!-- 按钮 -->
              <div class="btns clearfix">
                <a href="javascript:;" class="u-btn2 u-btn2-2 u-btni-addply fl" title="播放">
                  <i>
                    <em class="ply"></em>
                    播放
                  </i>
                </a>
                <a href="javascript:;" class="u-btni u-btni-add" title="添加到播放列表"></a>
                <a href="javascript:;" class="u-btni u-btni-fav">
                  <i>({{ playlist.subscribedCount | subCount }})</i>
                </a>
                <a href="javascript:;" class="u-btni u-btni-share">
                  <i>({{ playlist.shareCount }})</i>
                </a>
                <a href="javascript:;" class="u-btni u-btni-dl">
                  <i>下载</i>
                </a>
                <a href="javascript:;" class="u-btni u-btni-cmmt">
                  <i>({{ playlist.commentCount }})</i>
                </a>
              </div>
              <!-- 标签 -->
              <div class="tags clearfix">
                <b>标签：</b>
                <router-link :to="`/found/playlist/?cat=${item}&order=hot`" class="u-tag" v-for="item in playlist.tags">
                  <i>{{ item }}</i>
                </router-link>
              </div>
              <!-- 介绍 -->
              <p class="intr f-brk">
                <b>介绍：</b>
                <template v-for="item in intr">
                  {{ item }}
                  <br />
                </template>
              </p>
            </div>
          </div>
        </div>
        <!-- 歌单 -->
        <songtb :trackCount="playlist.trackCount" :tracks="playlist.tracks" :playCount="playlist.playCount" />
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
import songtb from '@/components/Songtb'
import Multi from '@/components/Multi'
import { getTopListDetail } from '@/api/toplist'
import { getHotPalylist } from '@/api/disvocer'
export default {
  name: 'Playlist',
  components: {
    songtb,Multi
  },
  filters: {
    crteTime(val){
      let y = new Date(val).getFullYear()
      let m = new Date(val).getMonth()+1
      let d = new Date(val).getDate()
      return `${y}-${m}-${d}`
    },
    subCount(val){
      if(val > 10000){
        return parseInt(val/10000) + '万'
      }
      return val
    }
  },
  computed: {
    intr(){
      // 2513714981
      if(this.playlist.description){
        // console.log(this.playlist.description.length)
        return this.playlist.description.split('\n')
      }else{
        return ' '
      }
    },
  },
  data(){
    return {
      playlist: {}, // 歌单信息
      hotPlayist: [], // 热门歌单信息
    }
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

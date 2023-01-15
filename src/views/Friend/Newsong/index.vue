<template>
  <div class="g-bd clearfix">
    <div class="g-mn6">
      <div class="g-wrap8">
        <!-- 标题 -->
        <div class="m-timeline-title u-title clearfix">
          <h3>
            <span class="f-ff2">新歌发布</span>
            <span class="f-ff2 f-fs1 s-fc4" style="margin-left: 10px;">近三个月上线的新歌</span>
          </h3>
          <div class="u-btni u-btni-playall playall">
            <i>播放全部</i>
          </div>
        </div>
        <!-- 内容 -->
        <div class="m-timeline m-newsonglist">
          <ul class="m-dlist">
            <li v-for="item in newSongs" :key="item.albumId" class="item">
              <div class="gface">
                <a href="javascript:;" class="ficon">
                  <img :src="item.blockTitle.imgUrl+'?param=45y45'" alt="" />
                </a>
              </div>
              <div class="gcnt">
                <div class="type pr f-fs1">
                  <router-link :to="`/artist?id=${item.blockTitle.artistId}`" class="s-fc7">{{ item.blockTitle.artistName }}</router-link>
                  <span class="sep s-fc3">{{ item.blockTitle.publishTime | time }}上线新歌</span>
                  <div class="arrow u-dicn u-dicn-2" title="新歌管理"></div>
                </div>
                <div>
                  <ul>
                    <div class="src src-alb cover-ply clearfix" v-if="item.blockType === 'album'">
                      <div class="cover cover-alb u-dicn u-dicn-23">
                        <span class="lnk">
                          <img :src="item.blockTitle.resourcePicUrl+'?param=40y40&quality=100'" alt="" />
                          <span class="ply u-dicn u-dicn-8"></span>
                        </span>
                      </div>
                      <div class="scnt">
                        <h3 class="tit f-thide f-fc1 f-fs1">
                          <span class="tag u-dtag">
                            专辑
                            <i class="rt"></i>
                          </span>
                          <router-link :to="`/album?id=${item.albumId}`">{{ item.blockTitle.resourceName }}</router-link>
                        </h3>
                        <h4 class="from f-thide f-fc3">
                          <span :title="item.blockTitle.artistName">
                            <router-link :to="`/artist?id=${item.blockTitle.artistId}`">{{ item.blockTitle.artistName }}</router-link>
                          </span>
                        </h4>
                      </div>
                    </div>
                    <li
                      :class="'src clearfix '+(
                        item.blockType === 'album'
                        ?'src-song'
                        :item.blockType === 'song'&&index === 0
                          ?'src-firstsong'
                          :'src-nextsong'
                      )"
                      v-for="(song,index) in (
                        albumIsShow.filter(al => al.id === item.albumId).length === 0
                        ?item.songLists
                        :albumIsShow.filter(al => al.id === item.albumId)[0].isShow
                          ?item.songLists.slice(0,3)
                          :item.songLists
                      )"
                      :key="song.id"
                      >
                      <div class="cover cover-ply" v-if="item.blockType === 'song'">
                        <span class="lnk">
                          <img :src="song.al.picUrl+'?param=40y40&quality=100'" alt="" />
                        </span>
                        <a href="javsscript:;" class="ply u-dicn u-dicn-8"></a>
                      </div>
                      <div class="rightbox" v-if="item.blockType === 'album'">
                        {{ index+1 }}
                        <span class="playicon"></span>
                      </div>
                      <div class="scnt">
                        <h3 class="tit f-thide f-fs1">
                          <router-link :to="`/song?id=${song.id}`">{{ song.name }}</router-link>
                          <router-link :to="`/mv?id=${song.mv}`" class="mv" v-if="song.mv"></router-link>
                        </h3>
                        <h4 class="from f-thide f-fc3">
                          <template v-for="(a,i) in song.ar">
                            <router-link :to="`/artist?id=${a.id}`" :title="a.name">{{ a.name }}</router-link>{{song.ar.length-1 === i?'':'/'}}</template>
                        </h4>
                      </div>
                    </li>
                    <a href="javascript:;" class="m-newsong-foldbar f-ff1" @click="showAllSong(item.albumId)" v-if="item.blockType === 'album' && albumIsShow.filter(al => al.id === item.albumId)[0].isShow">展开剩余{{ item.songLists.length-3 }}首</a>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewArtistSong } from '@/api/friend'
import { mapState } from 'vuex'
export default {
  name: 'Newsong',
  computed: {
    ...mapState('user',['cookie']),
  },
  filters: {
    time(val){
      let m = new Date(val).getMonth()+1
      let d = new Date(val).getDate()
      return `${m}月${d}日`
    }
  },
  data(){
    return {
      newSongs: [],
      albumIsShow: [],
    }
  },
  methods: {
    // 获取新歌数据
    async newSongData(){
      try{
        let res = await getNewArtistSong(this.cookie)
        if(res.code === 200){
          this.newSongs = res.data.newWorks
          let arr = []
          res.data.newWorks.forEach(item => {
            if(item.blockType === 'album'){
              arr.push({
                id: item.albumId,
                isShow: item.songLists.length>3?true:false
              })
            }
          })
          this.albumIsShow = arr
        }else{
          throw '获取新歌发布数据失败'
        }
      }catch(e){
        throw e
      }
    },
    showAllSong(id){
      this.albumIsShow = this.albumIsShow.map(item => {
        if(item.id === id){
          item.isShow = false
        }
        return item
      })
    }
  },
  created(){
    this.newSongData()
  }
}
</script>

<style lang="less" scoped>
.m-timeline-title{
  .playall{
    float: right;
  }
}
.m-timeline{
  position: relative;
  zoom: 1;
  text-shadow: none;
  .head,.head h2,.itm{
    border-color: #e8e8e9;
  }
  h3{
    margin-top: -2px;
  }
}
.m-newsonglist{
  .m-dlist{
    .item{
      border-bottom: none;
    }
    .src{
      .cover:hover .ply,.cover-ply .ply{
        display: block;
        z-index: 200;
      }
      &.src-firstsong{
        margin-bottom: 0;
      }
      &.src-nextsong{
        margin: 0;
        height: 40px;
        &::after{
          content: '';
          position: absolute;
          top: 0;
          right: 10px;
          left: 10px;
          height: 1px;
          background: rgba(0, 0, 0, 0.06);
          visibility: visible;
        }
      }
      &.src-alb{
        margin-bottom: 0px;
        height: 40px;
        &::after{
          content: '';
          height: 1px;
          position: absolute;
          bottom: 0;
          right: 10px;
          left: 10px;
          height: 1px;
          background: rgba(0, 0, 0, 0.06);
          visibility: visible;
        }
      }
      &.src-song{
        box-sizing: border-box;
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        margin: 0;
      }
    }
    .rightbox{
      height: 50px;
      line-height: 50px;
      .playicon{
        display: inline-block;
        width: 17px;
        height: 17px;
        margin-top: 16px;
        margin-left: 10px;
        vertical-align: top;
        background: url('@/assets/icons/table.png') no-repeat 0 9999px;
        background-position: 0 -128px;
        cursor: pointer;
      }
    }
    .mv{
      display: inline-block;
      width: 23px;
      height: 17px;
      margin-top: 2px;
      margin-left: 2px;
      overflow: hidden;
      text-indent: -999px;
      cursor: pointer;
      background: url('@/assets/icons/table.png') no-repeat 0 9999px;
      background-position: 0 -151px;
      vertical-align: top;
    }
    .m-newsong-foldbar{
      position: relative;
      display: block;
      color: #507daf;
      background: #f5f5f5;
      border: 1px solid #f5f5f5;
      padding: 10px;
      text-align: left;
      letter-spacing: 1px;
      &::after{
        content: '';
        position: absolute;
        top: 0;
        right: 10px;
        left: 10px;
        height: 1px;
        background: rgba(0, 0, 0, 0.06);
        visibility: visible;
      }
    }
  }
}
</style>

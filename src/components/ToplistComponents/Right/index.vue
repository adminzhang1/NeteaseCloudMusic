<template>
  <div class="g-mn3">
    <div class="g-wrap">
      <div class="m-info clearfix">
        <div class="cover u-cover u-cover-rank">
          <img :src="ListDetail.coverImgUrl + '?param=150y150'" alt="" />
          <span class="msk"></span>
        </div>
        <div class="cnt">
          <div class="cntc m-info">
            <div class="hd clearfix">
              <h2 class="f-ff2">{{ ListDetail.name }}</h2>
            </div>
            <div class="user clearfix">
              <i class="u-icn u-icn-57"></i>
              <span class="sep s-fc3">最近更新：{{ ListDetail.updateTime | updateTime }}</span>
              <span class="s-fc4"> ({{ update }})</span>
            </div>
            <div class="btns clearfix">
              <Disable v-if="ListDetail.trackCount===0||newTracks.length===0" />
              <CountBtns :subCount="ListDetail.subscribedCount" :shaCount="ListDetail.shareCount" :commCount="ListDetail.commentCount" :fav="false" :format="false" v-else />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="g-wrap12">
      <div class="u-title clearfix">
        <h3>
          <span class="f-ff2">歌曲列表</span>
        </h3>
        <span class="sub s-fc3">
          <span>{{ ListDetail.trackCount }}</span>首歌
        </span>
        <div class="more s-fc3">
          播放：<strong class="s-fc6">{{ ListDetail.playCount }}</strong>次
        </div>
      </div>
      <!-- 歌曲列表 -->
      <div id="song-list-pre-cache">
        <div class="j-flag">
          <!-- <table class="m-table m-table-rank">
            <thead>
              <tr>
                <th class="first w1"></th>
                <th>
                  <div class="wp">标题</div>
                </th>
                <th class="w2-1">
                  <div class="wp">时长</div>
                </th>
                <th class="w3-1">
                  <div class="wp">歌手</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr :class="index % 2 === 0 ? 'even' : ''" v-for="(item,index) in tracks" :key="item.id">
                <!- 顺序 ->
                <td>
                  <div class="hd">
                    <span class="num">{{ index + 1 }}</span>
                    <div class="rk">
                      <span :class="
                        'u-icn ' + (
                          ListDetail.trackIds[index].lr === undefined
                          ? 'u-icn-75'
                          : ListDetail.trackIds[index].lr - index < 0
                            ? 'ico u-icn-74 s-fc10'
                            : ListDetail.trackIds[index].lr - index > 0
                              ? 'ico u-icn-73 s-fc9'
                              : ListDetail.trackIds[index].lr - index === 0
                                ? 'ico u-icn-72 s-fc4'
                                : ''
                        )
                      ">
                        {{ ListDetail.trackIds[index].lr === undefined ? '' : Math.abs(ListDetail.trackIds[index].lr - index) }}
                      </span>
                    </div>
                  </div>
                </td>
                <!- 标题 ->
                <td :class="index < 3 ? 'rank' : ''">
                  <div class="clearfix">
                    <div class="tt">
                      <router-link :to="`/song?id=${item.id}`" v-if="index < 3">
                        <img :src="item.al.picUrl + '?param=50y50&quality=100'" alt="" class="rpic" />
                      </router-link>
                      <span class="ply"></span>
                      <div class="ttc">
                        <span class="txt">
                          <router-link :to="`/song?id=${item.id}`">
                            <b :title="item.name + (item.tns ? '-' + item.tns.join('') : '')">
                              {{ item.name }}
                            </b>
                          </router-link>
                          <span v-if="item.tns" class="s-fc8" :title="item.tns.join('')"> - ({{ item.tns.join('') }})</span>
                          <span class="mv" title="播放mv" v-if="item.mv"></span>
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <!- 时长 ->
                <td class="s-fc3">
                  <span class="u-dur">{{ item.dt | duration }}</span>
                  <div class="opt hshow">
                    <a href="javascript:;" title="添加到播放列表" class="u-icn u-icn-81"></a>
                    <a href="javascript:;" title="收藏" class="icn icn-fav"></a>
                    <a href="javascript:;" title="分享" class="icn icn-share"></a>
                    <a href="javascript:;" title="下载" class="icn icn-dl"></a>
                  </div>
                </td>
                <!- 歌手 ->
                <td>
                  <div class="text" :title="item.ar.map(i => i.name).join('/')">
                    <span :title="item.ar.map(i => i.name).join('/')">
                      <router-link :to="`/artist?id=${ar.id}`" v-for="(ar,i) in item.ar" :key="ar.id" hidefocus="true">{{ ar.name + (i === item.ar.length - 1 ? '' : '/') }}</router-link>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table> -->
          <Table2 :tracks="newTracks" :ListDetail="ListDetail" :userid="ListDetail.userId" v-if="ListDetail.trackCount!==0&&Object.keys(ListDetail).length !== 0" />
        </div>
      </div>
      <!-- 下载客户端 -->
      <Dowclient v-if="!feature" />
      <!-- 评论 -->
      <div class="n-cmt">
        <div>
          <div class="u-title">
            <h3>
              <span class="f-ff2">评论</span>
            </h3>
            <span class="sub s-fc3">共{{ ListDetail.commentCount }}条评论</span>
          </div>
        </div>
        评论
      </div>
    </div>
  </div>
</template>

<script>
import Dowclient from '@/components/Downloadclient'
import Table2 from '@/components/PlaylistTable/table2.vue'
import { getTopListDetail } from '@/api/toplist'
import { CheckMusic } from '@/api/user'
import { mapState,mapActions } from 'vuex'
export default {
  name: 'toplistRight',
  components: {
    Dowclient,Table2
  },
  computed: {
    ...mapState('toplist',['defaultId','selectId','update','feature']),
    ...mapState('music',['Songlist']),
  },
  filters: {
    updateTime(val){
      if(val){
        let month = new Date(val).getMonth() + 1
        let day = new Date(val).getDate()
        return `${month < 10 ? '0' + month : month}月${day < 10 ? '0' + day : day}日`
      }else{
        return ''
      }
    },
    duration(val){
      val = parseInt(val/1000)
      let minutes = parseInt(val/60)
      let seconds = val - (minutes * 60)
      return `${minutes < 10 ? '0' + minutes :minutes}:${seconds < 10 ? '0' + seconds :seconds}`
    }
  },
  data(){
    return {
      ListDetail: {}, // 榜单内部数据
      newTracks: [], // 歌曲列表
    }
  },
  methods: {
    ...mapActions('music',['playPlaylist','addPlaylist']),
    // 获取歌单内部详情信息
    async toplistDetail(id){
      try{
        let res = await getTopListDetail(id)
        if(res.code === 200){
          this.ListDetail = res.playlist
          if(this.feature){
            // this.newTracks = res.playlist.tracks
            this.check(res.playlist.tracks)
          }else{
            // this.newTracks = res.playlist.tracks.slice(0,10)
            this.check(res.playlist.tracks.slice(0,10))
          }
        }else{
          throw '获取榜单内部数据失败'
        }
      }catch(e){
        throw e
      }
    },
    // 检查歌曲是否可听
    async check(tracks){
      try{
        console.log(1)
        let res = await Promise.all(tracks.map(item => CheckMusic(item.id,this.cookie)))
        this.newTracks = tracks.map((item,index) => {
          this.$set(tracks[index],'listen',res[index])
          return item
        })
      }catch(e){
        throw e
      }
    }
  },
  created(){
    this.toplistDetail(this.selectId)
    this.$bus.$on('playList',()=>{
      let t = this.newTracks.filter(item => item.listen.success).map(item => {
        return {
          songName: item.name,
          songId: item.id,
          playId: this.ListDetail.id,
          ar: item.ar,
          dt: item.dt,
          picUrl: item.al.picUrl
        }
      })
      this.playPlaylist(t)
    })
    this.$bus.$on('addList',()=>{
      let t = this.newTracks.filter(item => item.listen.success).map(item => {
        return {
          songName: item.name,
          songId: item.id,
          playId: this.ListDetail.id,
          ar: item.ar,
          dt: item.dt,
          picUrl: item.al.picUrl
        }
      })
      if(!t.map(item => this.Songlist.some(a => item.songId === a.songId)).every(item => item)){
        this.addPlaylist(t)
      }
    })
  },
  watch: {
    selectId: {
      handler(){
        this.toplistDetail(this.selectId)
      }
    }
  },
}
</script>

<style lang="less" scoped>
.g-mn3{
  height: 100%;
  float: right;
  width: 740px;
  padding-bottom: 50px;
  .m-info{
    .cover{
      float: left;
      position: relative;
      display: inline;
      margin: 0 -220px 0 0;
    }
    .u-cover-rank,.u-cover-rank img{
      width: 150px;
      height: 150px;
    }
    .u-cover-rank{
      padding: 3px;
      border: 1px solid #ccc;
      .msk{
        top: 3px;
        left: 3px;
        width: 150px;
        height: 150px;
        background-position: -230px -380px;
      }
    }
    .cnt{
      float: right;
      width: 100%;
    }
    .cntc{
      margin-left: 187px;
      .hd{
        position: relative;
        line-height: 24px;
        margin: 16px 0 4px;
        h2{
          line-height: 24px;
          font-size: 20px;
          font-weight: normal;
        }
      }
      .user{
        line-height: 35px;
        margin: 0 0 20px;
        .u-icn{
          float: left;
          margin: 9px 0 0 3px;
        }
        .sep{
          margin-left: 5px;
        }
      }
      .btns{
        margin-bottom: 25px;
        margin-right: -10px;
        .u-btni-addply{
          float: left;
          i{
            padding: 0 7px 0 8px;
          }
          &:hover .ply{
            background-position: -28px -1622px;
          }
          .ply{
            float: left;
            width: 20px;
            height: 18px;
            margin: 6px 2px 2px 0;
            background-position: 0 -1622px;
            overflow: hidden;
          }
        }
        .u-btni{
          margin-right: 6px;
          font-family: simsun,\5b8b\4f53;
        }
        .u-btni-add{
          margin-right: 5px;
        }
        .u-btni-fav{
          i{
            background-position: 0 -977px;
          }
          &:hover i{
            background-position: 0 -1063px;
          }
        }
        .u-btni-share{
          &:hover i{
            background-position: 0 -1268px;
          }
          i{
            background-position: 0 -1225px;
          }
        }
        .u-btni-dl{
          &:hover i{
            background-position: 0 -2805px;
          }
          i{
            background-position: 0 -2761px;
          }
        }
        .u-btni-cmmt{
          &:hover i{
            background-position: 0 -1508px;
          }
          i{
            background-position: 0 -1465px;
          }
        }
      }
    }
  }
  .u-title{
    height: 33px;
    border-bottom: 2px solid #c20c0c;
    h3{
      float: left;
      font-size: 20px;
      line-height: 28px;
      font-weight: normal;
    }
    .sub{
      margin: 9px 0 0 20px;
    }
    .more{
      margin-top: 5px;
    }
  }
  .n-cmt{
    margin-top: 40px;
  }
}
</style>

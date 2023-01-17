<template>
  <div class="g-bd clearfix">
    <div class="g-wrap">
      <div class="u-load s-fc4" v-if="loading">
        <i class="icn"></i>加载中...
      </div>
      <template v-if="!loading">
        <UserProifo :id="userid" :userInfo="userinfo" />
        <div class="u-title u-title-1 m-record-title clearfix">
          <h3>
            <span class="f-ff2 s-fc3">听歌排行</span>
          </h3>
          <h4>累积听歌{{ detail.listenSongs }}首</h4>
          <span class="n-iconpoint">
            <a href="javascript:;" class="icon u-icn2 u-icn2-5"></a>
            <div class="tip">
              <p>实际播放时间过短的歌曲将不纳入计算。</p>
              <i class="t"></i>
              <i class="b"></i>
            </div>
          </span>
          <div class="nav clearfix">
            <span :class="listSongType===1?'':'z-sel'" @click="listSongType = 0">所有时间</span>
            <i></i>
            <span :class="listSongType===1?'z-sel':''" @click="listSongType = 1">最近一周</span>
          </div>
        </div>
        <ListenSong :song="song" v-if="ListenSongShow" />
        <!-- 我创建的歌单 -->
        <div class="u-title u-title-1 m-record-title clearfix">
          <h3>
            <span class="f-ff2">我创建的歌单</span>
          </h3>
        </div>
        <UserPlaylist :playlist="playlistMore?userplaylist:userplaylist.slice(0,userinfo.profile?.playlistCount)" />
        <div>{{ userinfo.profile?.playlistCount }}</div>
        <!-- 我的收藏歌单 -->
        <div class="u-title u-title-1 m-record-title clearfix">
          <h3>
            <span class="f-ff2">我收藏的歌单</span>
          </h3>
        </div>
        <ul>1</ul>
      </template>
    </div>
  </div>
</template>

<script>
import UserPlaylist from '@/components/UserPlaylist'
import { getUserDetail,getUserRecord,getUserPlaylist } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'UserHome',
  components: {
    UserPlaylist
  },
  computed: {
    ...mapState('user',['cookie','detail','vipDetail','userPlaylist','playlistMore'])
  },
  data(){
    return {
      loading: false,
      pageSize: 35,
      page: 1,
      userid: 0, // 用户id
      userinfo: {}, // 用户数据
      userplaylist: [], // 用户所有歌单
      listSongType: 1, // 听歌排行展示切换
      song: [],
      ListenSongShow: true,
    }
  },
  methods: {
    // 获取用户数据
    async userDetailData(id){
      try{
        let userDetail = await getUserDetail(id)
        if(userDetail.code === 200){
          this.userinfo = userDetail
        }else{
          throw '获取用户数据失败'
        }
      }catch(e){
        throw e
      }
    },
    // 获取用户听歌数据
    async userRecordData(id,type,cookie){
      try{
        let res = await getUserRecord(id,type,cookie)
        console.log(res)
        if(res.code === 200){
          if(this.type){
            this.song = res.weekData.length===0?[]:res.weekData.slice(0,10)
          }else{
            this.song = res.allData.length===0?[]:res.allData.slice(0,10)
          }
        }else if(res.code === -2){
          this.ListenSongShow = false
        }else{
          throw '获取用户听歌记录失败'
        }
      }catch(e){
        throw e
      }
    },
    // 获取用户所有歌单
    async userPlaylistData(id,cookie,limit,offset){
      try{
        let res = await getUserPlaylist(id,cookie,limit,offset)
        // console.log(res)
      }catch(e){
        throw e
      }
    }
  },
  watch: {
    '$route.query.id': {
      immediate: true,
      handler(val){
        this.loading = true
        this.userid = parseInt(val)
        if(parseInt(val) !== this.detail.profile.userId){
          this.userDetailData(val)
          this.userPlaylistData(val,this.cookie,this.pageSize,(this.page-1)*this.pageSize)
          this.userRecordData(this.userid,val,this.cookie)
        }else{
          this.userinfo = this.detail
          this.userplaylist = this.userPlaylist
        }
        this.loading = false
      }
    },
    listSongType: {
      immediate: true,
      handler(val){
        this.userRecordData(this.userid,val,this.cookie)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.u-title-1{
  height: 33px;
  h3{
    font-size: 20px;
    line-height: 28px;
  }
}
.n-iconpoint{
  position: relative;
  margin-left: 10px;
  left: -1px;
  top: 8px;
  line-height: 18px;
  z-index: 2;
}
.m-record-title{
  position: relative;
  z-index: 2;
  zoom: 1;
  h4{
    float: left;
    display: inline;
    margin-top: 5px;
    margin-left: 10px;
    line-height: 26px;
    font-weight: 400;
    color: #666;
  }
  .nav{
    position: absolute;
    z-index: 1;
    right: 0;
    bottom: 5px;
    span,i{
      float: right;
      margin-left: 8px;
    }
    span{
      line-height: 26px;
      color: #666;
      cursor: pointer;
      &:hover{
        color: #333;
      }
      &.z-sel{
        color: #333;
        font-weight: 700;
      }
    }
    i{
      width: 1px;
      height: 12px;
      margin-top: 7px;
      background-color: #999;
    }
  }
}
</style>

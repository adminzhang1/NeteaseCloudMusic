<template>
  <!-- 已登陆 -->
  <div class="g-mymusic" :style="{height: height+'px'}" v-if="isLogin">
    <div class="g-bd3 p-mymusic clearfix" :style="{minHeight: height+'px'}">
      <!-- 左 -->
      <div class="g-sd3 u-scroll n-musicsd" :style="{height: height+'px'}">
        <div>
          <h2 :class="'usersub '+($route.fullPath==='/my/artist'?'selected':'')">
            <router-link to="/my/artist" class="f-fs1 s-fc0 f-ff1">我的歌手({{ userSubcount.artistCount }})</router-link>
          </h2>
          <h2 :class="'usersub '+($route.fullPath==='/my/mv'?'selected':'')">
            <router-link to="/my/mv" class="f-fs1 s-fc0 f-ff1">我的视频({{ userSubcount.mvCount }})</router-link>
          </h2>
          <h2 :class="'usersub '+($route.fullPath==='/my/radio'?'selected':'')">
            <router-link to="/my/radio" class="f-fs1 s-fc0 f-ff1">我的电台({{ userSubcount.djRadioCount }})</router-link>
          </h2>
          <!-- 创建的歌单 -->
          <div :class="'n-minelst n-minelst-1 '+(cratedShow?'':'n-minelst-hide')">
            <h2 class="f-ff1">
              <a hidefocus="true" href="javascript:;" class="u-btn u-btn-crt fr">
                <i>新建</i>
              </a>
              <span class="rtitle pr" @click="cratedShow = !cratedShow">
                <i class="tri"></i>
                创建的歌单({{ userSubcount.createdPlaylistCount }})
              </span>
            </h2>
            <ul class="clearfix">
              <li v-for="(item,index) in cratedPlaylist" :key="item.id" :class="item.id === parseInt($route.query.id)?'z-selected':''" @click="$router.push(`/my/playlist?id=${item.id}`)">
                <div class="item clearfix">
                  <div class="left">
                    <div class="avatar">
                      <img :src="item.coverImgUrl+'?param=40y40'" alt="" />
                    </div>
                  </div>
                  <p class="name f-thide">
                    <a hidefocus="true" href="javascript:;" class="s-fc0" :title="index!==0?item.name:'我喜欢的音乐'">{{ index!==0?item.name:'我喜欢的音乐' }}</a>
                  </p>
                  <p class="s-fc4 f-thide num">{{ item.trackCount }}首</p>
                </div>
                <span class="oper" v-if="index!==0">
                  <a hidefocus="true" href="javascript:;" title="编辑" class="u-icn u-icn-10"></a>
                  <a hidefocus="true" href="javascript:;" title="删除" class="u-icn u-icn-11"></a>
                </span>
              </li>
            </ul>
          </div>
          <!-- 收藏的歌单 -->
          <div :class="'n-minelst n-minelst-1 '+(startShow?'':'n-minelst-hide')">
            <h2 class="f-ff1">
              <span class="rtitle pr" @click="startShow = !startShow">
                <i class="tri"></i>
                收藏的歌单({{ userSubcount.subPlaylistCount }})
              </span>
            </h2>
            <ul class="clearfix">
              <li v-for="(item,index) in startPlaylist" :key="item.id" :class="item.id === parseInt($route.query.id)?'z-selected':''" @click="$router.push(`/my/playlist?id=${item.id}`)">
                <div class="item clearfix">
                  <div class="left">
                    <div class="avatar">
                      <img :src="item.coverImgUrl+'?param=40y40'" alt="" />
                    </div>
                  </div>
                  <p class="name f-thide">
                    <a hidefocus="true" href="javascript:;" class="s-fc0" :title="item.name">{{ item.name }}</a>
                  </p>
                  <p class="s-fc4 f-thide num">{{ item.trackCount }}首 by {{ item.creator.nickname }}</p>
                </div>
                <span class="oper">
                  <a hidefocus="true" href="javascript:;" title="删除" class="u-icn u-icn-11"></a>
                </span>
              </li>
            </ul>
          </div>
          <div style="height: 100px;"></div>
        </div>
      </div>
      <!-- 右 -->
      <router-view></router-view>
    </div>
  </div>
  <!-- 未登录 -->
  <div class="g-bd" v-else>
    <div class="n-pglg">
      <div class="pic">
        <h2>登录网易云音乐</h2>
        <a hidefocus="true" href="javascript:;" class="btn" @click="open">立即登录</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'My',
  data(){
    return {
      height: 700,
      // heightFun: debounce(this.setHeight,100)
      cratedPlaylist: [],
      cratedShow: true,
      startPlaylist: [],
      startShow: true,
    }
  },
  methods: {
    ...mapMutations('login',['open']),
    setHeight(){
      this.height = window.innerHeight-75
    },
  },
  created(){
    if(this.isLogin){
      this.UserSub(this.cookie)
      let {createdPlaylistCount,subPlaylistCount} = this.userSubcount
      this.UserPlaylist({
        id: this.detail.profile.userId,
        cookie: this.cookie,
        limit: createdPlaylistCount+subPlaylistCount,
        offset: 0
      })
      this.setHeight()
      window.addEventListener('resize',this.setHeight)
      this.cratedPlaylist = this.userPlaylist.slice(0,this.userSubcount.createdPlaylistCount)
      this.startPlaylist = this.userPlaylist.slice(this.userSubcount.createdPlaylistCount)
    }
  },
  watch: {
    '$route.fullPath': {
      immediate: true,
      handler(val){
        if(val === '/my'){
          this.$router.replace(`/my/playlist?id=${this.userPlaylist.filter(item => item.trackCount!==0)[0].id}`)
        }
      }
    }
  },
  beforeDestroy(){
    window.removeEventListener('resize',this.setHeight)
  },
}
</script>

<style lang="less" scoped>
.p-mymusic{
  .g-sd3{
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  /deep/ .u-title-1{
    padding: 0 10px 0 32px;
  }
}
.u-scroll{
  &::-webkit-scrollbar{
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb{
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    box-shadow: inset 1px 1px 0 rgb(0 0 0 / 10%);
    -webkit-box-shadow: inset 1px 1px 0 rgb(0 0 0 / 10%);
  }
  &::-webkit-scrollbar-track{
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgb(0 0 0 / 0%);
    -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 0%);
  }
  &:hover::-webkit-scrollbar-thumb{
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    box-shadow: inset 1px 1px 0 rgb(0 0 0 / 10%);
    -webkit-box-shadow: inset 1px 1px 0 rgb(0 0 0 / 10%);
  }
}
.n-minelst-1{
  margin-top: 8px;
  a:hover{
    text-decoration: none;
  }
  h2{
    padding: 0 10px 12px 15px;
    font-size: 14px;
    color: #000;
  }
  .rtitle{
    cursor: pointer;
  }
  .tri{
    display: inline-block;
    vertical-align: middle;
    margin: 0 2px 0 5px;
    cursor: pointer;
    font-size: 0;
    height: 0;
    line-height: 0;
    border-color: #ccc transparent transparent;
    border-style: solid dashed dashed;
    border-width: 8px 7px 0;
  }
  ul *{
    cursor: pointer;
    vertical-align: middle;
  }
  li{
    position: relative;
    zoom: 1;
    height: 42px;
    padding: 6px 0 6px 20px;
    &:hover{
      background-color: #f4f2f2;
      .oper{
        display: block;
      }
    }
    &.z-selected,&.z-selected:hover{
      background: #e6e6e6;
    }
  }
  .item{
    padding-left: 50px;
  }
  .left{
    display: inline;
    float: left;
    margin-left: -50px;
    overflow: hidden;
    width: 40px;
  }
  .avatar{
    display: block;
    position: relative;
    width: 40px;
    height: 40px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .name{
    width: 150px;
    overflow: hidden;
    margin-top: 2px;
    margin-bottom: 8px;
    a{
      white-space: nowrap;
    }
  }
  .num{
    width: 130px;
  }
  .oper{
    display: none;
    position: absolute;
    bottom: 7px;
    right: 0;
    .u-icn{
      float: left;
      margin-right: 10px;
    }
  }
}
.n-minelst-hide{
  .tri{
    border: 8px solid #ccc;
    border-color: transparent transparent transparent #ccc;
    border-style: dashed dashed dashed solid;
    margin-right: 0;
  }
  ul{
    display: none;
  }
}
.n-musicsd{
  padding-bottom: 50px;
  padding-top: 40px;
  .usersub{
    position: relative;
    height: 36px;
    line-height: 36px;
    a{
      display: block;
      padding: 0 5px 2px 35px;
      &:hover{
        background: #eee;
        text-decoration: none;
      }
    }
    &.selected{
      background: #eee;
    }
  }
}
</style>

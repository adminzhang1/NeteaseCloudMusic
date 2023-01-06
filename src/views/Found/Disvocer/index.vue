<template>
  <div class="disvocer">
    <!-- 轮播图 -->
    <Swiper />
    <!-- 首页内容 -->
    <div class="g-bd1 clearfix">
      <!-- 主要内容 -->
      <div class="g-mn1">
        <div class="g-wrap3">
          <!-- 热门推荐 -->
          <Hot />
          <!-- 个性化推荐(登陆后显示) -->
          <PersonalRec v-if="isLogin"/>
          <!-- 分隔空白空间 -->
          <div class="n-clmnad"></div>
          <!-- 新碟上架 -->
          <New />
          <!-- 榜单 -->
          <Bill />
        </div>
      </div>
      <!-- 侧边栏 -->
      <div class="g-sd1">
        <Profile />
        <!-- 入驻歌手(未找到接口) -->
        <div>1</div>
        <!-- 热门主播(未找到接口) -->
        <div>2</div>
        <button @click="a">点击</button>
        <button @click="b">登出</button>
      </div>
    </div>
  </div>
</template>

<script>
// 引入组件
import Swiper from '@/components/Swiper'
import Hot from '@/components/DisvocerComponents/Hot'
import New from '@/components/DisvocerComponents/New'
import Bill from '@/components/DisvocerComponents/Bill'
import Profile from '@/components/DisvocerComponents/Profile'
import PersonalRec from '@/components/DisvocerComponents/PersonalRec'
import { mapState,mapActions,mapMutations } from 'vuex'
export default {
  name: 'Disvocer',
  components: {
    Swiper,Hot,New,Bill,Profile,PersonalRec
  },
  computed: {
    ...mapState('user',['isLogin'])
  },
  data(){
    return {}
  },
  methods: {
    ...mapActions('user',['UserInfo']),
    ...mapMutations('user',['LogOut']),
    a(){
      this.UserInfo('123')
    },
    b(){
      this.LogOut()
    }
  },
}
</script>

<style lang="less" scoped>
.disvocer{
  .g-mn1{
    float: left;
    width: 729px;
    .g-wrap3{
      padding: 20px 20px 40px;
    }
    .n-clmnad{
      position: relative;
      margin: 0 0 35px;
    }
    /deep/ .v-hd2{
      height: 33px;
      padding: 0 10px 0 34px;
      background-position: -225px -156px;
      border-bottom: 2px solid #c10d0c;
      .tit{
        float: left;
        font-size: 20px;
        font-weight: normal;
        line-height: 28px;
      }
      .tab{
        float: left;
        margin: 7px 0 0 20px;
        a:hover{
          text-decoration: underline;
        }
        .line{
          margin: 0 10px;
          color: #ccc;
        }
      }
      .more{
        float: right;
        margin-top: 9px;
        .cor{
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-left: 4px;
          vertical-align: middle;
        }
      }
    }
    /deep/ .n-rcmd{
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
  }
  .g-sd1{
    float: right;
    width: 250px;
  }
}
</style>

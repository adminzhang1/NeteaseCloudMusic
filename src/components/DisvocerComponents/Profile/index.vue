<template>
  <div class="n-user-profile">
    <div :class="'n-myinfo s-bg ' + (isLogin ? 's-bg-5' : 's-bg-1 n-myinfo-1')">
      <!-- 未登录 -->
      <div class="note s-fc3" v-if="!isLogin">登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</div>
      <a href="javascript:;" class="btn s-bg s-bg-2" v-if="!isLogin">用户登录</a>
      <!-- 登陆后 -->
      <div class="clearfix" v-if="isLogin">
        <router-link :to="`/user/home?id=${detail.userPoint.userId}`" class="head pr">
          <img :src="detail.profile.avatarUrl + '?param=80y80'" alt="" />
        </router-link>
        <div class="info">
          <h4>
            <router-link :to="`/user/home?id=${detail.userPoint.userId}`" class="nm f-fs1 f-thide">{{ detail.profile.nickname }}</router-link>
            <!-- 黑椒vip -->
          </h4>
          <p>
            <router-link to="/user/level" class="u-lv u-icn2 u-icn-lv">
              {{ detail.level }}
              <i class="right u-icn2 u-icn-lvright"></i>
            </router-link>
          </p>
          <div class="btnwrap pr">
            <a href="javascript:;" class="sign u-btn2 u-btn2-2">
              <i>签 到</i>
            </a>
          </div>
        </div>
      </div>
      <ul class="dny s-fc3" v-if="isLogin">
        <li>
          <router-link :to="`/user/event?id=${detail.userPoint.userId}`">
            <strong>{{ detail.profile.eventCount }}</strong>
            <span>动态</span>
          </router-link>
        </li>
        <li class="vertical-split"></li>
        <li>
          <router-link :to="`/user/follows?id=${detail.userPoint.userId}`">
            <strong>{{ detail.profile.follows }}</strong>
            <span>关注</span>
          </router-link>
        </li>
        <li class="vertical-split"></li>
        <li>
          <router-link :to="`/user/fans?id=${detail.userPoint.userId}`">
            <strong>{{ detail.profile.followeds }}</strong>
            <span>粉丝</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Profile',
  computed: {
    ...mapState('user', ['isLogin','detail','vipDetail'])
  },
  data(){
    return {}
  },
  mounted(){
    // console.log(this.vipDetail)
  }
}
</script>

<style lang="less" scoped>
.n-user-profile{
  .n-myinfo{
    height: 165px;
    padding-top: 20px;
    .note{
      width: 205px;
      margin: 0 auto;
      padding: 16px 0;
      line-height: 22px;
    }
    .btn{
      display: block;
      width: 100px;
      height: 31px;
      line-height: 31px;
      text-align: center;
      color: #fff;
      text-shadow: 0 1px 0 #8a060b;
    }
    .head{
      float: left;
      width: 80px;
      height: 80px;
      margin-left: 20px;
      padding: 2px;
      background: #fff;
      border: 1px solid #dadada;
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .info{
      float: left;
      width: 115px;
      margin-left: 18px;
      padding-top: 3px;
      h4{
        height: 20px;
        .nm{
          float: left;
          max-width: 60px;
          vertical-align: middle;
        }
      }
      p{
        width: 100%;
        margin-top: 5px;
        .u-lv{
          display: inline-block;
          height: 17px;
          overflow: hidden;
          padding-left: 25px;
          line-height: 18px;
          color: #999;
          font-weight: bold;
          font-style: italic;
          i{
            float: right;
          }
          &:hover{
            background-position: -130px -84px;
            color: #777;
            .u-icn2-lvright{
              background-position: -192px -84px;
            }
          }
        }
      }
      .btnwrap{
        margin-top: 15px;
        .sign i{
          width: 60px;
        }
      }
    }
    .dny{
      position: relative;
      display: flex;
      justify-content: space-between;
      margin-top: 22px;
      padding: 0 25px;
      li{
        height: 40px;
        a{
          display: block;
          color: #666;
          &:hover{
            color: #0c73c2;
          }
        }
      }
      strong{
        display: block;
        font-size: 20px;
        font-weight: normal;
        white-space: nowrap;
      }
      span{
        margin-left: 2px;
      }
      .vertical-split{
        width: 1px;
        height: 40px;
        background-color: #e4e4e4;
      }
    }
  }
  .n-myinfo-1{
    height: 126px;
    padding-top: 0;
    .btn{
      margin: 0 auto;
    }
  }
}
</style>

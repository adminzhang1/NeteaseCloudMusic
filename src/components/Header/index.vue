<template>
  <div class="header">
    <div class="m-top">
      <div class="wrap clearfix">
        <!-- logo -->
        <h1 class="logo">
          <router-link to="/" hidefocus="true">网易云音乐</router-link>
        </h1>
        <!-- 一级导航 -->
        <ul class="m-nav">
          <li v-for="item in mNavList" :key="item.path">
            <span>
              <router-link :to="item.path" v-if="!item.target" hidefocus="true" :class="selectNav.indexOf(item.path) !== -1 ?  'z-slt' : ''">
                <em>{{ item.title }}</em>
                <sub class="cor"></sub>
              </router-link>
              <a :href="item.path" target="_blank" hidefocus="true" v-else>
                <em>{{ item.title }}</em>
              </a>
            </span>
          </li>
        </ul>
        <!-- 登陆按钮 -->
        <div class="m-tophead">
          <a href="javascript:;" hidefocus="true" class="link s-fc3">登陆</a>
          <!-- 登陆后的头像区域(未写) -->
        </div>
        <!-- 创作者中心 -->
        <a href="javascript:;" hidefocus="true" target="_blank" class="m-topvd pr">创作者中心</a>
        <!-- 搜索 -->
        <Search />
      </div>
    </div>
    <!-- 小红条 -->
    <div :class="'m-subnav m-subnav-up ' + (selectNav.indexOf('/found') === -1 ? '' : 'f-hide')"></div>
    <!-- 二级导航 -->
    <div :class="'m-subnav ' + (selectNav.indexOf('/found') !== -1 ? '' : 'f-hide')">
      <div class="wrap pr">
        <ul class="nav">
          <li v-for="item in navList" :key="item.path">
            <router-link :to="item.path" :class="selectNav === item.path ? 'z-slt' : ''">
              <em>{{ item.title }}</em>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- <router-link to="/download">123</router-link> -->
  </div>
</template>

<script>
import Search from '@/components/TopSearch'
export default {
  name: 'Header',
  components: {
    Search
  },
  data() {
    return {
      mNavList: [
        {
          path: '/found',
          title: '发现音乐',
          target: false,
        },
        {
          path: '/my',
          title: '我的音乐',
          target: false,
        },
        {
          path: '/friend',
          title: '关注',
          target: false,
        },
        {
          path: 'https://music.163.com/store/product',
          title: '商城',
          target: true,
        },
        {
          path: 'https://music.163.com/musician/artist',
          title: '音乐人',
          target: true,
        },
        {
          path: '/download',
          title: '下载客户端',
          target: false,
        },
      ],
      selectNav: this.$route.fullPath,
      navList: [
        {
          path: '/found/discover',
          title: '推荐',
        },
        {
          path: '/found/toplist',
          title: '排行榜',
        },
        {
          path: '/found/playlist',
          title: '歌单',
        },
        {
          path: '/found/djradio',
          title: '主播电台',
        },
        {
          path: '/found/artist',
          title: '歌手',
        },
        {
          path: '/found/album',
          title: '新碟上架',
        },
      ]
    }
  },
  watch: {
    '$route.fullPath': {
      handler(newVal){
        this.selectNav = newVal
      }
    }
  },
}
</script>

<style lang="less" scoped>
.header{
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  .m-top{
    position: relative;
    z-index: 1000;
    height: 70px;
    box-sizing: border-box;
    background: @blackColor;
    border-bottom: 1px solid #000;
    .wrap{
      width: 1100px;
      margin: 0 auto;
      .logo{
        float: left;
        width: 176px;
        height: 69px;
        background-position: 0 0;
        a{
          float: left;
          width: 157px;
          height: 100%;
          padding-right: 20px;
          text-indent: -9999px;
        }
      }
      .m-nav{
        float: left;
        li{
          position: relative;
          background-position: right -300px;
        }
        a{
          padding: 0 19px;
          text-align: center;
          line-height: 70px;
          color: #ccc;
          &.z-slt{
            background: #000;
            text-decoration: none;
            color: #fff;
            .cor{
              display: block;
              position: absolute;
              left: 50%;
              bottom: -1px;
              width: 12px;
              height: 7px;
              transform: translateX(-50%);
              overflow: hidden;
              background-position: -226px 0;
            }
          }
        }
        .cor{
          display: none;
        }
      }
      .m-tophead{
        float: right;
        height: 45px;
        margin: 19px 0 0 20px;
        padding: 0 22px 0 0;
        background-position: right -47px;
        background-image: none;
        .link{
          display: block;
          width: 28px;
          margin-top: 7px;
          color: #787878;
          &:hover{
            text-decoration: underline;
          }
        }
      }
      .m-topvd{
        float: right;
        width: 90px;
        height: 32px;
        margin: 19px 0 0 12px;
        box-sizing: border-box;
        padding-left: 16px;
        border: 1px solid #4f4f4f;
        line-height: 33px;
        color: #ccc;
        border-radius: 20px;
        background: none;
        &:hover{
          color: #fff;
          border: 1px solid #ccc;
        }
      }
    }
  }
  .m-subnav{
    height: 35px;
    box-sizing: border-box;
    background-color: @redColor;
    border-bottom: 1px solid #a40011;
    &.m-subnav-up{
      height: 5px;
      border-bottom: none;
    }
    .wrap{
      width: 1100px;
      height: 34px;
      margin: 0 auto;
      .nav{
        float: left;
        padding-left: 180px;
        a{
          color: #fff;
          &.z-slt em{
            background: #9b0909;
          }
          em{
            display: inline-block;
            height: 20px;
            padding: 0 13px;
            margin: 7px 17px 0;
            border-radius: 20px;
            line-height: 21px;
          }
        }
      }
    }
  }
}
</style>

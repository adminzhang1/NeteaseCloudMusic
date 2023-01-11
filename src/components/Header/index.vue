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
                <i class="dot" v-if="item.path === '/friend'"></i>
              </router-link>
              <a :href="item.path" target="_blank" hidefocus="true" v-else>
                <em>{{ item.title }}</em>
              </a>
            </span>
            <sup class="hot" v-if="item.path === '/download'"></sup>
          </li>
        </ul>
        <!-- 登陆按钮 -->
        <div class="m-tophead pr">
          <a href="javascript:;" hidefocus="true" class="link s-fc3" @click="open" v-if="!isLogin">登陆</a>
          <!-- 登陆后的头像区域 -->
          <div class="head fl pr" v-if="isLogin">
            <img :src="detail.profile.avatarUrl + '?param=30y30'" alt="" />
            <i class="m-topmsg pa">{{ MsgNumber }}</i>
          </div>
          <div class="m-tlist" v-if="isLogin">
            <i class="arr"></i>
            <ul v-for="item in userNav" :key="item.class" :class="'clearfix ' + item.class">
              <li v-for="arr in item.children" :key="arr.href">
                <router-link :to="arr.needId ? (arr.href + `?id=${detail.profile.userId}`) : arr.href" v-if="!arr.newPage && !arr.exit">
                  <i :class="'icn ' + arr.class"></i>
                  <em>{{ arr.title }}</em>
                  <span v-if="arr.msg && MsgNumber !== 0" class="m-topmsg pa">{{ MsgNumber }}</span>
                </router-link>
                <a :href="arr.href" target="_blank" v-if="arr.newPage">
                  <i :class="'icn ' + arr.class"></i>
                  <em>{{ arr.title }}</em>
                </a>
                <a :href="arr.href" v-if="arr.exit" @click="LogOut">
                  <i :class="'icn ' + arr.class"></i>
                  <em>{{ arr.title }}</em>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <!-- 创作者中心 -->
        <a href="javascript:;" hidefocus="true" target="_blank" class="m-topvd pr">创作者中心</a>
        <!-- 搜索 -->
        <Search />
      </div>
    </div>
    <!-- 小红条 -->
    <div :class="'m-subnav m-subnav-up ' + (['/my','/friend','/download'].some(item => selectNav.indexOf(item) !== -1) ? '' : 'f-hide')"></div>
    <!-- 二级导航 -->
    <div :class="'m-subnav ' + (['/my','/friend','/download'].every(item => selectNav.indexOf(item) === -1) ? '' : 'f-hide')">
      <div class="wrap pr">
        <ul class="nav">
          <li v-for="item in navList" :key="item.path">
            <router-link :to="item.path" :class="selectNav.indexOf(item.path) !== -1 ? 'z-slt' : ''">
              <em>{{ item.title }}</em>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/TopSearch'
import { mapState, mapMutations } from 'vuex'
import { getMsgPrivate } from '@/api/disvocer'
export default {
  name: 'Header',
  components: {
    Search
  },
  computed: {
    ...mapState('user', ['isLogin','detail','cookie']),
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
      ], // 一级导航
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
      ], // 二级导航
      MsgNumber: 0, // 私信数量
      userNav: [
        {
          class: 'lb',
          children: [
            {
              href: '/user/home',
              class: 'icn-hm',
              title: '我的主页',
              needId: true,
            },
            {
              href: '/msg/private',
              class: 'icn-msg',
              title: '我的消息',
              msg: true,
            },
            {
              href: '/user/level',
              class: 'icn-lv',
              title: '我的等级',
            },
            {
              href: '/meber',
              class: 'icn-mbr',
              title: 'VIP会员',
            },
          ],
        },
        {
          class: 'ltb',
          children: [
            {
              href: '/user/update',
              class: 'icn-st',
              title: '个人设置',
            },
            {
              href: 'https://music.163.com/login?targetUrl=%2Fst/userbasic/#/nameverify',
              class: 'icn-verify',
              title: '实名认证',
              newPage: true,
            },
          ],
        },
        {
          class: 'lt',
          children: [
            {
              href: 'javascript:;',
              class: 'icn-ex',
              title: '退出',
              exit: true,
            },
          ],
        },
      ], // 用户下拉框
    }
  },
  methods: {
    ...mapMutations('login', ['open']),
    ...mapMutations('user', ['LogOut']),
    // 私信数量
    async privateMsgNumber(){
      if(this.isLogin){
        try{
          let msg = await getMsgPrivate(this.cookie)
          if(msg.code === 200){
            this.MsgNumber = msg.newMsgCount
          }else{
            throw '用户私信数量获取失败'
          }
        }catch(e){
          throw e
        }
      }
    }
  },
  created(){
    this.privateMsgNumber()
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
        .hot{
          display: block;
          position: absolute;
          top: 21px;
          left: 100px;
          width: 28px;
          height: 19px;
          background-position: -190px 0;
        }
        .dot{
          display: block;
          position: absolute;
          top: 24px;
          left: 54px;
          width: 6px;
          height: 6px;
          border-radius: 6px;
          background: #c20c0c;
        }
      }
      .m-tophead{
        float: right;
        height: 45px;
        margin: 19px 0 0 20px;
        padding: 0 22px 0 0;
        background-position: right -47px;
        background-image: none;
        &:hover{
          .head .m-topmsg{
            display: none;
          }
          .m-tlist{
            display: block;
          }
        }
        .link{
          display: block;
          width: 28px;
          margin-top: 7px;
          color: #787878;
          &:hover{
            text-decoration: underline;
          }
        }
        .head{
          margin-top: 1px;
          width: 30px;
          height: 30px;
          img{
            width: 30px;
            height: 30px;
            border-radius: 30px;
          }
          .m-topmsg{
            top: -5px;
            left: 20px;
          }
        }
        .m-tlist{
          display: none;
          position: absolute;
          top: 38px;
          right: -43px;
          width: 158px;
          background: #2b2b2b;
          border: 1px solid #202020;
          box-shadow: 0 8px 24px 0 rgb(0 0 0 / 50%);
          border-radius: 4px;
          .ltb{
            border: 1px solid #232323;
            border-width: 1px 0;
          }
          .arr{
            position: absolute;
            top: -8px;
            left: 50%;
            width: 14px;
            height: 8px;
            background-position: -20px 0;
            margin-left: -8px;
          }
          li,li a{
            float: left;
            box-sizing: border-box;
            width: 100%;
          }
          li{
            a{
              position: relative;
              height: 34px;
              line-height: 34px;
              overflow: hidden;
              padding-left: 24px;
              color: #ccc;
              &:hover{
                background: #353535;
                text-decoration: none;
                color: #fff;
              }
            }
          }
          em{
            float: left;
            width: 100px;
          }
          .m-topmsg{
            top: 7px;
            left: 110px;
          }
          .icn{
            float: left;
            width: 18px;
            height: 18px;
            margin: 7px 10px 0 0;
          }
          .icn-hm{
            background-position: 0 -80px;
          }
          .icn-msg{
            background-position: -20px -120px;
          }
          .icn-lv{
            background-position: 0 -100px;
          }
          .icn-mbr{
            background-position: 0 -221px;
            margin-top: 9px;
          }
          .icn-st{
            background-position: 0 -140px;
          }
          .icn-verify{
            background-position: -20px -142px;
          }
          .icn-ex{
            background-position: 0 -200px;
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

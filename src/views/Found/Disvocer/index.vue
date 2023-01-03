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
          <!-- 个性化(登陆后显示) -->
          <!-- 新碟上架 -->
          <New />
          <!-- 榜单 -->
          <Bill />
        </div>
      </div>
      <!-- 侧边栏 -->
      <div class="g-sd1">
        <Profile />
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
// api

export default {
  name: 'Disvocer',
  components: {
    Swiper,Hot,New,Bill,Profile
  },
  data(){
    return {}
  },
  methods: {
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
  }
  .g-sd1{
    float: right;
    width: 250px;
  }
}
</style>

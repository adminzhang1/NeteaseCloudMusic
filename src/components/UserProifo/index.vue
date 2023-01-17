<template>
  <dl class="m-proifo clearfix">
    <dt class="pr">
      <img :src="userInfo.profile?.avatarUrl+'?param=180y180'" alt="" />
      <div class="btm">
        <router-link :to="`/user/update?id=${id}&sub=ava`" class="upload">更换头像</router-link>
      </div>
    </dt>
    <dd>
      <!-- 名字 -->
      <div class="name clearfix">
        <div class="clearfix">
          <h2 class="wrap fl clearfix">
            <span class="tit f-ff2 s-fc0 f-thide">{{ userInfo.profile?.nickname }}</span>
            <span class="vip-level" :style="{
              backgroundImage: `url(${vipDetail.levelCard.redVipWholeImageUrl}?param=157y60)`
            }" v-if="$route.query.id == detail.profile?.userId"></span>
            <span class="lev u-lev u-icn2 u-icn2-lev">{{ userInfo.level }}<i class="u-icn2 u-icn2-levr"></i></span>
            <i :class="'icn u-icn '+(userInfo.profile?.gender===1?'u-icn-01':'u-icn-01')"></i>
          </h2>
          <div class="edit">
            <router-link :to="`/user/update?id=${id}`" hidefocus="true" class="u-btn2 u-btn2-1">
              <i>编辑个人资料</i>
            </router-link>
          </div>
        </div>
      </div>
      <!-- 关注、动态、粉丝 -->
      <ul class="data s-fc3 clearfix">
        <li class="fst">
          <router-link :to="`/user/event?id=${id}`">
            <strong>{{ userInfo.profile?.eventCount }}</strong>
            <span>动态</span>
          </router-link>
        </li>
        <li>
          <router-link :to="`/user/follows?id=${id}`">
            <strong>{{ userInfo.profile?.follows }}</strong>
            <span>关注</span>
          </router-link>
        </li>
        <li>
          <router-link :to="`/user/fans?id=${id}`">
            <strong>{{ userInfo.profile?.followeds }}</strong>
            <span>粉丝</span>
          </router-link>
        </li>
      </ul>
      <!-- 所在地区和社交网络 -->
      <!-- <div class="inf s-fc3"></div>
      <div class="inf s-fc3 clearfix"></div> -->
    </dd>
  </dl>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyProifo',
  props: {
    id: {
      type: Number,
      requied: true,
    },
    userInfo: {
      type: Object,
      requied: true,
    }
  },
  computed: {
    ...mapState('user',['detail','vipDetail'])
  },
  data(){
    return {}
  },
}
</script>

<style lang="less" scoped>
.m-proifo{
  margin-bottom: 43px;
  dt{
    float: left;
    width: 188px;
    margin-right: 40px;
    .btm,.upload{
      position: absolute;
      left: 4px;
      bottom: 3px;
      display: block;
      width: 180px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      color: #fff;
    }
    img{
      display: block;
      width: 180px;
      height: 180px;
      padding: 3px;
      background: #fff;
      border: 1px solid #d5d5d5;
    }
    .btm{
      display: none;
      background: #8e8e8e;
      opacity: 0.8;
    }
    .upload{
      top: 0;
      left: 0;
    }
    &:hover .btm{
      display: block;
    }
  }
  dd{
    float: left;
    width: 670px;
  }
  .name{
    padding-bottom: 12px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
    .edit{
      float: right;
      margin-top: 4px;
    }
    .wrap{
      padding-bottom: 3px;
    }
    .tit{
      float: left;
      margin-top: 3px;
      font-size: 22px;
      font-weight: normal;
      line-height: 30px;
    }
    .lev{
      float: left;
      margin: 8px 0 0 10px;
    }
    .u-icn-01{
      margin-top: 9px;
    }
    .icn{
      float: left;
      margin: 9px 0 0 8px;
    }
  }
  .data{
    height: 41px;
    margin-bottom: 15px;
    li{
      float: left;
      padding: 0 40px 0 20px;
      border-left: 1px solid #ddd;
    }
    .fst{
      padding-left: 0;
      border-left: none;
    }
    a{
      display: inline-block;
      position: relative;
      zoom: 1;
      color: #666;
      &:hover{
        color: #0c73c2;
        text-decoration: none;
      }
    }
    strong{
      display: block;
      margin-top: -4px;
      font-size: 24px;
      font-weight: normal;
      cursor: pointer;
    }
    span{
      display: block;
      text-indent: 2px;
      cursor: pointer;
    }
  }
  .inf{
    margin-bottom: 5px;
    line-height: 21px;
  }
}
</style>

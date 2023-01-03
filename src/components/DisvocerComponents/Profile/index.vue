<template>
  <div class="n-user-profile">
    <div :class="'n-myinfo s-bg s-bg-1' + (isLogin ? '' : ' n-myinfo-1')">
      <!-- 未登录 -->
      <div class="note s-fc3">登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</div>
      <a href="javascript:;" class="btn s-bg s-bg-2">用户登录</a>
      <!-- 登陆后 -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Profile',
  computed: {
    ...mapState('user', ['isLogin'])
  },
  data(){
    return {}
  },
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

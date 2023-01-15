<template>
  <router-view v-if="isLogin"></router-view>
  <div class="g-bd" v-else>
    <div class="n-pglg2">
      <div class="welc s-fc3 f-fs1">
        你可以关注明星和好友品味他们的私房歌单<br />通过他们的动态发现更多精彩音乐
      </div>
      <a hidefocus="true" href="javascript:;" class="btn" @click="open">立即登录</a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Friend',
  computed: {
    ...mapState('user',['isLogin']),
  },
}
</script>

<style lang="less" scoped>
/deep/ .text{
  a:hover{
    text-decoration: underline;
  }
}
</style>

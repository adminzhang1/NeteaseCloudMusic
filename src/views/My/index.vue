<template>
  <!-- 已登陆 -->
  <div class="g-bd" v-if="isLogin">1</div>
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
import { mapState,mapMutations } from 'vuex'
export default {
  name: 'My',
  computed: {
    ...mapState('user',['isLogin']),
  },
  data(){
    return {}
  },
  methods: {
    ...mapMutations('login',['open']),
  },
  created(){
    // console.log(this.$route.fullPath)
  }
}
</script>

<style lang="less" scoped>

</style>

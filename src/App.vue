<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
    <a href="javascript:;" title="回到顶部" class="m-back f-hide" id="g_backtop">回到顶部</a>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  components: {
    Header,Footer
  }
}
</script>

<style lang="less" scoped>
.m-back{
  display: block;
  position: fixed;
  left: 50%;
  bottom: 160px;
  width: 49px;
  height: 44px;
  text-indent: -9999px;
  margin-left: 500px;
  background-position: -265px -47px;
  &:hover{
    background-position: -325px -47px;
  }
}
</style>

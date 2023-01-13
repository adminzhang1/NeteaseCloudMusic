<template>
  <div class="m-playlist-see-more">
    <div class="text">查看更多内容，请下载客户端</div>
    <router-link to="/download" class="button">立即下载</router-link>
  </div>
</template>

<script>
export default {
  name: 'Dwnclient'
}
</script>

<style lang="less" scoped>
.m-playlist-see-more{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 66px;
  margin-top: 30px;
  margin-bottom: -10px;
  .text{
    font-size: 13px;
    color: #333;
  }
  .button{
    width: 120px;
    height: 30px;
    background-image: linear-gradient(90deg,#ff5a4c 0%,#ff1d12 100%);
    border-radius: 18px;
    line-height: 30px;
    font-size: 12px;
    color: #fff;
    text-align: center;
  }
}
</style>

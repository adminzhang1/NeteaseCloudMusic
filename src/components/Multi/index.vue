<template>
  <div class="m-multi">
    <h3 class="u-hd3">
      <span class="fl">网易云音乐多端下载</span>
    </h3>
    <ul class="bg clearfix">
      <li>
        <a href="https://itunes.apple.com/cn/app/id590338362" target="_blank" hidefocus="true" class="ios"></a>
      </li>
      <li>
        <a href="https://music.163.com/api/pc/download/latest" target="_blank" hidefocus="true" class="pc"></a>
      </li>
      <li>
        <a href="https://music.163.com/api/android/download/latest2" target="_blank" hidefocus="true" class="aos"></a>
      </li>
    </ul>
    <p class="s-fc4">同步歌单，随时畅听320k好音乐</p>
  </div>
</template>

<script>
export default {
  name: 'Multi',
}
</script>

<style lang="less" scoped>
.m-multi{
  margin: 20px 0;
  padding-bottom: 20px;
  .bg{
    height: 65px;
    margin-bottom: 10px;
    background-position: 0 -392px;
    li{
      float: left;
    }
    a{
      display: block;
      width: 42px;
      height: 48px;
    }
    .ios:hover{
      background-position: 0 -472px;
    }
    .pc{
      width: 60px;
      margin: 0 26px 0 30px;
      &:hover{
        background-position: -72px -472px;
      }
    }
    .aos:hover{
      background-position: -158px -472px;
    }
  }
}
</style>

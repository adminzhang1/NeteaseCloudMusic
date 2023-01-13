<template>
  <div class="g-bd">
    <div class="g-wrap">
      <div class="n-for404">
        <i class="u-errlg u-errlg-404"></i>
        <p class="note s-fc3">很抱歉，你要查找的网页找不到</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notpage',
}
</script>

<style lang="less" scoped>
.n-for404{
  padding: 125px 0 0;
  text-align: center;
  .note{
    margin-top: 35px;
    font-size: 18px;
    font-family: "Microsoft Yahei";
  }
}
</style>

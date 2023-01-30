<template>
  <div class="m-wiki">
    <h3 class="u-hd3">
      <span class="fl">用户wiki</span>
    </h3>
    <a href="javascript:;" class="wiki-edit" style="margin-top: -6px;">
      <img class="icon" src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/13138582886/9567/5afa/307c/a6ba8934ef3b36208786e4445e054e04.png" alt="" />
      <span>补充或修改歌曲资料</span>
    </a>
    <a href="javascript:;" class="wiki-edit">
      <img class="icon" src="https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/13138667740/2d69/e968/aac8/79d601b88b5bde7f850f090db9a3f820.png" alt="" />
      <span>用户wiki任务中心</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Wiki',
}
</script>

<style lang="less" scoped>
.m-wiki{
  .wiki-edit{
    display: block;
    margin-left: -4px;
    line-height: 12px;
    margin-top: 5px;
  }
}
</style>

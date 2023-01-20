<template>
  <div class="btns clearfix">
    <a href="javascript:;" hidefocus="true" title="播放" class="u-btn2 u-btn2-2 u-btni-addply f-fl">
      <i><em class="ply"></em>播放</i>
    </a>
    <a href="javascript:;" hidefocus="true" title="添加到播放列表" class="u-btni u-btni-add"></a>
    <a href="javascript:;" hidefocus="true" title="收藏" :class="'u-btni u-btni-fav '+(fav?'':'u-btni-fav-dis')">
      <i>{{ subCount?subCount:'收藏' | formatCount }}</i>
    </a>
    <a href="javascript:;" hidefocus="true" title="分享" class="u-btni u-btni-share">
      <i>{{ shaCount?shaCount:'分享' | formatCount }}</i>
    </a>
    <a href="javascript:;" hidefocus="true" title="下载" class="u-btni u-btni-dl">
      <i>下载</i>
    </a>
    <a href="javascript:;" hidefocus="true" title="评论" class="u-btni u-btni-cmmt">
      <i>{{ commCount?commCount:'评论' | formatCount }}</i>
    </a>
  </div>
</template>

<script>
export default {
  name: 'CountBtns',
  props: {
    fav: {
      type: Boolean,
      required: true,
    },
    subCount: {
      type: Number,
      required: true,
    },
    shaCount: {
      type: Number,
      required: true,
    },
    commCount: {
      type: Number,
      required: true,
    },
  },
}
</script>

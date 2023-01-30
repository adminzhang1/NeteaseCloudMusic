<template>
  <div class="btns clearfix">
    <a href="javascript:;" hidefocus="true" title="播放" class="u-btn2 u-btn2-2 u-btni-addply f-fl" @click="play(songDetail)">
      <i><em class="ply"></em>播放</i>
    </a>
    <a href="javascript:;" hidefocus="true" title="添加到播放列表" class="u-btni u-btni-add"  @click="add(songDetail)"></a>
    <a href="javascript:;" hidefocus="true" title="收藏" class="u-btni u-btni-fav">
      <i>收藏</i>
    </a>
    <a href="javascript:;" hidefocus="true" title="分享" class="u-btni u-btni-share">
      <i>分享</i>
    </a>
    <a href="javascript:;" hidefocus="true" title="下载" class="u-btni u-btni-dl">
      <i>下载</i>
    </a>
    <a href="javascript:;" hidefocus="true" title="评论" class="u-btni u-btni-cmmt">
      <i>{{ commentToal?`(${commentToal})`:'评论' }}</i>
    </a>
  </div>
</template>

<script>
export default {
  name: 'SongBtns',
  props: {
    commentToal: {
      type: Number,
      required: true,
    },
    songDetail: {
      type: Array,
      required: true,
    }
  },
  methods: {
    play(song){
      this.$bus.$emit('songPlay',song)
    },
    add(song){
      this.$bus.$emit('songAdd',song)
    }
  }
}
</script>

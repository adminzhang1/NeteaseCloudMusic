<template>
  <ul class="m-cvrlst clearfix">
    <li v-for="item in playlist">1</li>
  </ul>
</template>

<script>
export default {
  name: 'UserPlaylist',
  props: {
    playlist: {
      type: Array,
      required: true,
    }
  },
  created(){
    console.log(this.playlist)
  }
}
</script>

<style lang="less" scoped>
.m-cvrlst{
  li{
    height: 165px;
    overflow: hidden;
    &:last-child{
      padding-left: 0;
    }
    &:nth-child(6n){
      padding-left: 0;
    }
  }
}
</style>

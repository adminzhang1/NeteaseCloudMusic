<template>
  <div class="opt hshow">
    <a hidefocus="true" href="javascript:;" class="u-icn u-icn-81 icn-add" title="添加到播放列表" @click="addSonglist(song,playId)" v-if="type!==3"></a>
    <a hidefocus="true" href="javascript:;" class="icn icn-fav" title="收藏"  v-if="type!==3"></a>
    <a hidefocus="true" href="javascript:;" class="icn icn-share" title="分享"  v-if="type!==3"></a>
    <a hidefocus="true" href="javascript:;" class="icn icn-dl" title="下载"  v-if="type!==3"></a>
    <a hidefocus="true" href="javascript:;" class="icn icn-del" title="删除" v-if="type === 1 || type === 3"></a>
  </div>
</template>

<script>
import { mapMutations,mapState } from 'vuex'
export default {
  name: 'Opt',
  props: {
    type: {
      type: Number,
      requied: true,
    },
    song: {
      type: Object,
      requied: true,
    },
    playId: {
      type: Number,
      requied: true,
    }
  },
  computed: {
    ...mapState('music',['Songlist'])
  },
  methods: {
    ...mapMutations('music',['setPlaying']),
    addSonglist(song,playId){
      if(this.Songlist.some(item => item.songId === song.id)){
        console.log('已存在')
      }else{
        this.setPlaying([{
          songName: song.name,
          songId: song.id,
          playId,
          ar: song.ar,
          dt: song.dt,
          picUrl: song.al.picUrl
        }])
      }
      this.$bus.$emit('addPlayList','已添加到播放列表')
    }
  },
}
</script>

<style>

</style>
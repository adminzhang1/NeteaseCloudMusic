<template>
  <div class="g-bd4 clearfix">
    <div class="g-mn4">
      <div class="g-wrap6">
        <Loading v-if="Object.keys(songDetail).length===0"/>
        <SongInfo :id="parseInt($route.query.id)" :songDetail="songDetail" :songRic="songRic" :playSong="[{
          songName: songDetail.name,
          songId: songDetail.id,
          ar: songDetail.ar,
          dt: songDetail.dt,
          picUrl: songDetail.al.picUrl
        }]" v-else />
        <!-- 评论 -->
      </div>
    </div>
    <div class="g-sd4">
      <div class="g-wrap7">
        <!-- 包含这首歌的歌单 -->
        <h3 class="u-hd3">
          <span class="fl">包含这首歌的歌单</span>
        </h3>
        <ul class="m-rctlist clearfix">
          <li v-for="item in simiPlaylist" :key="item.id">
            <div class="cver u-cover u-cover-3">
              <router-link :to="`/playlist?id=${item.id}`" :title="item.name">
                <img :src="item.coverImgUrl+'?param=50y50'" alt="" />
              </router-link>
            </div>
            <div class="info">
              <p class="f-thide">
                <router-link :to="`/playlist?id=${item.id}`" :title="item.name" class="sname f-fs1 s-fc0">{{ item.name }}</router-link>
              </p>
              <p>
                <span class="by s-fc4">by </span>
                <router-link :to="`/user/home?id=${item.userId}`" :title="item.creator.nickname" class="nm f-thide s-fc3">{{ item.creator.nickname }}</router-link>
              </p>
            </div>
          </li>
        </ul>
        <!-- 相似歌曲 -->
        <h3 class="u-hd3">
          <span class="fl">相似歌曲</span>
        </h3>
        <ul class="m-sglist clearfix">
          <li v-for="item in simiSong" :key="item.id" class="clearfix">
            <div class="txt">
              <div class="f-thide">
                <router-link :to="`/song?id=${item.id}`" :title="item.name" class="s-fc1">{{ item.name }}</router-link>
              </div>
              <div class="f-thide s-fc4">
                <span :title="item.artists.map(a => a.name).join('/')">
                  <template v-for="(arr,i) in item.artists"><router-link :to="`/artist?id=${arr.id}`" class="s-fc4">{{ arr.name }}</router-link>{{ i===item.artists.length-1?'':'/' }}</template>
                </span>
              </div>
            </div>
            <div class="opr clearfix">
              <a href="javascript:;" class="play" @click="playSong(item)"></a>
              <a href="javascript:;" class="add" @click="addSong(item)"></a>
            </div>
          </li>
        </ul>
        <Multi />
        <Wiki />
      </div>
    </div>
  </div>
</template>

<script>
import { getSongDetail,getSongLyric,getSimiPlaylist,getSimiSong } from '@/api/song'
import { mapMutations,mapState,mapActions } from 'vuex'
export default {
  name: 'Song',
  data(){
    return {
      songDetail: {}, // 歌曲信息
      songRic: {}, // 歌曲歌词
      simiPlaylist: [], // 相似歌单
      simiSong: [], // 相似歌曲
    }
  },
  computed: {
    ...mapState('music',['Songlist'])
  },
  methods: {
    ...mapMutations('music',['setPlaying']),
    ...mapActions('music',['newPlay']),
    // 获取歌曲信息
    async SongData(id){
      try{
        let res = await getSongDetail(id)
        if(res.code === 200){
          this.songDetail = res.songs[0]
        }else{
          throw '获取歌曲信息失败'
        }
      }catch(e){
        throw e
      }
    },
    // 获取歌曲歌词
    async songLyricData(id){
      try{
        let res = await getSongLyric(id)
        if(res.code === 200){
          this.songRic = {
            transUser: res.transUser,
            lyricUser: res.lyricUser,
            lrc: res.lrc?.lyric,
            romalrc: res.romalrc?.lyric,
            klyric: res.klyric?.lyric,
            tlyric: res.tlyric?.lyric,
          }
        }else{
          throw '获取歌词失败'
        }
      }catch(e){
        throw e
      }
    },
    // 获取相似歌单
    async SimiPlaylistData(id){
      try{
        let res = await getSimiPlaylist(id)
        if(res.code === 200){
          this.simiPlaylist = res.playlists
        }else{
          throw '获取相似歌单失败'
        }
      }catch(e){
        throw e
      }
    },
    // 获取相似歌曲
    async SimiSongData(id){
      try{
        let res = await getSimiSong(id)
        if(res.code === 200){
          this.simiSong = res.songs
        }else{
          throw '获取相似歌曲失败'
        }
      }catch(e){
        throw e
      }
    },
    // 直接播放
    playSong(song){
      this.newPlay([{
        songName: song.name,
        songId: song.id,
        ar: song.artists,
        dt: song.duration,
        picUrl: song.album.picUrl
      }])
      this.$bus.$emit('addPlayList','已开始播放')
    },
    // 添加到播放列表
    addSong(song){
      if(!this.Songlist.some(item => item.songId === song.id)){
        this.setPlaying([{
          songName: song.name,
          songId: song.id,
          ar: song.artists,
          dt: song.duration,
          picUrl: song.album.picUrl
        }])
      }
      this.$bus.$emit('addPlayList','已添加到播放列表')
    }
  },
  created(){
    this.SongData(this.$route.query.id)
    this.songLyricData(this.$route.query.id)
    this.SimiPlaylistData(this.$route.query.id)
    this.SimiSongData(this.$route.query.id)
    this.$bus.$on('songPlay',(data)=>{
      this.newPlay(data)
      this.$bus.$emit('addPlayList','已开始播放')
    })
    this.$bus.$on('songAdd',(data)=>{
      if(!this.Songlist.some(item => item.songId === data[0].songId)){
        this.setPlaying(data)
      }
      this.$bus.$emit('addPlayList','已添加到播放列表')
    })
  },
  beforeDestroy(){
    this.$bus.$off('songPlay')
  }
}
</script>

<style lang="less" scoped>

</style>

import { getSongUrl } from '@/api/music'
// 音乐模块
export default {
  namespaced: true,
  state: {
    show: false, // 播放控制台是否显示
    fix: false, // 播放控制台是否固定显示
    listShow: false, // 歌曲列表的显示
    songLoading: true, // 加载歌曲信息
    play: false,
    playingSongId: null, // 正在播放歌曲的id
    Songlist: [], // 歌曲列表
    songIndex: 0, // 正在播放歌曲的index
    songDetail: {}, // 正在播放歌曲的信息
  },
  actions: {
    async handlePlay(context){
      try{
        if(!context.state.play){
          if(context.state.Songlist.length !== 0 && context.state.playingSongId === null){
            // 正在播放没有id，歌曲列表有数据
            context.state.playingSongId = context.state.Songlist[context.state.songIndex].songId
            context.state.songLoading = false
            await context.dispatch('SongUrl',context.state.Songlist[context.state.songIndex].songId)
            context.state.songLoading = true
          }else if(context.state.Songlist.length === 0 && context.state.playingSongId === null){
            context.state.songLoading = false
          }else{
            context.state.songLoading = false
            await context.dispatch('SongUrl',context.state.playingSongId)
            context.state.songLoading = true
          }
        }
        context.commit('playSong')
      }catch(e){
        throw e
      }
    },
    // 下一首
    async nextSong(context){
      if(context.state.Songlist.length===0)return;
      if(context.state.Songlist.length===1){
        await context.dispatch('SongUrl',context.state.Songlist[context.state.songIndex].songId)
      }else{
        if(context.state.songIndex+1===context.state.Songlist.length){
          await context.dispatch('SongUrl',context.state.Songlist[0].songId)
          context.state.playingSongId = context.state.Songlist[0].songId
          context.commit('NxtAndPre',0)
        }else{
          await context.dispatch('SongUrl',context.state.Songlist[context.state.songIndex+1].songId)
          context.state.playingSongId = context.state.Songlist[context.state.songIndex+1].songId
          context.commit('NxtAndPre',context.state.songIndex+1)
        }
      }
    },
    // 上一首
    async preSong(context){
      if(context.state.Songlist.length===0)return;
      if(context.state.Songlist.length===1){
        await context.dispatch('SongUrl',context.state.Songlist[context.state.songIndex].songId)
      }else{
        if(context.state.songIndex-1<0){
          await context.dispatch('SongUrl',context.state.Songlist[context.state.Songlist.length-1].songId)
          context.state.playingSongId = context.state.Songlist[context.state.Songlist.length-1].songId
          context.commit('NxtAndPre',context.state.Songlist.length-1)
        }else{
          await context.dispatch('SongUrl',context.state.Songlist[context.state.songIndex-1].songId)
          context.state.playingSongId = context.state.Songlist[context.state.songIndex-1].songId
          context.commit('NxtAndPre',context.state.songIndex-1)
        }
      }
    },
    // 点击那首播放哪首
    async clickSong(context,songid){
      context.state.songIndex = context.state.Songlist.findIndex(item => item.songId === songid)
      context.state.playingSongId = songid
      await context.dispatch('SongUrl',songid)
      context.state.play = true
    },
    // 单曲点击直接开始播放
    async newPlay(context,val){
      if(context.state.Songlist.some(item => item.songId === val[0].songId)){
        context.state.songIndex = context.state.Songlist.findIndex(item => item.songId === val[0].songId)
        context.state.playingSongId = val[0].songId
      }else{
        context.commit('setPlaying',val)
        context.state.songIndex = context.state.Songlist.length-1
        context.state.playingSongId = val[0].songId
      }
      await context.dispatch('SongUrl',val[0].songId)
      context.state.play = true
    },
    // 添加整个歌单并开始播放
    async playPlaylist(context,val){
      context.state.Songlist = []
      context.commit('setPlaying',val)
      context.state.songIndex = 0
      context.state.playingSongId = val[0].songId
      await context.dispatch('SongUrl',val[0].songId)
      context.state.play = true
    },
    // 添加整个歌曲列表
    async addPlaylist(context,val){
      context.state.Songlist = []
      context.state.playingSongId = null
      context.state.Songlist = []
      context.state.songIndex = 0
      context.state.songDetail = {}
      context.state.play = false
      context.commit('setPlaying',val)
    },
    // 获取歌曲播放url
    async SongUrl(context,id){
      let res = await getSongUrl(id)
      if(res.code === 200){
        context.state.songDetail = res.data[0]
      }else{
        throw '获取歌曲播放url失败'
      }
    },
  },
  mutations: {
    // 展开
    expansion(state){
      state.show = true
    },
    // 隐藏
    conceal(state){
      state.show = false
    },
    // 固定
    lock(state,val){
      state.fix = val
      if(val){
        state.show = val
      }
    },
    // 歌曲列表的显示与隐藏
    handleListShow(state){
      state.listShow = !state.listShow
    },
    // 关闭歌曲列表
    clearList(state){
      state.listShow = false
      if(state.fix)return;
      state.show = false
    },
    // 播放/暂停
    playSong(state){
      state.play = !state.play
    },
    // 上一首/下一首
    NxtAndPre(state,index){
      state.songIndex = index
    },
    // 添加歌曲列表
    setPlaying(state,val){
      // state.Songlist = [...state.Songlist,...val]
      state.Songlist = state.Songlist.concat(val)
    },
    // 清除歌单
    clearPlaylist(state){
      state.playingSongId = null
      state.Songlist = []
      state.songIndex = 0
      state.songDetail = {}
      state.play = false
    }
  },
  getters: {
  },
}
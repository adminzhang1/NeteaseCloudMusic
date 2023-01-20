import { mapState,mapActions } from 'vuex'
import dayjs from 'dayjs'
export const mixin = {
  computed: {
    ...mapState('user',['isLogin','cookie','detail','userSubcount','userPlaylist'])
  },
  methods: {
    ...mapActions('user',['VipDetail','UserSub','UserPlaylist'])
  },
	filters: {
    // 格式化事件 （年-月-日）
    allDay(val){
      if(val){
        return dayjs(parseInt(val)).format('YYYY-MM-DD')
      }else{
        return ''
      }
    },
    // 格式化歌曲时长
    duration(val){
      val = parseInt(val/1000)
      let minutes = parseInt(val/60)
      let seconds = val - (minutes * 60)
      return `${minutes < 10 ? '0' + minutes :minutes}:${seconds < 10 ? '0' + seconds :seconds}`
    },
    // 格式化播放、收藏、转发、点赞数量
    formatCount(val){
      if(typeof val === 'string'){
        return val
      }else{
        if(val>=100000){
          return `(${Math.ceil(val/10000)}万)`
        }
        return `(${val})`
      }
    },
    // 格式化播放数量(带小数点)
    formatMvCount(val){
      if(val>=100000){
        val = (val/10000).toFixed(2)
        let nVal = val.slice(0,val.length-1)
        if(nVal[nVal.length-1]==0){
          return nVal.slice(0,nVal.length-2)+'万'
        }else{
          return nVal+'万'
        }
      }else{
        return val
      }
    }
  },
}
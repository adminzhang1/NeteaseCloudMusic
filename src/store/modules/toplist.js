import { getToplist } from '@/api/toplist'
// 歌单模块
export default {
  namespaced: true,
  state: {
    defaultId: 0,
    selectId: 0,
    toplist: [],
    update: null,
    feature: true
  },
  actions: {
    async getFirstToplistId(context){
      try{
        let res = await getToplist()
        if(res.code === 200){
          context.state.toplist = res.list
          context.commit('setDefault',res.list[0].id)
          context.commit('setUpdate',res.list[0].updateFrequency)
        }else{
          throw '获取歌单数据出错'
        }
      }catch(e){
        throw e
      }
    },
    getNewUpdate(context,val){
      let newUpdate = context.state.toplist.filter(item => item.id === val)
      context.commit('setUpdate',newUpdate[0].updateFrequency)
    },
    getNewFeature(context,val){
      let NewFeature = context.state.toplist.slice(0,4).some(item => item.id === val)
      context.commit('setFeature',NewFeature)
    }
  },
  mutations: {
    setDefault(state,val){
      state.defaultId = val
      state.selectId = val
    },
    setSelect(state,val){
      state.selectId = val
    },
    setUpdate(state,val){
      state.update = val
    },
    setFeature(state,val){
      state.feature = val
    }
  },
  getters: {
  },
}
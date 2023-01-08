import { getToplist } from '@/api/toplist'
// 歌单模块
export default {
  namespaced: true,
  state: {
    defaultId: 19723756,
    selectId: 19723756,
    update: null,
    feature: true
  },
  actions: {
    async getFirstToplistId(context){
      try{
        let res = await getToplist()
        if(res.code === 200){
          context.state.update = res.list[0].updateFrequency
          context.commit('setDefault',res.list[0].id)
        }else{
          throw '获取歌单数据出错'
        }
      }catch(e){
        throw e
      }
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
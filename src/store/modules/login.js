// 登陆模块
export default {
  namespaced: true,
  state: {
    isShow: false,
    mode: 'QR',
    title: '登陆'
  },
  actions: {
  },
  mutations: {
    open(state){
      state.isShow = true
    },
    clear(state){
      state.isShow = false
    }
  },
  getters: {
  },
}
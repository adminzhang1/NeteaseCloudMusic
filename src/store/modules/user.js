import { getUserAccount,getUserDetail,getVipGrowthpoint } from '@/api/login'
// 用户模块
export default {
  namespaced: true,
  state: {
    isLogin: false,
    cookie: '',
    detail: {},
    vipDetail: null,
  },
  actions: {
    // 获取登陆用户信息
    async UserInfo(context,cookie){
      try{
        cookie = process.env.VUE_APP_COOKIE
        let res = await getUserAccount(cookie)
        if(res.code === 200){
          if(res.profile){
            // 获取用户信息
            let userdetail = await getUserDetail(res.profile.userId)
            if(userdetail.code === 200){
              context.state.cookie = cookie
              context.state.detail = userdetail
              window.localStorage.setItem('NeteaseCloudMusic',cookie)
              context.commit('LogIn')
            }else if(userdetail.code === 400){
              throw userdetail.message
            }else{
              throw '获取用户详细信息失败'
            }
            // 获取用户vip信息
            let vipDetail = await getVipGrowthpoint(cookie)
            if(vipDetail.code === 200){
              context.state.vipDetail = vipDetail.data
            }else{
              throw '用户VIP信息获取失败'
            }
          }else{
            throw '获取用户id失败'
          }
        }else{
          throw '不是合法cookie'
        }
      }catch(e){
        throw e
      }
    }
  },
  mutations: {
    LogIn(state){
      state.isLogin = true
    },
    LogOut(state){
      state.isLogin = false
      state.cookie = ''
      state.detail = {}
      state.vipDetail = null
      window.localStorage.removeItem('NeteaseCloudMusic')
    }
  },
  getters: {
  },
}
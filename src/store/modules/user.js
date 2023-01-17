import { getUserAccount,getUserDetail,getVipGrowthpoint } from '@/api/login'
import { getUserSubcount,getUserPlaylist } from '@/api/user'
// 用户模块
export default {
  namespaced: true,
  state: {
    isLogin: false,
    cookie: '',
    detail: {},
    vipDetail: {},
    userSubcount: {},
    userPlaylist: [],
    playlistMore: null,
  },
  actions: {
    // 获取登陆用户信息
    async UserInfo(context,cookie){
      console.log(cookie)
      try{
        cookie = process.env.VUE_APP_COOKIE
        let res = await getUserAccount(cookie)
        if(res.code === 200){
          if(res.profile){
            // 获取用户信息
            let userdetail = await getUserDetail(res.profile.userId)
            if(userdetail.code === 200){
              console.log(userdetail)
              await context.dispatch('VipDetail',cookie)
              await context.dispatch('UserSub',cookie)
              console.log(context.state.userSubcount)
              await context.dispatch('UserPlaylist',{id:res.profile.userId,cookie,limit:35,offset:0})
              // 保存用户信息
              context.state.cookie = cookie
              context.state.detail = userdetail
              window.localStorage.setItem('NeteaseCloudMusic',cookie)
              context.commit('LogIn')
            }else if(userdetail.code === 400){
              throw userdetail.message
            }else{
              throw '获取用户详细信息失败'
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
    },
    // 获取用户vip信息
    async VipDetail(context,cookie){
      let vipDetail = await getVipGrowthpoint(cookie)
      if(vipDetail.code === 200){
        context.state.vipDetail = vipDetail.data
      }else{
        throw '用户VIP信息获取失败'
      }
    },
    // 获取用户歌单，收藏，mv, dj数量
    async UserSub(context,cookie){
      let sub = await getUserSubcount(cookie)
      if(sub.code === 200){
        context.state.userSubcount = sub
      }else{
        throw '获取用户歌单，收藏，mv, dj数量失败'
      }
    },
    // 获取用户所有歌单
    async UserPlaylist(context,{id,cookie,limit,offset}){
      let play = await getUserPlaylist(id,cookie,limit,offset)
      if(play.code === 200){
        context.state.userPlaylist = [...context.state.userPlaylist,...play.playlist]
        context.state.playlistMore = play.more
      }else{
        throw '获取用户所有歌单失败'
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
      state.vipDetail = {}
      state.userSubcount = {}
      state.userPlaylist = []
      state.playlistMore = null
      window.localStorage.removeItem('NeteaseCloudMusic')
    }
  },
  getters: {
  },
}
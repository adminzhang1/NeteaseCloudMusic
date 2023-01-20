import { getUserAccount,getUserDetail,getVipGrowthpoint } from '@/api/login'
import { getUserSubcount,getUserPlaylist,getMvSublist } from '@/api/user'
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
  },
  actions: {
    // 获取登陆用户信息
    async UserInfo(context,cookie){
      // console.log(cookie)
      try{
        cookie = process.env.VUE_APP_COOKIE
        let res = await getUserAccount(cookie)
        if(res.code === 200){
          if(res.profile){
            // 获取用户信息
            let userdetail = await getUserDetail(res.profile.userId)
            if(userdetail.code === 200){
              await context.dispatch('VipDetail',cookie)
              await context.dispatch('UserSub',cookie)
              let {createdPlaylistCount,subPlaylistCount} = context.state.userSubcount
              await context.dispatch('UserPlaylist',{
                id:res.profile.userId,
                cookie,
                limit:createdPlaylistCount+subPlaylistCount,
                offset:0
              })
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
        context.state.userSubcount = {...context.state.userSubcount,...sub}
        await context.dispatch('MvSublist',cookie)
      }else{
        throw '获取用户歌单，收藏，mv, dj数量失败'
      }
    },
    // 获取用户所有歌单
    async UserPlaylist(context,{id,cookie,limit,offset}){
      let play = await getUserPlaylist(id,cookie,limit,offset)
      if(play.code === 200){
        context.state.userPlaylist = play.playlist
      }else{
        throw '获取用户所有歌单失败'
      }
    },
    // 获取用户视频数量
    async MvSublist(context,cookie){
      let mv = await getMvSublist(cookie)
      if(mv.code === 200){
        context.state.userSubcount.mvCount = mv.count
      }else{
        throw '获取用户mv数据失败'
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
      window.localStorage.removeItem('NeteaseCloudMusic')
    }
  },
  getters: {
  },
}
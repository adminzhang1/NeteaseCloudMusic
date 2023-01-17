import http from "@/utils/request";
// 获取用户等级具体信息
export const getUserLevel = (cookie,timestamp = new Date().getTime()) => {
  return http.post(`/user/level?timestamp=${timestamp}`,{
    cookie
  })
}
// 获取用户详细信息
export const getUserDetail = (uid,timestamp = new Date().getTime()) => {
  return http.get('/user/detail',{
    params: {
      uid,
      timestamp
    }
  })
}
// 获取用户听歌排行
export const getUserRecord = (uid,type,cookie,timestamp = new Date().getTime()) => {
  return http.post(`/user/record?timestamp=${timestamp}`,{
    uid,
    type,
    cookie
  })
}
// 获取用户歌单，收藏，mv, dj数量
export const getUserSubcount = (cookie,timestamp = new Date().getTime()) => {
  return http.post(`/user/subcount?timestamp=${timestamp}`,{
    cookie
  })
}
// 获取用户所有歌单
export const getUserPlaylist = (uid,cookie,limit,offset,timestamp = new Date().getTime()) => {
  return http.post(`/user/playlist?timestamp=${timestamp}`,{
    uid,
    cookie,
    limit,
    offset,
  })
}


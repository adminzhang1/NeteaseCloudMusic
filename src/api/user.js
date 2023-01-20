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
// 获取用户视频
export const getMvSublist = (cookie,timestamp = new Date().getTime()) => {
  return http.post(`/mv/sublist?timestamp=${timestamp}`,{
    cookie
  })
}
// 获取歌单信息
export const getPlaylistDetail = (id,cookie,timestamp = new Date().getTime()) => {
  return http.post(`/playlist/detail?timestamp=${timestamp}`,{
    id,
    cookie
  })
}
// 获取用户关注列表
export const getArtistSublist = (cookie,timestamp = new Date().getTime()) => {
  return http.post(`/artist/sublist?timestamp=${timestamp}`,{
    cookie
  })
}
// 获取用户订阅电台
export const getDjSublist = (cookie,timestamp = new Date().getTime()) => {
  return http.post(`/dj/sublist?timestamp=${timestamp}`,{
    cookie
  })
}

import http from "@/utils/request"
// 获取歌单
export const getToplist = (timestamp = new Date().getTime()) => {
  return http.get('/toplist/detail', {
    params: {
      // timestamp
    }
  })
}
export const getTopListDetail = (id,timestamp = new Date().getTime()) => {
  return http.get('/playlist/detail',{
    params: {
      id,
      timestamp
    }
  })
}
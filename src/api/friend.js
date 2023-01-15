import http from "@/utils/request";
// 获取动态
export const getEvent = (cookie,lasttime,pagesize = 10,timestamp = new Date().getTime()) => {
  return http.post(`/event?timestamp=${timestamp}`,{
    cookie,
    lasttime,
    pagesize,
  })
}
// 获取新歌
export const getNewArtistSong = (cookie,timestamp = new Date().getTime()) => {
  return http.post(`/artist/new/song?timestamp=${timestamp}`,{
    cookie,
  })
}
import http from "@/utils/request";
// 获取热门歌手数据
export const getTopArtists = (limit) => {
  return http.get('/top/artists',{
    params: {
      limit
    }
  })
}
// 获取歌手数据
export const getArtistsList = (limit,area,type,initial) => {
  return http.get('/artist/list',{
    params: {
      limit,
      area,
      type,
      initial,
    }
  })
}

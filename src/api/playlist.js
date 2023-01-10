import http from '@/utils/request'
// 获取歌单分类
export const getPlaylistCatlist = (timestamp = new Date().getTime()) => {
  return http.get('/playlist/catlist',{
    params: {
      // timestamp
    }
  })
}
// 获取歌单
export const getTopPlaylist = (cat,order,limit,offset,timestamp = new Date().getTime()) => {
  return http.get('/top/playlist',{
    params: {
      cat,
      order,
      limit,
      offset,
      // timestamp
    }
  })
}
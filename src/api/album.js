import http from '@/utils/request'
// 获取热门新碟数据
export const getAlbumNewest = (timestamp = new Date().getTime()) => {
  return http.get('/album/newest',{
    params: {
      // timestamp
    }
  })
}
// 获取全部新碟数据

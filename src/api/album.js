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
export const getAlbumNew1 = (limit,area,offset,timestamp = new Date().getTime()) => {
  return http.post(`/album/new?timestamp=${timestamp}`,{
    limit,
    area,
    offset,
  })
}
export const getAlbumNew2 = (limit,area,offset,cookie,timestamp = new Date().getTime()) => {
  return http.post(`/album/new?timestamp=${timestamp}`,{
    cookie,
    limit,
    area,
    offset,
  })
}
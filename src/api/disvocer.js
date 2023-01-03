import http from "@/utils/request";
// 轮播图
export const getBanner = (type = 0) => {
  return http.get(`/banner?type=${type}`)
}
// 热门推荐的歌单
export const getHotPalylist = (limit = 5,timestamp = new Date().getTime()) => {
  return http.get('/personalized', {
    params: {
      limit,
      // timestamp
    }
  })
}
// 热门推荐的电台
export const getHotDj = (timestamp = new Date().getTime()) => {
  return http.get('/personalized/djprogram', {
    params: {
      // timestamp
    }
  })
}
// 新碟上架
export const getNewest = (timestamp = new Date().getTime()) => {
  return http.get('/album/newest', {
    params: {
      // timestamp
    }
  })
}
// 榜单
export const getToplist = (timestamp = new Date().getTime()) => {
  return http.get('/toplist/detail', {
    params: {
      // timestamp
    }
  })
}
export const getDetail = (id,timestamp = new Date().getTime()) => {
  return http.get('/playlist/detail',{
    params: {
      id,
      // timestamp
    }
  })
}
// /toplist/detail
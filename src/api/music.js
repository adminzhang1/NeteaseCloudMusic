import http from "@/utils/request";
// 获取歌曲的播放url
export const getSongUrl = (id,timestamp = new Date().getTime()) => {
  return http.get('/song/url',{
    params: {
      id,
      timestamp,
    }
  })
}

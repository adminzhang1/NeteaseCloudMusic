import http from "@/utils/request";
// 获取歌曲信息
export const getSongDetail = (ids,timestamp = new Date().getTime()) => {
  return http.get('/song/detail',{
    params: {
      ids
      // timestamp
    }
  })
}
// 获取歌曲歌词
export const getSongLyric = (id,timestamp = new Date().getTime()) => {
  return http.get('/lyric',{
    params: {
      id,
      // timestamp
    }
  })
}
// 获取相似歌单
export const getSimiPlaylist = (id,timestamp = new Date().getTime()) => {
  return http.get('/simi/playlist',{
    params: {
      id,
      // timestamp,
    }
  })
}
// 获取相似歌曲
export const getSimiSong = (id,timestamp = new Date().getTime()) => {
  return http.get('/simi/song',{
    params: {
      id,
      // timestamp,
    }
  })
}

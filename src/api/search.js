import http from "@/utils/request";
// 搜索推荐
export const getSuggest = (keywords) => {
  return http.get('/search/suggest',{
    params: {
      keywords
    }
  })
}

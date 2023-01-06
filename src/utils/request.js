import axios from 'axios'
const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // timeout: 5000,
  withCredentials: true,
})
// 请求拦截器
http.interceptors.request.use(
  (config) => {
    if(config.method === 'post'){
      // config.headers.Cookie = '123'
      // console.log(config)
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
// 响应拦截器
http.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    return Promise.reject(err)
  }
)
export default http;
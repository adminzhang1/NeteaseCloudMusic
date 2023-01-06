import http from '@/utils/request'
// 二维码的key
export const getQrKey = (timestamp = new Date().getTime()) => {
  return http.get('/login/qr/key',{
    params: {
      timestamp
    }
  })
}
// 二维码图片信息
export const getQrCreate = (key,qrimg = 0,timestamp = new Date().getTime()) => {
  return http.get('/login/qr/create',{
    params: {
      key,
      qrimg,
      timestamp,
    }
  })
}
// 检测二维码状态
export const QrCheck = (key,timestamp = new Date().getTime()) => {
  return http.get('/login/qr/check',{
    params: {
      key,
      timestamp
    }
  })
}
// 获取id信息
export const getUserAccount = (cookie,timestamp = new Date().getTime()) => {
  return http.post(`/user/account?timestamp=${timestamp}`,{
    cookie
  })
}
// 获取用户详细信息
export const getUserDetail = (uid,timestamp = new Date().getTime()) => {
  return http.get('/user/detail',{
    params: {
      uid,
      timestamp
    }
  })
}
// 获取用户vip等级信息
export const getVipGrowthpoint = (cookie,timestamp = new Date().getTime()) => {
  return http.post(`/vip/growthpoint?timestamp=${timestamp}`,{
    cookie
  })
}
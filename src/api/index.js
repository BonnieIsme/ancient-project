import axios from 'axios'
import qs from 'qs'
import { startLoading, endLoading } from '../main'
import { Notification } from 'element-ui'

const server = axios.create({
  baseURL: 'http://124.221.158.23:8090',
  timeout: 5000
})

server.interceptors.request.use(function (config) {
  console.log('请求config：', config);
  startLoading()
  return config
}, err => {
  console.log('请求出错');
 Notification({
    message: '请求出错',
    type: 'error',
  })
  return Promise.reject(err)
})

server.interceptors.response.use(function (res) {
  console.log('请求响应数据拦截前：', res);
  console.log(res.data.msg);
  if (res.data.status != '200') {
    Notification({
      message: res.data.msg,
      type: 'warning'
    })
  } 
  endLoading()
  return res.data
}, err => {
  console.log('响应出错');
  Notification({
    message: '响应出错',
    type: 'error'
  })
  return Promise.reject(err)
})

// 封装 GET 请求
export function get(url, params) {
  return server({
    method: 'GET',
    url,
    params
  })
}

// 封装 POST 请求
export function post(url, data) {
  return server({
    method: 'POST',
    url,
    headers: {
      'Content-Type':'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data),
  })
}

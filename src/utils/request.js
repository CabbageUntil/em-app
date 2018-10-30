import axios from 'axios'
import Qs from 'qs'

import { Message, MessageBox } from 'element-ui'
import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 500000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  if ((typeof config.data) === 'object') {
    console.log(config.data)
    config.data = Qs.stringify(config.data)
    console.log(config.data)
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    //alert('登录系统放回的信息:%o' + response.data)
    if (res.code !== 0) {
      // -1000: 登录失败 -1001: 需要登录
      if (res.code === -1000 || res.code === -1001) {
         Message({
          message: '您的登录信息已过期，请重新登录，系统3秒后自动跳转登录页面。。。',
          type: 'error',
          duration: 3 * 1000
        })
        setTimeout(function(){window.location.href="https://passport.dianchat.net/pass/logout?callback=https://passport.dianchat.net/pass/service_login?callback=http://localhost:8092/login"; },3 * 1000);
       // window.location.href = 'https://passport.dianchat.net/pass/logout?callback=https://passport.dianchat.net/pass/service_login?callback=http://localhost:8092/login'
        // 请自行在引入 MessageBox
       // MessageBox.alert('need login', 'confirm', {
         // confirmButtonText: 'confirm',
         //   callback: action => {
          //    store.dispatch('FedLogOut').then(() => {
          //     location.reload() // 为了重新实例化vue-router对象 避免bug
             //
      //        })
      //     }
   //       })
      } else {
        Message({
          message: res.msg,
          type: 'error',
          duration: 3 * 1000
        })
      }
      return Promise.reject(new Error(res.msg))
    } else {
      return response.data
    }
  },
  error => {
    //console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

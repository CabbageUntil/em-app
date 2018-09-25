import request from '@/utils/request'

export function login (jwtToken) {
  const data = {
    jwtToken
  }
  return request({
    url: '/org/login',
    method: 'post',
    data
  })
}

export function logout () {
  return request({
    url: '/org/logout',
    method: 'post'
  })
}

export function orgLogin (orgId) {
  const data = {
    orgId
  }
  return request({
    url: '/org/loginCom',
    method: 'post',
    data
  })
}

export function orgLogout () {
  return request({
    url: '/org/logoutCom',
    method: 'post'
  })
}

export function getUserInfo () {
  return request({
    url: '/org/getUserInfo',
    method: 'get'
  })
}

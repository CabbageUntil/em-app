import request from '@/utils/request'

export function createGroup (query) {
  return request({
    url: '/org/createGroup',
    method: 'post',
    params: query
  })
}
export function joinGroup (query) {
  return request({
    url: '/org/joinGroup',
    method: 'post',
    params: query
  })
}
export function selectgrouptList () {
  return request({
    url: '/org/selectgrouptList/',
    method: 'get'
  })
}

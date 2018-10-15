import request from '@/utils/request'
//创建小组分组
export function createGroup (query) {
  return request({
    url: '/org/createGroup',
    method: 'post',
    params: query
  })
}
//加入小组分组
export function joinGroup (query) {
  return request({
    url: '/org/joinGroup',
    method: 'post',
    params: query
  })
}
//查询拥有的分组情况
export function selectgrouptList () {
  return request({
    url: '/org/selectgrouptList/',
    method: 'get'
  })
}
//审核成员
export function verifyGroupMember (query) {
  return request({
    url: '/org/verifyGroupMember/',
    method: 'post',
    params: query

  })
}
//移除群组成员
export function deleteGroupMember (query) {
  return request({
    url: '/org/deleteGroupMember/',
    method: 'post',
    params: query

  })
}

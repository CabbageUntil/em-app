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
//不通过审核
export function verifyGroupMember2 (query) {
  return request({
    url: '/org/verifyGroupMember2/',
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
//退出群组
export function leaveGroup (query) {
  return request({
    url: '/org/leaveGroup/',
    method: 'post',
    params: query
  })
}
//解散群组
export function removeGroup (query) {
  return request({
    url: '/org/removegroup/',
    method: 'post',
    params: query
  })
}
//添加组员
export function saveGroupMember (query) {
  return request({
    url: '/org/addGroupMember',
    method: 'post',
    params: query
  })
}
//添加电话通讯录
export function addPhoneList (query) {
  return request({
    url: '/org/addPhoneList',
    method: 'post',
    params: query
  })
}
//检测群成员是否已经存在
export function checkGroupMember (query) {
  return request({
    url: '/org/checkGroupMember',
    method: 'post',
    params: query
  })
}

import request from '@/utils/request'

// 获取成员列表
export function fetchList (query) {
  console.log(query.type)
  return request({
    url: '/org/memberList',
    method: 'get',
    params: query
  })
}

// 获取某位成员的明细部分数据
export function fetchListDetail (memberId) {
  return request({
    url: '/org/memberListDetail',
    method: 'get',
    params: { memberId }
  })
}

// 增加成员
export function addMember (id) {
  return request({
    url: '/org/addMember/' + id,
    method: 'put'
  })
}

// 获取成员明细数据
export function fetchMember (id) {
  return request({
    url: '/org/findDetailMember',
    method: 'get',
    params: { id }
  })
}

export function removeMember (id) {
  return request({
    url: '/org/removeMember/',
    method: 'delete',
    params: { id }
  })
}

export function fetchArchiveGeneral () {
  return request({
    url: '/org/fetchArchiveGeneral',
    method: 'get'
  })
}

export function fetchSpecArchive (orgId) {
  return request({
    url: '/org/fetchSpecArchive',
    method: 'get',
    params: { orgId }
  })
}

export function findMemberById (memberId) {
  return request({
    url: '/org/finMemberByMemberId',
    method: 'get',
    params: { memberId }
  })
}

export function saveMember (form) {
  return request({
    url: '/org/saveMember',
    method: 'post',
    data: form
  })
}

export function fetchCalendar (memberId, start, end) {
  return request({
    url: '/org/fetchCalendar',
    method: 'get',
    params: { memberId: memberId, start: start, end: end }
  })
}
export function memSelectList (deptId) {
  return request({
    url: '/org/memSelectList/',
    method: 'get',
    params: { deptId }
  })
}

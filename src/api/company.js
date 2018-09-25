import request from '@/utils/request'
export function getJoinComCount () {
  return request({
    url: '/org/joinComCount',
    method: 'get'
  })
}
export function fetchJoinComList (query) {
  return request({
    url: '/org/joinComList',
    method: 'get',
    params: query
  })
}
export function getOwnComCount () {
  return request({
    url: '/org/ownComCount',
    method: 'get'
  })
}
export function fetchOwnComList (query) {
  return request({
    url: '/org/ownComList',
    method: 'get',
    params: query
  })
}
export function createCom (archiveForm1, orgForm1) {
  return request({
    url: '/org/createCom',
    method: 'post',
    data: {
      archiveForm: archiveForm1,
      orgForm: JSON.stringify(orgForm1)
    }
  })
}
export function fetchExistComList (query) {
  return request({
    url: '/org/existComList',
    method: 'get',
    params: query
  })
}
export function joinCom (form) {
  return request({
    url: '/org/joinCom',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: JSON.stringify({ ...form })
  })
}
export function exitCom (orgId) {
  return request({
    url: '/org/exitCom',
    method: 'post',
    data: { orgId }
  })
}
export function dissolveCom (orgId) {
  return request({
    url: '/org/dissolveCom',
    method: 'post',
    data: { orgId }
  })
}

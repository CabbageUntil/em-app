import request from '@/utils/request'

export function fetchApartmentList (query) {
  return request({
    url: '/org/apartmentList',
    method: 'get',
    params: query
  })
}
export function removeApartment (id) {
  const  dept_id = id
  return request({
    url: '/org/removeDeptMent/',
    method: 'delete',
    params:{ dept_id }
  })
}
export function addApartment (form) {
  const dept_name = form.deptName
  const parent_id = form.parentId
  return request({
    url: '/org/insertDeptMent/',
    method: 'get',
    params:{ dept_name,parent_id }
  })
}
export function selectdeptList () {
  return request({
    url: '/org/selectdetpList/',
    method: 'get'
  })
}

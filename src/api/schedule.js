import request from '@/utils/request'

export function fetchScheduleList (query) {
  return request({
    url: '/org/scheduleList',
    method: 'get',
    params: query
  })
}
export function removeSchedule (agendaId) {
  return request({
    url: '/org/deleteOrgAgendaByOne/',
    method: 'delete',
    params: { agendaId: agendaId }
  })
}
export function  removeSchedules(agendaId) {
  const agendaIds = agendaId.join("-");
  return request({
    url: '/org/deleteOrgAgendaByOnes/',
    method: 'get',
    params: { agendaIds: agendaIds }
  })
}
export function addSchedule (query) {
  return request({
    url: '/org/addSchedule',
    method: 'get',
    params: query
  })
}
export function editSchedule (query) {
  return request({
    url: '/org/editSchedule',
    method: 'put',
    params: query
  })
}

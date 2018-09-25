import request from '@/utils/request'

export function validateName (query) {
  return request({
    url: '/org/validateRepeatCom',
    method: 'get',
    params: query
  })
}

import Mock from 'mockjs'
import { param2Obj } from '@/utils'
const List = []
const count = 30

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({

    agendaId: '@natural',
    deptName: '@pick(["财务部", "人力资源部", "公司记账部", "策划部", "开发部"])',
    deptId: '@natural',
    orgId: '@natural',
    orgName: '@pick(["佛山参数信息科技", "B科技有限公司"])',
    memberId: '@natural',
    memberName: '@cname',

    note1: '@cparagraph()',
    note2: '@cparagraph()',
    note3: '@cparagraph()',
    createDatetime: '@time("yyyy-MM-dd HH:mm:ss")'
  }))
}
export default {
  /* eslint-disable */
  getList: config => {
    let {sort, page, per_page, deptName, data1, data2} = param2Obj(config.url)
    let mockList = List.filter(item => {
      /* 隐藏已经解散的部门信息 */
      if (item.deptStatus === 0) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < per_page * page && index >= per_page * (page - 1))

    // 计算总记录数
    let totalNum = mockList.length
    // 计算总页数
    let lastPage = Math.ceil(mockList.length / per_page)
    // 计算下一页页码
    let nextPage = (page + 1 > lastPage) ? lastPage : page + 1
    // 计算上一页页码
    let prevPage = (page - 1 <= 0) ? 1 : page - 1
    // 计算开始INDEX
    let fromIndex = (page - 1 <= 0) ? 1 : prevPage * per_page
    // 计算结束INDEX
    let toIndex = page * per_page > totalNum ? totalNum : page * per_page
    // 计算上一页URL
    let prevPageUrl
    if (parseInt(page) === 1) {
      prevPageUrl = null
    } else {
      prevPageUrl = '/org/apartmentList?sort=' + sort + '&page=' + (page - 1) + '&per_page=' + per_page
    }
    // 计算下一页URL
    let nextPageUrl
    if (parseInt(page) === lastPage) {
      nextPageUrl = null
    } else {
      nextPageUrl = '/org/apartmentList?sort=' + sort + '&page=' + (page + 1) + '&per_page=' + per_page
    }
    let result = {
      total: totalNum,
      per_page: parseInt(per_page),
      current_page: parseInt(page),
      last_page: lastPage,
      next_page_url: nextPageUrl,
      prev_page_url: prevPageUrl,
      from: fromIndex,
      to: toIndex,
      data: pageList
    }

    return result
  },
  /* eslint-enable */
  removeSchedule: config => {
    return {
      code: 0,
      msg: 'success'
    }
  },
  /* eslint-disable */
  addSchedule: config => {
    let {page, per_page, sort, note1, departmentName, name, note3, note2, orgName, createDatetime} = param2Obj(config.url)
    List.push(Mock.mock({
      agendaId: '0001201',
      deptName: departmentName,
      deptId: 23252,
      orgId: 10021,
      orgName: orgName,
      memberId: 10001,
      memberName: name,
      note1: note1,
      note2: note2,
      note3: note3,
      createDatetime: createDatetime
    }))
    let mockList = List.filter(item => {
      /* 隐藏已经解散的部门信息 */
      if (item.deptStatus === 0) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < per_page * page && index >= per_page * (page - 1))

    // 计算总记录数
    let totalNum = mockList.length
    // 计算总页数
    let lastPage = Math.ceil(mockList.length / per_page)
    // 计算下一页页码
    let nextPage = (page + 1 > lastPage) ? lastPage : page + 1
    // 计算上一页页码
    let prevPage = (page - 1 <= 0) ? 1 : page - 1
    // 计算开始INDEX
    let fromIndex = (page - 1 <= 0) ? 1 : prevPage * per_page
    // 计算结束INDEX
    let toIndex = page * per_page > totalNum ? totalNum : page * per_page
    // 计算上一页URL
    let prevPageUrl
    if (parseInt(page) === 1) {
      prevPageUrl = null
    } else {
      prevPageUrl = '/org/apartmentList?sort=' + sort + '&page=' + (page - 1) + '&per_page=' + per_page
    }
    // 计算下一页URL
    let nextPageUrl
    if (parseInt(page) === lastPage) {
      nextPageUrl = null
    } else {
      nextPageUrl = '/org/apartmentList?sort=' + sort + '&page=' + (page + 1) + '&per_page=' + per_page
    }
    let result = {
      total: totalNum,
      per_page: parseInt(per_page),
      current_page: parseInt(page),
      last_page: lastPage,
      next_page_url: nextPageUrl,
      prev_page_url: prevPageUrl,
      from: fromIndex,
      to: toIndex,
      data: pageList
    }
    return result
  },
  /* eslint-enable */
  editSchedule: config => {
    return {
      code: 0,
      msg: 'success'
    }
  }
}

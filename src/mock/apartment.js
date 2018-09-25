import Mock from 'mockjs'
import { param2Obj } from '@/utils'
const List = []
const count = 30

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    deptName: '@pick(["财务部", "人力资源部", "公司记账部", "策划部", "开发部"])',
    deptId: '@natural',
    orgId: '@natural',
    parentId: '@natural',
    parentName: '@pick(["财务部", "人力资源部", "公司记账部", "策划部", "开发部"])',
    deptRemoveDatetime: '@time("yyyy-MM-dd HH:mm:ss")',
    deptCreateDatetime: '@time("yyyy-MM-dd HH:mm:ss")',
    deptStatus: '@pick(0,1)'

  }))
}
export default {
  /* eslint-disable */
  getList: config => {
    let {sort, page, per_page, deptName, type} = param2Obj(config.url)
    let mockList = List.filter(item => {
      if (item.deptStatus === parseInt(type)) {
        return true
      } else if (parseInt(type) === 3) {
        return true
      }
      return false
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
  // DELETE方法
  removeApartment: config => {
    const id = parseInt(config.url.match(/\/removeApartment\/(\d+)$/)[1])
    let archive = List.find(item => item.deptId === id)
    archive.deptStatus = 0
    return {
      code: 0,
      msg: 'success'
    }
  }
}

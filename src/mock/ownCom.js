import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 5

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: '@name',
    create_datetime: '@date',
    data: {
      tel: '@tld',
      email: '@email',
      address: '@area'
    }
  }))
}

export default {
  /* eslint-disable */
  getList: config => {
    const { page, per_page, filter } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (filter && item.name.indexOf(filter) < 0) return false
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
      prevPageUrl = '/org/ownComList?sort=' + sort + '&page=' + (page - 1) + '&per_page=' + per_page + // eslint-disable-line
        '&filter=' + filter + '&type=' + type
    }
    // 计算下一页URL
    let nextPageUrl
    if (parseInt(page) === lastPage) {
      nextPageUrl = null
    } else {
      nextPageUrl = '/org/ownComList?sort=' + sort + '&page=' + (page + 1) + '&per_page=' + nextPage + // eslint-disable-line
        '&filter=' + filter + '&type=' + type
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
  dissolveCom: config => {
    const { orgId } = JSON.parse(config.body)
    List.splice(List.findIndex(item => item.id === orgId), 1)

    return {
      code: 0,
      msg: 'success'
    }
  }
}

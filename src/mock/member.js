import Mock from 'mockjs'
import { param2Obj } from '@/utils'

let List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: '@name',
    department: '@pick(["IT", "HR", "A/C", "P/A", "DC"])',
    post: '@pick(["CAO", "CIO", "CWO", "CSO", "PM"])',
    education: '@integer(1, 9)',
    'marital_status|1': true,
    sex: '@integer(0, 1)',
    birthday: '@date',
    id_card_exp: '@date',
    native_place: '@county(true)',
    animal: '@integer(0, 11)',
    emergency_user: '@name',
    emergency_mobile: '@natural',
    applicate_date: '@date("yyyy-MM-dd")',
    entry_date: '@date("yyyy-MM-dd")',
    leave_date: '@date("yyyy-MM-dd")',
    member_status: '@integer(0, 2)',
    detail: {
      'tel|1-3': [
        {
          'id|+1': 100 + i,
          label: '@word(3, 5)',
          content: '@natural'
        }
      ],
      'email|1-3': [
        {
          'id|+1': 200 + i,
          label: '@word(3, 5)',
          content: '@email'
        }
      ],
      'address|1-3': [
        {
          'id|+1': 300 + i,
          label: '@word(3, 5)',
          content: '@county(true)'
        }
      ],
      'other|1-3': [
        {
          'id|+1': 400,
          label: '@word(3, 5)',
          content: '@word'
        }
      ]
    }
  }))
}

let myList = []
const myCount = 3

for (let i = 0; i < myCount; i++) {
  myList.push(Mock.mock({
    id: '@increment',
    source_id: 1000 + i,
    source_name: '@pick(["A", "B", "C"])',
    name: '@name',
    department: '@pick(["IT", "HR", "A/C", "P/A", "DC"])',
    post: '@pick(["CAO", "CIO", "CWO", "CSO", "PM"])',
    education: '@integer(1, 9)',
    'marital_status|1': true,
    sex: '@integer(0, 1)',
    birthday: '@date',
    id_card_exp: '@date',
    native_place: '@county(true)',
    animal: '@integer(0, 11)',
    emergency_user: '@name',
    emergency_mobile: '@natural',
    applicate_date: '@date("yyyy-MM-dd")',
    entry_date: '@date("yyyy-MM-dd")',
    leave_date: '@date("yyyy-MM-dd")',
    member_status: '@integer(0, 3)',
    detail: {
      'tel|1-3': [
        {
          'id|+1': 100,
          label: '@word(3, 5)',
          content: '@natural'
        }
      ],
      'email|1-3': [
        {
          'id|+1': 200,
          label: '@word(3, 5)',
          content: '@email'
        }
      ],
      'address|1-3': [
        {
          'id|+1': 300,
          label: '@word(3, 5)',
          content: '@county(true)'
        }
      ],
      'other|1-3': [
        {
          'id|+1': 400,
          label: '@word(3, 5)',
          content: '@word'
        }
      ]
    }
  }))
}

let calendarList = []
const calendarCount = 100
for (let i = 0; i < calendarCount; i++) {
  calendarList.push(Mock.mock({
    id: '@increment',
    title: '@title',
    description: '@sentence',
    start: new Date()
  }))
}

export default {
  /* eslint-disable */
  getList: config => {
    // type: 0 待审核、1 已加入、2 已离职、3 全部
    let { sort, page, per_page, filter, type } = param2Obj(config.url)
    if (!type) {
      type = 1
    }

    let mockList = List.filter(item => {
      if (filter && item.name.indexOf(filter) < 0) return false
      if (parseInt(type) !== 3 && parseInt(type) !== item.member_status) return false
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
      prevPageUrl = '/org/memberList?sort=' + sort + '&page=' + (page - 1) + '&per_page=' + per_page + // eslint-disable-line
        '&filter=' + filter + '&type=' + type
    }
    // 计算下一页URL
    let nextPageUrl
    if (parseInt(page) === lastPage) {
      nextPageUrl = null
    } else {
      nextPageUrl = '/org/memberList?sort=' + sort + '&page=' + (page + 1) + '&per_page=' + nextPage + // eslint-disable-line
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

  // PUT方法
  addMember: config => {
    const id = parseInt(config.url.match(/\/addMember\/(\d+)$/)[1])
    let archive = List.find(item => item.id === id)
    archive.member_status = 1
    return {
      code: 0,
      msg: 'success'
    }
  },

  fetchMember: config => {
    const { id } = param2Obj(config.url)
    let member = List.find(item => item.id === parseInt(id))
    member.birthday = parseInt(new Date(member.birthday).getTime())
    member.id_card_exp = parseInt(new Date(member.id_card_exp).getTime())
    return {
      code: 0,
      msg: 'success',
      data: {
        archive: member
      }
    }
  },

  // DELETE方法
  removeMember: config => {
    const id = parseInt(config.url.match(/\/removeMember\/(\d+)$/)[1])
    let archive = List.find(item => item.id === id)
    archive.member_status = 2
    return {
      code: 0,
      msg: 'success'
    }
  },

  fetchArchiveCount: config => {
    let result = []
    myList.forEach(item => {
      result.push({
        id: item.source_id,
        name: item.source_name
      })
    })
    return {
      code: 0,
      msg: 'success',
      data: result
    }
  },

  fetchSpecArchive: config => {
    const { id } = param2Obj(config.url)
    let archive = myList.find(item => item.source_id === parseInt(id))
    archive.birthday = new Date(archive.birthday)
    archive.id_card_exp = new Date(archive.id_card_exp)
    return {
      code: 0,
      msg: 'success',
      data: {
        archive
      }
    }
  },

  saveMember: config => {
    const form = JSON.parse(config.body)
    let findMember = List.find(item => item.id === form.id)
    findMember.name = form.memberName
    findMember.marital_status = form.maritalStatus
    findMember.sex = form.sex
    findMember.birthday = form.birthday
    findMember.id_card_exp = form.idCardExp
    findMember.emergency_user = form.emergencyUser
    findMember.emergency_mobile = form.emergencyMobile
    findMember.animal = form.sybolicAnimal
    findMember.native_place = form.nativePlace
    findMember.detail.tel = form.phoneList
    findMember.detail.email = form.emailList
    findMember.detail.address = form.addressList
    findMember.detail.other = form.otherList

    return {
      code: 0,
      msg: 'success'
    }
  },

  fetchCalendar: config => {
    const { start } = param2Obj(config.url)

    let mockList = calendarList.filter(item => {
      return new Date(item.start) >= new Date(start)
    })
    mockList.forEach(item => {
      if (Math.random() > 0.5) {
        item.end = new Date()
        item.end.setDate(item.end.getDate() + parseInt(Math.random() * 10))
      }
    })

    return {
      code: 0,
      msg: 'success',
      data: {
        calendarList: mockList
      }
    }
  }
}

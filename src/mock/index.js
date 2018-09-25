import Mock from 'mockjs'
import loginAPI from './login'
import joinComAPI from './joinCom'
import ownComAPI from './ownCom'
import existComAPI from './existCom'
import createComAPI from './createCom'
import memberAPI from './member'
import partmentAPI from './apartment'
import scheduleAPI from './schedule'
// Mock.setup({
//   timeout: '350-600'
// })

// 个人登录
Mock.mock(/^\/org\/login$/, 'post', loginAPI.login)
Mock.mock(/^\/org\/logout$/, 'post', loginAPI.logout)

// 登录公司
Mock.mock(/^\/org\/loginCom$/, 'post', loginAPI.loginCom)
Mock.mock(/^\/org\/logoutCom$/, 'post', loginAPI.logoutCom)

// 获取用户信息
Mock.mock(/\/org\/userInfo/, 'get', loginAPI.userInfo)

// 已加入公司
Mock.mock(/\/org\/joinComList/, 'get', joinComAPI.getList)
// 退出公司
Mock.mock(/\/org\/exitCom/, 'post', joinComAPI.exitCom)

// 已创建公司
Mock.mock(/\/org\/ownComList/, 'get', ownComAPI.getList)
// 解散公司
Mock.mock(/\/org\/dissolveCom/, 'post', ownComAPI.dissolveCom)

// 可加入公司
Mock.mock(/\/org\/existComList/, 'get', existComAPI.getList)
Mock.mock(/\/org\/joinCom/, 'post', existComAPI.joinCom)

// 创建公司
Mock.mock(/\/org\/validateRepeat/, 'get', createComAPI.validateName)
Mock.mock(/\/org\/createCom/, 'post', createComAPI.createCom)

// 成员列表
Mock.mock(/\/org\/memberList/, 'get', memberAPI.getList)
Mock.mock(/\/org\/addMember/, 'put', memberAPI.addMember)
Mock.mock(/\/org\/fetchMember/, 'get', memberAPI.fetchMember)
Mock.mock(/\/org\/removeMember/, 'delete', memberAPI.removeMember)
Mock.mock(/\/org\/saveMember/, 'post', memberAPI.saveMember)
Mock.mock(/\/org\/fetchCalendar/, 'get', memberAPI.fetchCalendar)

// 获取个人资料
Mock.mock(/\/org\/fetchArchiveCount/, 'get', memberAPI.fetchArchiveCount)
Mock.mock(/\/org\/fetchSpecArchive/, 'get', memberAPI.fetchSpecArchive)

Mock.mock(/\/org\/apartmentList/, 'get', partmentAPI.getList)
Mock.mock(/\/org\/removeApartment/, 'delete', partmentAPI.removeApartment)

Mock.mock(/\/org\/scheduleList/, 'get', scheduleAPI.getList)
Mock.mock(/\/org\/removeSchedule/, 'delete', scheduleAPI.removeSchedule)
Mock.mock(/\/org\/addSchedule/, 'put', scheduleAPI.addSchedule)
Mock.mock(/\/org\/editSchedule/, 'put', scheduleAPI.editSchedule)
export default Mock

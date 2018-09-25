import router, { resetRouter } from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { Message } from 'element-ui'

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
function hasPermission (roles, permissionRoles) {
  if (roles.indexOf('creator') >= 0) return true // creator permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
    next()
  } else {
    if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
      store.dispatch('GetUserInfo').then(res => { // 拉取user_info
        const roles = res.data // note: roles must be a array! such as: ['editor','develop']
        store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
          resetRouter()
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })
      }).catch((err) => {
        store.dispatch('FedLogout').then(() => {
          Message.error(err || 'Verification failed, please login again')
          next({ path: '/login' })
        })
      })
    } else {
      // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
      if (hasPermission(store.getters.roles, to.meta.roles)) {
        next()//
      } else {
        next({ path: '/401', replace: true, query: { noGoBack: true } })
      }
      // 可删 ↑
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

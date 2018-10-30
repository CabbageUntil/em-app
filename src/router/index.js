import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '@/views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: {
        title: 'Dashboard',
        icon: 'dashboard',
        noCache: true
      }
    },
    {
      path: 'dashboard_visitor',
      component: () => import('@/views/dashboard/visitor/index'),
      name: 'DashboardVisitor',
      meta: {
        title: 'DashboardVisitor',
        noCache: false
      },
      hidden: true
    },
    {
      path: 'dashboard_creator',
      component: () => import('@/views/dashboard/creator/index'),
      name: 'DashboardCreator',
      meta: {
        title: 'DashboardCreator',
        noCache: false
      },
      hidden: true
    },
    {
      path: 'dashboard_member',
      component: () => import('@/views/dashboard/member/index'),
      name: 'DashboardMember',
      meta: {
        title: 'DashboardMember',
        noCache: false
      },
      hidden: true
    },
    {
      path: 'dashboard_groupLeader',
      component: () => import('@/views/group/groupMemberList'),
      name: 'DashboardLeader',
      meta: {
        title: 'DashboardLeader',
        noCache: false
      },
      hidden: true
    },
    {
      path: 'dashboard_groupMember',
      component: () => import('@/views/group/groupMemberList'),
      name: 'DashboardGroupMember',
      meta: {
        title: 'DashboardGroupMember',
        noCache: false
      },
      hidden: true
    }]
  }
]

export const asyncRouterMap = [
  //分组
  {
    path: '/gropList',
    component: Layout,
    meta: {
      roles: ['visitor'],
      // title: 'GroupInfo',
      // icon: 'example'
    },
    children: [
        {
        path: 'list',
        component: () => import('@/views/group/index'),
        name: 'GroupInfo',
        meta: {
          title: 'GroupInfo',
          icon: 'list'
        }
      }
    ]
  },
  //审核
  {
    path: '/GroupMemberReview',
    component: Layout,
    meta: {
      roles: ['groupLeader'],
      title: 'MemberReview',
      icon: 'example'
    },
    children: [
      {
      path: 'list',
      component: () => import('@/views/group/GroupMemberReview'),
      name: 'MemberReview',
      meta: {
        title: 'MemberReview',
        icon: 'list'
      }
    }]
  },
  {
    path: '/selectVue',
    component: Layout,
    meta: {
      roles: ['groupLeader'],
      title: 'MemberReview',
      icon: 'example'
    },
    children: [
      {
      path: 'list',
      component: () => import('@/views/group/select'),
      name: '级联测选择测试',
      meta: {
        title: '级联测选择测试',
        icon: 'list'
      }
    }]
  },
//页面测试使用
  {
    path: '/assignMemberList',
    component: Layout,
    meta: {
      roles: ['groupLeader','groupMember'],
      title: 'assignMemberList',
      icon: 'example'
    },
    children: [
      {
      path: 'list',
      component: () => import('@/views/group/assignMemberList'),
      name: 'assignMemberList',
      meta: {
        title: 'assignMemberList',
        icon: 'list'
      }
    }]
  },
  {
    path: '/serverList',
    component: Layout,
    meta: {
      roles: ['groupLeader','groupMember'],
      title: 'serverList',
      icon: 'example'
    },
    children: [
      {
      path: 'list',
      component: () => import('@/views/group/serverList'),
      name: 'serverList',
      meta: {
        title: 'serverList',
        icon: 'list'
      }
    }]
  },
  {
    path: '/ownServerList',
    component: Layout,
    meta: {
      roles: ['groupLeader','groupMember'],
      title: 'ownServerList',
      icon: 'example'
    },
    children: [
      {
      path: 'list',
      component: () => import('@/views/group/ownServerList'),
      name: 'ownServerList',
      meta: {
        title: 'ownServerList',
        icon: 'list'
      }
    }]
  },
  // 加入公司
  {
    path: '/joinCom',
    component: Layout,
    meta: {
      roles: ['visitor']
    },
    children: [{
      path: 'index',
      component: () => import('@/views/joinCom/index'),
      name: 'joinCom',
      meta: {
        title: 'joinCom',
        icon: 'dashboard',
        noCache: true
      }
    },
    {
      path: ':id(\\d+)',
      component: () => import('@/views/personInfo/edit'),
      name: 'joinComForm',
      meta: {
        title: 'joinComForm',
        noCache: true
      },
      hidden: true
    }]
  },
  // 创建公司
  {
    path: '/createCom',
    component: Layout,
    redirect: 'userForm',
    meta: {
      roles: ['visitor']
    },
    children: [{
      path: 'index',
      component: () => import('@/views/personInfo/edit'),
      name: 'createCom',
      meta: {
        title: 'createCom',
        icon: 'dashboard'
      }
    },
    {
      path: 'orgForm',
      component: () => import('@/views/createCom/index'),
      name: 'orgForm',
      meta: {
        title: 'orgForm'
      },
      hidden: true
    }]
  },

  // 成员模块
  {
    path: '/member',
    component: Layout,
    redirect: '/member/index',
    name: 'member',
    meta: {
      title: 'member',
      icon: 'dashboard',
      roles: ['creator', 'admin', 'member']
    },
    children: [{
      path: 'index',
      component: () => import('@/views/member/index'),
      name: 'memberList',
      meta: {
        title: 'memberList',
        icon: 'dashboard'
      }
    },
    {
      path: 'view/:id(\\d+)',
      component: () => import('@/views/personInfo/view'),
      name: 'memberViewer',
      meta: {
        title: 'memberViewer',
        icon: 'dashboard',
        noCache: true
      },
      hidden: true
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/personInfo/edit'),
      name: 'memberEdit',
      meta: {
        title: 'memberEdit',
        icon: 'dashboard',
        noCache: true
      },
      hidden: true
    },
    {
      path: 'calendar/:id(\\d+)',
      component: () => import('@/views/member/components/MemberCalendar'),
      name: 'memberCalendar',
      meta: {
        title: 'memberCalendar',
        icon: 'dashboard'
      },
      hidden: true
    }]
  },

  // 部门信息管理
  {
    path: '/Apartment',
    component: Layout,
    meta: {
      title: 'Apartment',
      icon: 'lock',
      roles: ['creator', 'admin', 'member']
    },
    children: [{
      path: 'index',
      component: () => import('@/views/apartment/index'),
      name: 'apartmentList',
      meta: {
        title: 'apartmentList',
        icon: 'apartment',
        noCache: true
      }
    }]
  },
  // 日程管理
  {
    path: '/Schedule',
    component: Layout,
    meta: {
      title: 'Schedule',
      icon: 'lock',
      roles: ['creator', 'admin', 'member']
    },
    children: [{
      path: 'index',
      component: () => import('@/views/schedule/index'),
      name: 'ScheduleList',
      meta: {
        title: 'ScheduleList',
        icon: 'apartment',
        noCache: true
      }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}

export default router

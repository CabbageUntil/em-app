import { login, logout, orgLogin, groupLogin, orgLogout, getUserInfo } from '@/api/login'

const user = {
  state: {
    // 用户昵称
    name: '',
    // 用户头像
    avatar: '',
    // 公司ID
    orgId: '',
    // 公司名
    orgName: '',
    // 员工ID
    memberId: '',
    // 员工姓名
    memberName: '',
    // 角色
    roles: [],
    //用户token
    token: '',
    loginCom: false,
    logoutCom: false,
    loginGroup: false,
    logoutGroup: false,
    //登录人身份
    loginRole: '',
    //添加通讯录秘钥
    secret: '',
    //手机号
    username: '',
    orgName: ''
  },

  mutations: {
    SET_ORGNAME: (state, orgName) => {
      state.orgName = orgName
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_SECRET: (state, secret) => {
      state.secret = secret
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ORG_ID: (state, orgId) => {
      state.orgId = orgId
    },
    SET_ORG_NAME: (state, orgName) => {
      state.orgName = orgName
    },
    SET_MEMBER_ID: (state, memberId) => {
      state.memberId = memberId
    },
    SET_MEMBER_NAME: (state, memberName) => {
      state.memberName = memberName
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    TOGGLE_LOGIN_COM: (state, isLoginCom) => {
      state.loginCom = !state.loginCom
    },
    TOGGLE_LOGOUT_COM: (state, isLogoutCom) => {
      state.logoutCom = !state.logoutCom
    },
    TOGGLE_LOGIN_GROUP: (state, isLoginGroup) => {
      state.loginGroup = !state.loginGroup
    },
    TOGGLE_LOGOUT_GROUP: (state, isLogoutGroup) => {
      state.logoutCom = !state.logoutGroup
    },
    SET_LOGINROLE: (state, loginRole) => {
      state.loginRole = loginRole
    },
  },

  actions: {
    // 登录
    Login ({ commit }, token) {
      return new Promise((resolve, reject) => {
        login(token.trim()).then(response => {
          const data = response
          if (data.code !== 0) {
            reject(new Error())
          } else {
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登录公司
    OrgLogin ({ commit }, loginInfo) {
      const orgId = loginInfo.orgId
      return new Promise((resolve, reject) => {
        orgLogin(orgId).then(response => {
          commit('SET_ROLES', [])
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //分组模块登录
    GroupLogin ({ commit }, loginInfo) {
      const groupId = loginInfo.groupId
      return new Promise((resolve, reject) => {
        groupLogin(groupId).then(response => {
          commit('SET_ROLES', [])
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          if (response.code !== 0) {
            reject(new Error())
          } else {
            const data = response.data
           // console.log(" 登录信息 ---》》%o", data)
            // 若已登录公司，则使用公司身份，否则使用游客身份
            // 分配登录公司信息
            //orgName: "TEst01"
            if (data.role !== 'visitor') {
              if(data.role ==='admin') {
                commit('SET_LOGINROLE', "公司创建人")
              } else if(data.role === 'groupLeader') {
                commit('SET_LOGINROLE', "群组组长")
              } else if(data.role === 'groupMember') {
                commit('SET_LOGINROLE', "群组成员")
              } else if(data.role === 'member') {
                commit('SET_LOGINROLE', "公司员工")
              } else if(data.role === 'creator') {
                commit('SET_LOGINROLE', "公司创建人")
              }
              commit('SET_NAME', data.name)
              commit('SET_ORGNAME', data.orgName)
              commit('SET_USERNAME', data.username)
              commit('SET_SECRET', data.secret)
              commit('SET_ORG_ID', data.orgId)
              commit('SET_ORG_NAME', data.orgName)
              commit('SET_TOKEN', data.token)
              commit('SET_MEMBER_ID', data.memberId)
              commit('SET_MEMBER_NAME', data.memberName)
              commit('SET_ROLES', [data.role])
            // 分配登录信息
          } else {
              console.log(data.username)
              commit('SET_LOGINROLE', "游客")
              commit('SET_ROLES', [data.role])
              commit('SET_NAME', data.name)
              commit('SET_USERNAME', data.username)
              commit('SET_SECRET', data.secret)
              commit('SET_AVATAR', data.avatar)
            }
            // 返回角色信息
            resolve({ data: state.roles })
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 访客登出
    Logout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 公司登出
    OrgLogout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        orgLogout().then((response) => {
          if (response.code !== 0) {
            reject(new Error())
          } else {
            commit('SET_ORG_ID', null)
            commit('SET_ORG_NAME', null)
            commit('SET_MEMBER_ID', null)
            commit('SET_MEMBER_NAME', null)
            commit('SET_ROLES', [])
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 分组登出
    GroupLogout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        orgLogout().then((response) => {
          if (response.code !== 0) {
            reject(new Error())
          } else {
            commit('SET_ORG_ID', null)
            commit('SET_ORG_NAME', null)
            commit('SET_MEMBER_ID', null)
            commit('SET_MEMBER_NAME', null)
            commit('SET_ROLES', [])
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogout ({ commit }) {
      return new Promise(resolve => {
        resolve()
      })
    },

    toggleLoginCom ({ commit }, isLoginCom) {
      return new Promise(resolve => {
        commit('TOGGLE_LOGIN_COM', isLoginCom)
        resolve()
      })
    },
    toggleLogoutCom ({ commit }, isLogoutCom) {
      return new Promise(resolve => {
        commit('TOGGLE_LOGOUT_COM', isLogoutCom)
        resolve()
      })
    },

    toggleLogoutGroup({ commit }, isLogoutGroup) {
      return new Promise(resolve => {
        commit('TOGGLE_LOGOUT_GROUP', isLogoutGroup)
        resolve()
      })
    },
    toggleLoginGroup({ commit }, isLoginGroup) {
      return new Promise(resolve => {
        commit('TOGGLE_LOGIN_GROUP', isLoginGroup)
        resolve()
      })
    },
  }

}

export default user

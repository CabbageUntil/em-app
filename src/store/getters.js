const getters = {
  // 全局配置
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  // 登录用户信息
  token: state => state.user.token,
  orgToken: state => state.user.orgToken,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  // 公司
  orgId: state => state.user.orgId,
  orgName: state => state.user.orgName,
  memberName: state => state.user.memberName,
  introduction: state => state.user.introduction,
  // 路由
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  // 错误
  errorLogs: state => state.errorLog.logs,
  // 表单
  userForm: state => state.form.userForm,
  joinComName: state => state.form.companyName,
  // 登录、登出公司标记，用于判断是否要关闭相应的标签栏导航
  isLoginCom: state => state.user.loginCom,
  isLogoutCom: state => state.user.logoutCom,
  // 登录分组和登出分组标记，用于判断是否要关闭相应的标签栏导航
  isLoginGroup: state => state.user.loginGroup,
  isLogoutGroup: state => state.user.logoutGroup

}
export default getters

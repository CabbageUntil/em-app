<template>
  <div class="dashboard-creator-container">
    <div class="welcome-text">
      {{ $t('dashboard.welcomeText.welcome') + ' ' + $store.getters.orgName + ', ' +
      $store.getters.memberName + ' ' + $t('dashboard.welcomeText.role.creator') }}
    </div>
    <el-row
      type="flex"
      justify="center">
      <el-button
        type="danger"
        round
        @click="handleLogoutOrgClick">
        {{ $t('dashboard.welcomeText.btn.exit') }}
      </el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'DashboardCreator',
  methods: {
    handleLogoutOrgClick () {
      // 登出公司
      Promise.all([
        this.$store.dispatch('OrgLogout'),
        this.$store.dispatch('toggleLogoutCom', true)
      ]).then((result) => {
        this.$router.push({ path: '/' })
      }).catch((error) => {
        console.log('登出公司失败： %o', error)
      })
    },
    handleLoginCom () {
      if (this.$store.getters.isLoginCom) {
        this.$store.dispatch('delOthersViews', { path: this.$route.path })
        this.$store.dispatch('toggleLoginCom', false)
      } else {
        this.$store.dispatch('delVisitedViews', { path: '/dashboard' })
      }
    }
  },
  activated () {
    this.handleLoginCom()
  },
  mounted () {
    this.handleLoginCom()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-creator-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
  }
  .welcome-text {
    text-align: center;
    padding-bottom: 10px;
  }
</style>

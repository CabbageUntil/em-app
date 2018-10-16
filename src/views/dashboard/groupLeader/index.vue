<template>
  <div class="dashboard-member-container">
    <div class="welcome-text">
      <span style="font-size:16px;color: #3e2723d9;">{{ $t('dashboard.welcomeText.welcome') + ' ' + $store.getters.orgName }}</span>
      <span style="font-size:18px;color: #4CAF50;">{{$t('dashboard.welcomeText.role.groupLeader')+'  '}}</span>
      <span style="font-size: 22px;color: #2196F3;font-weight: 300;">{{$store.getters.memberName}}</span>
    </div>
    <el-row
      type="flex"
      justify="center">
      <el-button
        type="danger"
        plain
        @click="handleLogoutGroupClick">
        {{ $t('dashboard.welcomeText.btn.exit1') }}
      </el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'DashboardLeader',
  methods: {
    handleLogoutGroupClick () {
      // 登出群组
      Promise.all([
        this.$store.dispatch('GroupLogout'),
        this.$store.dispatch('toggleLogoutGroup', true)
      ]).then((result) => {
        this.$router.push({ path: '/' })
      }).catch((error) => {
        console.log('登出群组失败：%o', error)
      })
    },
    handleLoginGroup () {
      if (this.$store.getters.isLoginGroup) {
        this.$store.dispatch('delOthersViews', { path: this.$route.path })
        this.$store.dispatch('toggleLoginGroup', false)
      } else {
        this.$store.dispatch('delVisitedViews', { path: '/dashboard' })
      }
    }
  },
  activated () {
    this.handleLoginGroup()
  },
  mounted () {
    this.handleLoginGroup()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-member-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    line-height: 1.2em;
    padding: 50px 60px 0px 0px;
  }
  .welcome-text {
    padding-bottom: 10px;
    text-align: center;
  }
</style>

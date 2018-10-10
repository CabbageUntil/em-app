<template>
  <div class="dashboard-admin-container">
    <div>
      <github-corner style="position: absolute; top: 0px; border: 0; right: 0;"/>
    </div>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner
  },
  methods: {
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
.dashboard-admin-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
}
.welcome-text {
    text-align: center;
    padding-bottom: 10px;
  }
</style>

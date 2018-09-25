<template>
  <div/>
</template>

<script>
export default {
  name: 'Dashboard',
  methods: {
    changePage () {
      this.$router.push({ path: '/dashboard_' + this.$store.getters.roles[0] })
    }
  },
  mounted () {
    this.changePage()
  }
}
</script>

<style lang="stylus" scoped>
</style>

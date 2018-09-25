<template>
  <div>
    LOGINING...
  </div>
</template>

<script>
export default {
  name: 'Login',
  mounted () {
    let loginToken = this.$route.query['jwt-token']
    if (loginToken) {
      this.$store.dispatch('Login', loginToken).then(() => {
        this.$router.push({ path: '/' })
      }).catch(() => {
        console.log('登录出错')
        window.location.href = 'https://passport.dianchat.net/pass/service_login?callback=' + process.env.BASE_API + '/login'
      })
    } else {
      console.log('无token')
     window.location.href = 'https://passport.dianchat.net/pass/service_login?callback=' + process.env.BASE_API + '/login'
    }
  }
}
</script>

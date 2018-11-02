<template>
  <el-menu
    class="navbar"
    mode="horizontal">
    <hamburger
      class="hamburger-container"
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"/>

    <breadcrumb class="breadcrumb-container"/>
    <div class="right-menu">
      <el-tag
       v-show="showBtn()"
       class="userName right-menu-item"
       placement="bottom">公司(群组)名称：{{this.$store.state.user.orgName}}</el-tag>
      <el-tag
       class="userName right-menu-item"
       placement="bottom">欢迎！{{$store.getters.name+','+this.$store.state.user.loginRole}}</el-tag>
      <el-tooltip
        effect="dark"
        :content="$t('navbar.screenfull')"
        placement="bottom">
        <screenfull class="screenfull right-menu-item"/>
      </el-tooltip>
      <lang-select class="international right-menu-item"/>
      <el-dropdown
        class="avatar-container right-menu-item"
        trigger="click">
        <div class="avatar-wrapper">
          <img
            class="user-avatar"
            :src="avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          
          <el-dropdown-item divided>
            <span
              @click="logout"
              style="display:block;">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import { logout } from '@/api/login'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    LangSelect,
    ThemePicker
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  methods: {
    showBtn(){
        const name = this.$store.state.user.orgName
        if(name != ''&&name!=null){
          return true
        } else {
            return false
        }
    },
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
    },
    logout () {
     /* this.$store.dispatch('Logout').then(() => {
        window.location.href = 'https://passport.dianchat.net/pass/service_login'
        /!*location.reload()// In order to re-instantiate the vue-router object to avoid bugs*!/
      })*/
      logout().then(response => {
        let code = response.code
        if(code === 0){
          window.location.href = 'https://passport.dianchat.net/pass/logout?callback=https://passport.dianchat.net/pass/service_login?callback=http://localhost:8092/login'
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .userName{
      position: relative;
      bottom: 15px;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

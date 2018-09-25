<template>
  <div class="dashboard-visitor-container">
    <panel-group
      :left-end-value="joinComCount"
      :right-end-value="ownComCount"
    >
      <my-vuetable
        slot="left"
        api-url="/org/joinComList"
        :fields="joinTableFields"
        detail-row-component="join-com-detail-row"
        ref="joinTable"
      >
        <div
          slot="actions"
          slot-scope="props">
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('table.buttonHint.joinCompany.enter')"
            placement="left"
          >
            <el-button
              class="mini ui green button"
              @click="onJoinAction('enter', props.rowData, props.rowIndex)"
            >
              <i class="sign in icon"/>
            </el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('table.buttonHint.joinCompany.exit')"
            placement="right"
          >
            <el-button
              class="mini ui red button"
              @click="onJoinAction('exit', props.rowData, props.rowIndex)"
            >
              <i class="sign out icon"/>
            </el-button>
          </el-tooltip>
        </div>
      </my-vuetable>
      <my-vuetable
        slot="right"
        api-url="/org/ownComList"
        :fields="ownTableFields"
        detail-row-component="own-com-detail-row"
        ref="ownTable"
      >
        <div
          slot="actions"
          slot-scope="props">
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('table.buttonHint.ownCompany.enter')"
            placement="left"
          >
            <el-button
              class="mini ui green button"
              @click="onOwnAction('enter', props.rowData, props.rowIndex)"
            >
              <i class="sign in icon"/>
            </el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('table.buttonHint.ownCompany.dissolve')"
            placement="top"
          >
            <el-button
              class="mini ui red button"
              @click="onOwnAction('dissolve', props.rowData, props.rowIndex)"
            >
              <i class="delete icon"/>
            </el-button>
          </el-tooltip>
        </div>
      </my-vuetable>
    </panel-group>
  </div>
</template>

<script>
import Vue from 'vue'

import PanelGroup from '@/components/PanelGroup'
import MyVuetable from '@/components/Table/MyVuetable'
import JoinComDetailRow from './components/JoinComDetailRow'
import OwnComDetailRow from './components/OwnComDetailRow'

import { exitCom, dissolveCom, getJoinComCount, getOwnComCount } from '@/api/company'

import { joinTableFields, ownTableFields } from '../fields.js'

Vue.component('join-com-detail-row', JoinComDetailRow)
Vue.component('own-com-detail-row', OwnComDetailRow)

export default {
  name: 'DashboardVisitor',
  components: {
    PanelGroup,
    MyVuetable,
    JoinComDetailRow,
    OwnComDetailRow
  },
  data () {
    return {
      init: true,
      joinComCount: 0,
      ownComCount: 0
    }
  },
  computed: {
    joinTableFields () {
      return joinTableFields
    },
    ownTableFields () {
      return ownTableFields
    }
  },
  methods: {
    onJoinAction (action, rowData, rowIndex) {
      // 登录公司
      if (action === 'enter') {
        this.loginCompany(rowData.id)
      // 退出公司
      } else if (action === 'exit') {
        let tableObj = this.$refs.joinTable.$refs.vuetable
        this.$confirm(this.$t('table.buttonAction.exitCompany.message.content').replace('%{name}', rowData.name),
          this.$t('table.buttonAction.exitCompany.message.title'),
          {
            confirmButtonText: this.$t('form.common.message.confirm'),
            cancelButtonText: this.$t('form.common.message.cancel'),
            type: 'warning'
          }
        ).then(() => {
          exitCom(rowData.id).then(response => {
            const data = response.data
            if (data.code === 0) {
              this.$message({
                message: this.$t('table.buttonAction.exitCompany.success'),
                type: 'success'
              })
              tableObj.reload()
              this.fetchJoinComCount()
            } else {
              this.$message.error(this.$t('table.buttonAction.exitCompany.fail'))
            }
          }).catch(error => {
            this.$message.error(this.$t('table.buttonAction.exitCompany.fail') + ': ' + error)
          })
        }).catch(() => {
          this.$message(this.$t('form.common.message.cancel'))
        })
      }
    },
    onOwnAction (action, rowData, rowIndex) {
      // 登录公司
      if (action === 'enter') {
        this.loginCompany(rowData.id)
      // 解散公司
      } else if (action === 'dissolve') {
        let tableObj = this.$refs.ownTable.$refs.vuetable
        this.$confirm(this.$t('table.buttonAction.dissolveCompany.message.content').replace('%{name}', rowData.name),
          this.$t('table.buttonAction.dissolveCompany.message.title'),
          {
            confirmButtonText: this.$t('form.common.message.confirm'),
            cancelButtonText: this.$t('form.common.message.cancel'),
            type: 'warning'
          }
        ).then(() => {
          dissolveCom(rowData.id).then(response => {
            const data = response.data
            if (data.code === 0) {
              this.$message({
                message: this.$t('table.buttonAction.dissolveCompany.success'),
                type: 'success'
              })
              tableObj.reload()
              this.fetchOwnComCount()
            } else {
              this.$message.error(this.$t('table.buttonAction.dissolveCompany.fail'))
            }
          }).catch(error => {
            this.$message.error(this.$t('table.buttonAction.dissolveCompany.fail') + ': ' + error)
          })
        }).catch(() => {
          this.$message(this.$t('form.common.message.cancel'))
        })
      }
    },

    loginCompany (orgId) {
      Promise.all([
        this.$store.dispatch('OrgLogin', { orgId })
      ]).then((result) => {
        this.$store.dispatch('toggleLoginCom', true)
        this.$router.push({ path: '/' })
      }).catch((error) => {
        console.log('登录公司失败: %o', error)
      })
    },

    fetchJoinComCount () {
      getJoinComCount().then(response => {
        this.joinComCount = response.data
      })
    },
    fetchOwnComCount () {
      getOwnComCount().then(response => {
        this.ownComCount = response.data
      })
    },

    handleLogoutCom () {
      this.fetchJoinComCount()
      this.fetchOwnComCount()
      if (this.$store.getters.isLogoutCom) {
        this.$store.dispatch('delOthersViews', { path: this.$route.path })
        this.$store.dispatch('toggleLogoutCom', false)
      } else {
        this.$store.dispatch('delVisitedViews', { path: '/dashboard' })
      }
    }
  },
  activated () {
    if (!this.init) {
      this.handleLogoutCom()
    }
  },
  mounted () {
    if (this.init) {
      this.handleLogoutCom()
      this.init = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-visitor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
}
</style>

<template>
  <div class="dashboard-joinCom-container">
    <my-vuetable
      api-url="/org/otherComList"
      :fields="existComTableFields"
      detail-row-component="exist-com-detail-row"
    >
      <div
        slot="actions"
        slot-scope="props">
        <el-tooltip
          class="item"
          effect="dark"
          :content="$t('table.buttonHint.existCompany.join')"
          placement="left"
        >
          <el-button
            class="mini ui green button"
            @click="onAction('join', props.rowData, props.rowIndex)"
          >
            <i class="mail forward icon"/>
          </el-button>
        </el-tooltip>
      </div>
    </my-vuetable>
  </div>
</template>

<script>
import Vue from 'vue'

import MyVuetable from '@/components/Table/MyVuetable'
import ExistComDetailRow from './DetailRow'

import { existComTableFields } from './fields.js'

Vue.component('exist-com-detail-row', ExistComDetailRow)

export default {
  name: 'JoinCom',
  components: {
    MyVuetable
  },
  computed: {
    existComTableFields () {
      return existComTableFields
    }
  },
  methods: {
    onAction (action, rowData, rowIndex) {
      if (action === 'join') {
        this.$store.dispatch('setJoinComName', rowData.orgName)
        this.$router.push('/joinCom/' + rowData.orgId)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .dashboard-joinCom-container
    padding: 32px
    background-color: rgb(240, 242, 245)
</style>

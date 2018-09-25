<template>
  <div>
    <el-row
      v-if="isRadioGroupVisible()"
      type="flex"
      justify="center"
      class="radio-row">
      <el-radio-group
        v-model="checkedValue"
        @change="handleRadioChange">
        <el-radio :label="0">{{ $t('table.radio.member.pending') }}</el-radio>
        <el-radio :label="1">{{ $t('table.radio.member.alreadyJoined') }}</el-radio>
        <el-radio :label="2">{{ $t('table.radio.member.resigned') }}</el-radio>
        <el-radio :label="3">{{ $t('table.radio.member.all') }}</el-radio>
      </el-radio-group>
    </el-row>
    <el-row>
      <my-vuetable
        ref="memberListTable"
        :api-url="apiUrl"
        :fields="dynamicFields"
        detail-row-component="member-detail-row"
      >
        <div
          slot="actions"
          slot-scope="props">
          <!-- 通过 -->
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('table.buttonHint.memberList.add')"
            placement="top"
            v-show="isAddUserBtnShow(props.rowData.member_status)"
          >
            <el-button
              class="mini ui green button"
              @click="onAction('add', props.rowData, props.rowIndex)"
            >
              <i class="add user icon"/>
            </el-button>
          </el-tooltip>
          <!-- 查看 -->
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('table.buttonHint.memberList.view')"
            placement="top"
          >
            <el-button
              class="mini ui green button"
              @click="onAction('view', props.rowData, props.rowIndex)"
            >
              <i class="unhide icon"/>
            </el-button>
          </el-tooltip>
          <!-- 编辑 -->
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('table.buttonHint.memberList.edit')"
            placement="top"
            v-show="isEditUserBtnShow()"
          >
            <el-button
              class="mini ui green button"
              @click="onAction('edit', props.rowData, props.rowIndex)"
            >
              <i class="edit icon"/>
            </el-button>
          </el-tooltip>
          <!-- 解雇 -->
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('table.buttonHint.memberList.remove')"
            placement="top"
            v-show="isRemoveUserBtnShow(props.rowData.member_status)"
          >
            <el-button
              class="mini ui red button"
              @click="onAction('remove', props.rowData, props.rowIndex)"
            >
              <i class="remove user icon"/>
            </el-button>
          </el-tooltip>
          <!-- 日程 -->
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('table.buttonHint.memberList.calendar')"
            placement="top"
            v-show="isCalendarBtnShow(props.rowData.member_status)"
          >
            <el-button
              class="mini ui olive button"
              @click="onAction('calendar', props.rowData, props.rowIndex)"
            >
              <i class="calendar outline icon"/>
            </el-button>
          </el-tooltip>
        </div>
      </my-vuetable>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue'
import MyVuetable from '@/components/Table/MyVuetable'
import MemberDetailRow from './components/MemberDetailRow'

import { memberListTableFields } from './fields.js'

import { addMember, removeMember } from '@/api/member'

Vue.component('member-detail-row', MemberDetailRow)

export default {
  name: 'MemberList',
  components: {
    MyVuetable
  },
  data () {
    return {
      // 0 待审核、1 已加入、2 已离职、3 全部
      checkedValue: 1,
      roles: this.$store.getters.roles
    }
  },
  computed: {
    dynamicFields () {
      return memberListTableFields
    },
    apiUrl () {
      return '/org/memberList' + '?type=' + this.checkedValue
    }
  },
  methods: {
    onAction (action, rowData, rowIndex) {
      let tableObj = this.$refs.memberListTable.$refs.vuetable
      if (action === 'add') {
        this.$confirm(this.$t('table.buttonAction.addMember.message.content').replace('%{name}', rowData.name),
          this.$t('table.buttonAction.addMember.message.title'),
          {
            confirmButtonText: this.$t('form.common.message.confirm'),
            cancelButtonText: this.$t('form.common.message.cancel'),
            type: 'warning'
          }
        ).then(() => {
          addMember(rowData.id).then(response => {
            const data = response.data
            if (data.code === 0) {
              this.$message({
                message: this.$t('table.buttonAction.addMember.success'),
                type: 'success'
              })
              tableObj.reload()
            } else {
              this.$message.error(this.$t('table.buttonAction.addMember.fail'))
            }
          }).catch(error => {
            this.$message.error(this.$t('table.buttonAction.addMember.fail') + ': ' + error)
          })
        }).catch(() => {
          this.$message(this.$t('form.common.message.cancel'))
        })
      } else if (action === 'view') {
        this.$router.push({ path: '/member/view/' + rowData.id })
      } else if (action === 'edit') {
        this.$router.push({ path: '/member/edit/' + rowData.id })
      } else if (action === 'remove') {
        this.$confirm(this.$t('table.buttonAction.removeMember.message.content').replace('%{name}', rowData.name),
          this.$t('table.buttonAction.removeMember.message.title'),
          {
            confirmButtonText: this.$t('form.common.message.confirm'),
            cancelButtonText: this.$t('form.common.message.cancel'),
            type: 'warning'
          }
        ).then(() => {
          removeMember(rowData.id).then(response => {
            const data = response
            if (data.code === 0) {
              this.$message({
                message: this.$t('table.buttonAction.removeMember.success'),
                type: 'success'
              })
              tableObj.reload()
            } else {
              this.$message.error(this.$t('table.buttonAction.removeMember.fail'))
            }
          }).catch((error) => {
            this.$message.error(this.$t('table.buttonAction.removeMember.fail') + ': ' + error)
          })
        }).catch(() => {
          this.$message(this.$t('form.common.message.cancel'))
        })
      } else if (action === 'calendar') {
        this.$router.push({ path: '/member/calendar/' + rowData.id })
      }
    },
    handleRadioChange (val) {
      let tableObj = this.$refs.memberListTable.$refs.vuetable
      switch (val) {
        // 待审核，隐藏入职日期、离职日期、员工状态
        case 0:
          tableObj.hideField(13)
          tableObj.hideField(14)
          tableObj.hideField(15)
          break
        // 已加入，隐藏离职日期、员工状态
        case 1:
          tableObj.showField(12)
          tableObj.hideField(14)
          tableObj.hideField(15)
          break
        // 已离职，隐藏员工状态
        case 2:
          tableObj.showField(12)
          tableObj.showField(13)
          tableObj.showField(14)
          tableObj.hideField(15)
          break
        // 全部，显示全部字段
        case 3:
          tableObj.showField(12)
          tableObj.showField(13)
          tableObj.showField(14)
          tableObj.showField(15)
          break
      }
    },
    isRadioGroupVisible () {
      if (this.roles.indexOf('creator') >= 0) {
        return true
      } else {
        return false
      }
    },
    isAddUserBtnShow (memberStatus) {
      if (this.roles.indexOf('creator') === -1) {
        return false
      }
      if (this.checkedValue === 0 || memberStatus === 0) {
        return true
      } else {
        return false
      }
    },
    isEditUserBtnShow () {
      if (this.roles.indexOf('creator') >= 0) {
        return true
      } else {
        return false
      }
    },
    isRemoveUserBtnShow (memberStatus) {
      if (this.roles.indexOf('creator') === -1) {
        return false
      }
      if (this.checkedValue === 1 || memberStatus === 1) {
        return true
      } else {
        return false
      }
    },
    isCalendarBtnShow (memberStatus) {
      return (this.roles.indexOf('creator') >= 0) && (memberStatus !== 0)
    }
  },
  mounted () {
    let tableObj = this.$refs.memberListTable.$refs.vuetable
    tableObj.showField(12)
    tableObj.hideField(14)
    tableObj.hideField(15)
  }
}
</script>

<style lang="stylus" scoped>
  .radio-row
    padding: 10px 0
</style>

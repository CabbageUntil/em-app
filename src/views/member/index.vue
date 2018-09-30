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
              type="success" icon="el-icon-search"  size="mini"  plain
              @click="onAction('add', props.rowData, props.rowIndex)"
            >
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
              type="success" icon="el-icon-search"  size="mini"  plain
              @click="onAction('view', props.rowData, props.rowIndex)"
            >
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
              type="primary" icon="el-icon-edit"   size="mini"  plain
              @click="onAction('edit', props.rowData, props.rowIndex)"
            >
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
              type="danger" icon="el-icon-delete" size="mini"  plain
              @click="onAction('remove', props.rowData, props.rowIndex)"
            >
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
              type="success" icon="el-icon-date"  size="mini"  plain
              @click="onAction('calendar', props.rowData, props.rowIndex)"
            >
            </el-button>
          </el-tooltip>
          <!--查看已经分配的虚拟主机-->
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('table.buttonHint.memberList.server_view')"
            placement="top"
            v-show="isRemoveUserBtnShow(props.rowData.member_status)"
          >
            <el-button
              type="primary" icon="el-icon-view" size="mini"
              @click="onAction('222', props.rowData, props.rowIndex)"
            >
            </el-button>
          </el-tooltip>
          <!--分配虚拟主机-->
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('table.buttonHint.memberList.assign_server')"
            placement="top"
            v-show="isRemoveUserBtnShow(props.rowData.member_status)"
          >
            <el-button
              type="primary" icon="el-icon-upload" size="mini"
              @click="onAction('sign_server', props.rowData, props.rowIndex)"
            >
            </el-button>
          </el-tooltip>

          <!-- 分配虚拟主机 -->
          <el-dialog title="分配主机" :visible.sync="outerVisibles">
            <el-dialog
              width="30%"
              title="查询虚拟主机"
              :visible.sync="innerVisible"
              append-to-body>
            </el-dialog>
            <el-form :model="form">
              <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input v-model="form.alias" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机号" :label-width="formLabelWidth">
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="选择服务器" :label-width="formLabelWidth">
                <el-button type="success" @click="innerVisible = true">选择</el-button>
              </el-form-item>
              <el-form-item label="权限" :label-width="formLabelWidth">
                <el-switch v-model="form.allow_assign"></el-switch>
                <span class="demonstration">允许修改账户</span>
                <el-switch v-model="form.allow_reboot"></el-switch>
                <span class="demonstration">允许重启服务器</span>
              </el-form-item>
              <el-form-item label="到期时间" :label-width="formLabelWidth">
                <div class="block">
                  <el-date-picker
                    v-model="form.expire_time"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                  <el-switch v-model="form.delivery"></el-switch>
                  <span class="demonstration">默认</span>
                </div>
              </el-form-item>
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form.remark"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="outerVisibles = false">确定</el-button>
            </div>
          </el-dialog>
        </div>

      </my-vuetable>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
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
      roles: this.$store.getters.roles,
      outerVisibles: false,
      innerVisible: false,
      form: {
        mobile: '',
        expire_time: '',
        delivery: false,
        remark: '',
        sid: '',
        allow_reboot: false,
        allow_assign: false,
        alias: ''
      },
      formLabelWidth: '120px'
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
      } else if (action === 'sign_server') {
        const params = {
          token:'087e6d939b48eb0232eea7ce45cd4b22',
          app_name: 'aanets'
        }
        axios({
          method: 'post',
          url:'/rdp/server',
          data:params
        }).then((res)=>{
          console.log(res.data)
        });
        /*axios.post('/rdp/assign_list',
          {params:{
              token:'f496750e480d3f72570124c45a72e367',
              app_name: 'aanets'
            }}
        ).then(resp=> {
          console.log(resp.data)
        })*/
        this.outerVisibles = true
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

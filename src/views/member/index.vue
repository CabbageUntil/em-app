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
              width = "30%"
              :visible.sync="innerVisible"
              append-to-body>
              <el-table
                :data="hostData"
                style="width: 100%">
                <el-table-column
                  prop="sid"
                  label="主机编号"
                  sortable
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="ips"
                  label="IP地址"
                  sortable
                  width="180">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="selectHost(scope.$index, scope.row)">选择</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-dialog>
            <el-form :model="form">
              <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input
                v-model="form.alias"
                :disabled="true"
                autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
              label="账号"
              :label-width="formLabelWidth">
                <el-input
                :disabled="true"
                v-model="form.mobile"
                autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
              label="服务编号"
              v-show = "sid_visible"
              :label-width="formLabelWidth">
                <el-input
                :disabled="true"
                v-model="form.sid"
                autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
              label="IP地址"
              v-show="ips_visible"
              :label-width="formLabelWidth">
                <el-input
                :disabled="true"
                v-model="form.ips"
                autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item
              label="选择服务器账号"
              v-show="ips_visible"
              :label-width="formLabelWidth">
                <el-radio-group v-model="form.username">
                  <el-radio v-for="city in usernames" :label="city" :key="city">{{city}}</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item
              label="选择服务器"
              v-show="visible"
              :label-width="formLabelWidth">
                <el-button
                type="success"
                @click="innerVisible = true">选择</el-button>
              </el-form-item>
              <el-form-item
              label="权限"
              :label-width="formLabelWidth">
                <el-checkbox v-model="form.allow_assign" label="1">允许修改账户</el-checkbox>
                <el-checkbox v-model="form.allow_reboot" label="1">允许重启服务器</el-checkbox>
              </el-form-item>
              <el-form-item label="到期时间" :label-width="formLabelWidth">
                <div class="block">
                  <el-date-picker
                    v-model="form.expire_time"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                  <el-radio v-model="form.delivery" label="1">默认</el-radio>
                </div>
              </el-form-item>
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input
                type="textarea"
                v-model="form.remark"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="saveHost">确定</el-button>
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
      usernames: [],
      visible: true,
      ips_visible: false,
      sid_visible: false,
      checkedValue: 1,
      roles: this.$store.getters.roles,
      outerVisibles: false,
      innerVisible: false,
      form: {
        username: '',
        mobile: '',
        expire_time: '',
        ips: '',
        delivery: 0,
        remark: '',
        sid: '',
        allow_reboot: 0,
        allow_assign: 0,
        alias: ''
      },
      hostData: [],
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
    saveHost() {
      console.log('是否允许用户重启' + this.allow_reboot)
      this.outerVisibles = false
    },
    selectHost(index,row) {
      this.form.sid = row.sid
      this.form.ips = row.ips
      const arr = row.users
      for (var index in arr) {
        this.usernames.push(arr[index].username)
      }
      this.innerVisible = false
      this.sid != ''  ? this.visible = false : this.visible = true
      this.sid != ''  ? this.sid_visible = true : this.sid_visible = false
      this.sid != ''  ? this.ips_visible = true : this.ips_visible = false
    },
    onAction (action, rowData, rowIndex) {
      this.visible = true
      this.ips_visible = false
      this.sid_visible = false
      this.usernames = []
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
        this.form.alias = rowData.name
        this.form.mobile = rowData.onenetOwner
        const params = {
          token: this.$store.state.user.token,
          app_name: 'aanets'
        }
        axios({
          method: 'post',
          url:'/rdp/server',
          data:params
        }).then((res)=>{
          //this.hostData = res.data.result
          this.hostData = [
            {
              sid: '9417',
              system: "unknown",
              network_state: 1,
              system_name: "win2008 x64",
              ips: "110.165.41.27",
              online: 0,
              group_id: 0,
              last_remote: "",
              local: 0,
              port: 3389,
              rdp: 12490,
              remark: "",
              expire_time: 1567176468,
              allow_reboot: 1,
              allow_upinfo: 1,
              rdp_show: 1,
              users: [
                  {
                      "username": "administrator",
                      "password": "WVdSdGFXNGhVV0V6TWc9PQ==",
                      "groups": "",
                      "state": "",
                      "userDes": ""
                  },
                    {
                      "username": "user",
                      "password": "WVdSdGFXNGhVV0V6TWc9PQ==",
                      "groups": "",
                      "state": "",
                      "userDes": ""
                  },
                    {
                      "username": "admin",
                      "password": "WVdSdGFXNGhVV0V6TWc9PQ==",
                      "groups": "",
                      "state": "",
                      "userDes": ""
                  }
              ]
          },
          {
              sid: '9478',
              system: "unknown",
              network_state: 1,
              system_name: "win2008 x64",
              ips: "110.165.61.62",
              online: 0,
              group_id: 0,
              last_remote: "",
              local: 0,
              port: 3389,
              rdp: 12490,
              remark: "",
              expire_time: 1567176468,
              allow_reboot: 1,
              allow_upinfo: 1,
              rdp_show: 1,
              users: [
                {
                  "username": "user",
                  "password": "WVdSdGFXNGhVV0V6TWc9PQ==",
                  "groups": "",
                  "state": "",
                  "userDes": ""
                },
                {
                  "username": "admin",
                  "password": "WVdSdGFXNGhVV0V6TWc9PQ==",
                  "groups": "",
                  "state": "",
                  "userDes": ""
              }]
          },
          {
              sid: '10001',
              system: "unknown",
              network_state: 1,
              system_name: "win2008 x64",
              ips: "110.164.61.62",
              online: 0,
              group_id: 0,
              last_remote: "",
              local: 0,
              port: 3389,
              rdp: 12490,
              remark: "",
              expire_time: 1567176468,
              allow_reboot: 1,
              allow_upinfo: 1,
              rdp_show: 1,
              users: [
                {
                  "username": "penghaijie",
                  "password": "WVdSdGFXNGhVV0V6TWc9PQ==",
                  "groups": "",
                  "state": "",
                  "userDes": ""
                },
                {
                  "username": "admin",
                  "password": "WVdSdGFXNGhVV0V6TWc9PQ==",
                  "groups": "",
                  "state": "",
                  "userDes": ""
              }]
          }
          ]
          
        })
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

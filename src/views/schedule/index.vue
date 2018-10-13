<template>
  <div class="dashboard-joinCom-container">
    <el-row>
      <el-col :lg="24">
        <el-tag type="warning">时间段</el-tag>
        <el-date-picker
          v-model="start_time"
          value-format="timestamp"
          clearable
          :editable="false"
          placeholder="请选择开始时间"
          type="date"/>
        <el-tag type="warning">-</el-tag>
        <el-date-picker
          v-model="end_time"
          :editable="false"
          placeholder="请选择结束时间"
          value-format="timestamp"
          clearable
          type="date"/>
        <el-tag type="warning">部门</el-tag>
        <el-select
          filterable
          clearable
          v-model="header_deptId"
          placeholder="请选择查询部门">
          <el-option
            v-for="item in options"
            :key="item.deptId"
            :label="item.deptName"
            :value="item.deptId">
          </el-option>
        </el-select>
        <el-button
          type="primary"
          size="small"
          plain
          @click="dialogFormVisible = true">
          {{ $t('table.buttonHint.scheduleList.radio.create_schedule') }}
        </el-button>
        <el-button
          type="danger"
          size="small"
          @click="selectRows()"
          plain>
          {{ $t('table.buttonHint.scheduleList.radio.all_remove') }}
        </el-button>
      </el-col>

      <el-dialog
        :title="$t('table.buttonHint.scheduleList.radio.create_schedule')"
        :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item
            :label="$t('table.fields.scheduleList.deptName')"
            :label-width="formLabelWidth">
            <el-select
              filterable
              clearable
              :is-required="true"
              @change="selectList()"
              v-model="form.deptId"
              placeholder="请选择查询部门">
              <el-option
                v-for="item in add_options"
                :key="item.deptId"
                :label="item.deptName"
                :value="item.deptId">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            :label="$t('table.fields.scheduleList.memberName')"
            :label-width="formLabelWidth">
            <el-select
              filterable
              clearable
              :is-required="true"
              v-model="form.memberId"
              placeholder="请选择员工信息">
              <el-option
                v-for="item in member_option"
                :key="item.memberId"
                :label="item.memberName"
                :value="item.memberId">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            :label="$t('table.fields.scheduleList.createDatetime')"
            :label-width="formLabelWidth">
            <el-date-picker
              v-model="form.createDatetime"
              type="datetime"
              :is-required="true"
              placeholder="选择日期时间"/>
          </el-form-item>

          <el-form-item
            :label="$t('table.fields.scheduleList.note1')"
            :label-width="formLabelWidth">
            <el-input
              v-model="form.note1"
              type="text"
              clearable
              auto-complete="off"/>
          </el-form-item>

          <el-form-item
            :label="$t('table.fields.scheduleList.note2')"
            :label-width="formLabelWidth">
            <el-input
              clearable
              v-model="form.note2"
              type="textarea"
              auto-complete="off"/>
          </el-form-item>

          <el-form-item
            :label="$t('table.fields.scheduleList.note3')"
            :label-width="formLabelWidth">
            <el-input
              clearable
              v-model="form.note3"
              type="textarea"
              auto-complete="off"/>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer">
          <el-button
            @click="dialogFormVisible = false">{{ $t('form.common.message.cancel') }}</el-button>
          <el-button
            type="primary"
            @click="onAction('add', '', '')">{{ $t('form.common.message.confirm') }}</el-button>
        </div>
      </el-dialog>
    </el-row>

    <el-row>
      <el-dialog
        :title="$t('table.buttonHint.scheduleList.radio.schedule_detail')"
        :visible.sync="editFormVisible">
        <el-form :model="editform">
          <el-form-item
            :label="$t('table.fields.scheduleList.deptName')"
            :label-width="formLabelWidth">
            <el-input
              v-model="editform.deptName"
              auto-complete="off"/>
          </el-form-item>

          <el-form-item
            :label="$t('table.fields.scheduleList.memberName')"
            :label-width="formLabelWidth">
            <el-input
              v-model="editform.memberName"
              auto-complete="off"/>
          </el-form-item>

          <el-form-item
            :label="$t('table.fields.scheduleList.createDatetime')"
            :label-width="formLabelWidth">
            <el-date-picker
              v-model="editform.arrange_date"
              type="date"
              placeholder="选择日期时间"/>
          </el-form-item>

          <el-form-item
            :label="$t('table.fields.scheduleList.note1')"
            :label-width="formLabelWidth">
            <el-input
              v-model="editform.note1"
              type="textarea"
              auto-complete="off"/>
          </el-form-item>

          <el-form-item
            :label="$t('table.fields.scheduleList.note2')"
            :label-width="formLabelWidth">
            <el-input
              v-model="editform.note2"
              type="textarea"
              auto-complete="off"/>
          </el-form-item>
          <el-form-item
            :label="$t('table.fields.scheduleList.note3')"
            :label-width="formLabelWidth">
            <el-input
              v-model="editform.note3"
              type="textarea"
              auto-complete="off"/>
          </el-form-item>

        </el-form>
      </el-dialog>
    </el-row>

    <el-row>
      <my-vuetable
        :api-url="apiUrl"
        ref="apartmentListTable"
        trackBy="agendaId"
        :fields="existScheduleTableFields"
      >
        <div
          slot="actions"
          slot-scope="props">
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('table.buttonHint.scheduleList.remove')"
            placement="top"
          >
            <el-button
              type="danger"
              @click="onAction('remove', props.rowData, props.rowIndex)"
              circle
              icon="el-icon-delete"/>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('table.buttonHint.scheduleList.view')"
            placement="top"
          >
            <el-button
              type="success"
              @click="handleEdit(props.rowData)"
              circle
              icon="el-icon-document"/>
          </el-tooltip>
        </div>
      </my-vuetable>
    </el-row>
  </div>
</template>
<script>
import MyVuetable from '@/components/Table/MyVuetable'
import { existScheduleTableFields } from './fields.js'
import { selectdeptList } from '@/api/apartment'
import { memSelectList } from '@/api/member'
import { removeSchedule, addSchedule,scheduleList, removeSchedules } from '@/api/schedule'
export default {
  data () {
    return {
      multipleSelection: [],
      header_deptId: '',
      add_option: [],
      options: [],
      member_option: [],
      start_time: '',
      end_time: '',
      form: {
        note1: '',
        note2: '',
        note3: '',
        deptId: '',
        memberId: '',
        createDatetime: ''
      },
      editform: {
        agendaName: '',
        memberName: '',
        deptName: '',
        agendaId: '',
        orgId: '',
        memberId: '',
        deptId: '',
        note1: '',
        note2: '',
        note3: '',
        arrange_date: ''
      },
      dialogTableVisible: false,
      editFormVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  formLabelWidth: '120px',
  components: {
    MyVuetable
  },
  computed: {
    existScheduleTableFields () {
      return existScheduleTableFields
    },
    apiUrl () {
      var _this = this
      return '/org/scheduleList?date1='+ _this.start_time +'&date2='+_this.end_time+'&deptId='+_this.header_deptId
    }
  },
  methods: {
    selectRows () {
      let tableObj = this.$refs.apartmentListTable.$refs.vuetable
      let selectIds = this.$refs.apartmentListTable.$refs.vuetable.selectedTo
      if (selectIds.length > 0) {
        removeSchedules(selectIds).then(response => {
          const data = response.code
          if (data === 0) {
            this.$message({
              message: this.$t('table.buttonAction.removeSchedule.success'),
              type: 'success'
            })
            tableObj.reload()
          } else {
            this.$message.error(this.$t('table.buttonAction.removeSchedule.fail'))
          }
        }).catch(error => {
          this.$message.error(this.$t('table.buttonAction.removeSchedule.fail') + ': ' + error)
        })
      } else {
        this.$message.error(this.$t('请选择删除日程！！'))
      }
    },
    selectList () {
      var _this = this
      var id = _this.form.deptId
      memSelectList(id).then(function (res) {
        _this.member_option = res.data.data
      }).catch(function (error) {
        console.log(error)
      })
    },
    handleEdit (row) {
      this.editFormVisible = true
      this.editform = Object.assign({}, row)
    },
    onAction (action, rowData, index) {
      let tableObj = this.$refs.apartmentListTable.$refs.vuetable
      if (action === 'add') {
        var _this = this
        const param = {
          note1: _this.form.note1,
          note2: _this.form.note2,
          note3: _this.form.note3,
          memberId: _this.form.memberId,
          deptId: _this.form.deptId,
          createDatetime: (_this.form.createDatetime).getTime()
        }
        addSchedule(param).then(response => {
          const data = response.code
          if (data === 0) {
            this.form.note1 = ''
            this.form.note2 = ''
            this.form.note3 = ''
            this.$message({
              message: this.$t('table.buttonAction.addSchedule.success'),
              type: 'success'
            })
            tableObj.reload()
          } else {
            this.$message.error(this.$t('table.buttonAction.addSchedule.fail'))
          }
        }).catch(error => {
          this.$message.error(this.$t('table.buttonAction.addSchedule.fail') + ': ' + error)
        })
        this.dialogFormVisible = false
      } else if (action === 'remove') {
        this.$confirm(this.$t('table.buttonAction.removeSchedule.message.content').replace('%{name}', rowData.agendaId),
          this.$t('table.buttonAction.removeSchedule.message.title'),
          {
            confirmButtonText: this.$t('form.common.message.confirm'),
            cancelButtonText: this.$t('form.common.message.cancel'),
            type: 'warning'
          }
        ).then(() => {
          removeSchedule(rowData.agendaId).then(response => {
            const data = response
            if (data.code === 0) {
              this.$message({
                message: this.$t('table.buttonAction.removeSchedule.success'),
                type: 'success'
              })
              tableObj.reload()
            } else {
              this.$message.error(this.$t('table.buttonAction.removeSchedule.fail'))
            }
          }).catch((error) => {
            this.$message.error(this.$t('table.buttonAction.removeSchedule.fail') + ': ' + error)
          })
        }).catch(() => {
          this.$message(this.$t('form.common.message.cancel'))
        })
      }
    }
  },
  mounted: function () {
    var _this = this
    selectdeptList().then(function (res) {
      _this.options = res.data.data
      _this.add_options = res.data.data
    }).catch(function (error) {
      console.log(error)
    })
  }

}
</script>
<style lang="stylus" scoped>
  .dashboard-joinCom-container
    padding: 32px
    background-color: rgb(240, 242, 245)
  ._input
    width: 268px
</style>

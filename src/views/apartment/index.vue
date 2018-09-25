<template>
  <div class="dashboard-joinCom-container">
    <el-row>
      <el-row
        :gutter="20">
        <el-col
          :span="12"
          :offset="1">
          <el-radio-group v-model="status">
            <el-radio
              type="check"
              :label="1">{{ $t('table.buttonHint.apartment.radio.note1') }}</el-radio>
            <el-radio :label="0">{{ $t('table.buttonHint.apartment.radio.note2') }}</el-radio>
            <el-radio :label="3">{{ $t('table.buttonHint.apartment.radio.note3') }}</el-radio>
          </el-radio-group>
           <el-button type="primary" style="margin-left:15px;"  @click="dialogFormVisible = true"  plain>新建部门</el-button>
        </el-col>
      </el-row>
    </el-row>
    <el-row>
      <my-vuetable
        :api-url="apiUrl"
        ref="apartmentListTable"
        :fields="existComTableFields"
      >
        <div
          slot="actions"
          slot-scope="props">
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('table.buttonHint.apartment.remove')"
            placement="top"
          >
            <el-button
              type="danger"
              @click="onAction('remove', props.rowData, props.rowIndex)"
              plain
              icon="el-icon-delete"/>
          </el-tooltip>
        </div>
      </my-vuetable>

      <el-dialog title="新建部门" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="部门名称" :label-width="formLabelWidth">
            <el-input
              placeholder="请输入部门名称"
              v-model="form.deptName"
              clearable>
            </el-input>
          </el-form-item>

          <el-form-item label="上级部门" :label-width="formLabelWidth" clearable>
            <el-select  filterable  clearable v-model="form.parentId" placeholder="请选择上级部门">
              <el-option
                v-for="item in options"
                :key="item.deptId"
                :label="item.deptName"
                :value="item.deptId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveInfo()">确 定</el-button>
        </div>
      </el-dialog>

    </el-row>
  </div>
</template>
<script>
import MyVuetable from '@/components/Table/MyVuetable'
import { existApartmentTableFields } from './fields.js'
import { removeApartment , addApartment , selectdeptList } from '@/api/apartment'
export default {
  name: 'Apartment',
  data () {
    return {
      value:'',
      options:[],
      status: 1,
      dialogFormVisible: false,
      form: {
        deptName: '',
        parentId:''
      },
      formLabelWidth: '120px'
    }
  },
  components: {
    MyVuetable
  },
  computed: {
    existComTableFields () {
      return existApartmentTableFields
    },
    apiUrl () {
      return '/org/apartmentList?type=' + this.status
    }
  },
  methods: {
    saveInfo(){
      let tableObj = this.$refs.apartmentListTable.$refs.vuetable
      addApartment(this.form).then(response => {
        this.dialogFormVisible = false
        const data = response
        if (data.code === 0) {
          this.$message({
            message: "添加部门成功！！",
            type: 'success'
          })
          tableObj.reload()
        } else {
          this.$message({
            message: "添加部门失败！！",
            type: 'success'
          })
        }
      }).catch((error) => {
        this.$message.error(this.$t('table.buttonAction.removeApartment.fail') + ': ' + error)
      })
    },
    onAction (action, rowData, rowIndex) {
      let tableObj = this.$refs.apartmentListTable.$refs.vuetable
      if (action === 'remove') {
        this.$confirm(this.$t('table.buttonAction.removeApartment.message.content').replace('%{name}', rowData.deptName),
          this.$t('table.buttonAction.removeApartment.message.title'),
          {
            confirmButtonText: this.$t('form.common.message.confirm'),
            cancelButtonText: this.$t('form.common.message.cancel'),
            type: 'warning'
          }
        ).then(() => {
          removeApartment(rowData.deptId).then(response => {
            const data = response
            if (data.code === 0) {
              this.$message({
                message: this.$t('table.buttonAction.removeApartment.success'),
                type: 'success'
              })
              tableObj.reload()
            } else {
              this.$message.error(this.$t('table.buttonAction.removeApartment.fail'))
            }
          }).catch((error) => {
            this.$message.error(this.$t('table.buttonAction.removeApartment.fail') + ': ' + error)
          })
        }).catch(() => {
          this.$message(this.$t('form.common.message.cancel'))
        })
      }
    }
  },
  mounted: function () {
    var _this = this   //很重要！！
    selectdeptList().then(function (res) {
            _this.options = res.data.data
        })
        .catch(function (error) {
            console.log(error);
    });
  }
}
</script>
<style lang="stylus" scoped>
  .dashboard-joinCom-container
    padding: 32px
    background-color: rgb(240, 242, 245)
</style>

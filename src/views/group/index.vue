<template>
  <div class="content">
    <el-container>
      <el-aside style="width: 40%">
        <el-container>
          <el-header>
            <el-row>
              <el-col :span="8">
                <el-input style="margin: 35px 8px;" v-model="name" placeholder="请输入内容"></el-input>
              </el-col>
              <el-col :span="15">
                <el-button style="margin: 35px 9px;" type="info">查询组员</el-button>
              </el-col>
            </el-row>
          </el-header>
          <el-main>
            <el-table
              :data="tableData3"
              height="500"
              border
              style="width: 100%">
              <el-table-column
                type="selection"
                width="45">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="120">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="电话"
                width="120">
              </el-table-column>
              <el-table-column
                width="250"
                label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="findInfo(scope.$index, scope.row)">查看</el-button>
                  <el-button
                    size="mini"
                    type="success"
                    @click="handleEdit(scope.$index, scope.row)">分配</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @row-click="handleDelete(scope.$index, scope.row)">移除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-aside>
      <el-main style="margin: 80px;">
        <div v-show="visible" ref="main">
          <el-table
            border
            :data="tableData4"
            style="width: 100%"
            max-height="250">
            <el-table-column
              fixed
              prop="sid"
              label="主机编号"
              width="200">
            </el-table-column>
            <el-table-column
              prop="system_name"
              label="系统名称"
              width="240">
            </el-table-column>
            <el-table-column
              prop="expire_time"
              label="过期时间"
              width="240">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="120">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, tableData4)"
                  type="text"
                  size="small">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>


    <el-dialog title="分配主机" :visible.sync="outerVisible">
      <el-dialog
        width="30%"
        title="内层 Dialog"
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
        <el-button @click="outerVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
import axios from 'axios'
import { getServer } from '@/api/company'
name: 'GroupList'
export default {
  data() {
    return {
      visible: false,
      name:'',
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
      hostform: {
        sid: '',
        system_name: ''
      },
      tableData4: [],
      tableData3: [{
        id: '1',
        phone: '1111111',
        name: '张三'
      }, {
        id: '2',
        phone: '2222222',
        name: '李四'
      }, {
        id: '3',
        phone: '3333333',
        name: '王小虎'
      }, {
        id: '4',
        phone: '444444',
        name: '万凯'
      }, {
        id: '5',
        phone: '5555555',
        name: '张扬'
      }, {
        id: '5',
        phone: '6666666',
        name: '李虎'
      }, {
        id: '7',
        phone: '7777777',
        name: '张晓凯'
      }, {
        id: '8',
        phone: '8888888',
        name: '武鸣'
      }, {
        id: '9',
        phone: '9999999',
        name: '王小虎'
      }, {
        id: '10',
        phone: '10101010',
        name: '龙王'
      }, {
        id: '11',
        phone: '110110111011',
        name: '王小虎'
      }],
      multipleSelection: [],
      outerVisible: false,
      innerVisible: false,
      main_content: false,
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleEdit(index, row) {
      this.form.alias = row.name;
      this.form.mobile  = row.phone;
      this.outerVisible = true;
    },
    findInfo(index, row) {
      //读取常用商品列表
      axios.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/oftenGoods')
        .then(response => {
          this.tableData4 = [
            {
              sid: '9566',
              system_name: 'win20008 X64',
              expire_time: '2018-10-12'
            },
            {
              sid: '9568',
              system_name: 'win20008 X64',
              expire_time: '2018-10-25'
            },
            {
              sid: '9563',
              system_name: 'win20008 X64',
              expire_time: '2018-10-30'
            },
            {
              sid: '9564',
              system_name: 'win20008 X64',
              expire_time: '2018-10-18'
            }
          ];
          this.visible ? this.hide() : this.show()
        })
        .catch(error => {
          console.log(error);
          alert('网络错误，不能访问');
        })
      /*getServer().then(response => {
        this.tableData4 = response.data;
        this.visible ? this.hide() : this.show()
      })*/
      .catch(error => {
        console.log(error);
        alert('网络错误，不能访问');
      })
    },
    show () {
      this.visible = true
      document.addEventListener('click', this.hidePanel, false)
    },
    hide () {
      this.visible = false
      document.removeEventListener('click', this.hidePanel, false)
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }

}
</script>

<style scoped>
</style>

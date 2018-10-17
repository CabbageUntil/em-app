<template>
  <div>
    <el-container class="container">
        <el-header class="header" style="height: 89px;border-radius: 5px;">
          <el-row :gutter="24" style="padding-top: 24px;">
          <el-col :span="4">
              <el-input
              v-model="criteria"
              clearable 
              placeholder="请输入成员姓名">
              </el-input>
          </el-col>
          <el-col :span="2">
            <el-button
            type="success"
            @click="search"
            icon="el-icon-search" >查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button
            v-show="showBtn()"
            type="primary"
            icon="el-icon-edit" @click="outerVisible = true">添加成员</el-button>
          </el-col>
          <el-col :span="4" :offset="12">
          <el-button
            type="danger"
            size = "mini"
            @click="handleLogoutGroupClick">
            {{ $t('dashboard.welcomeText.btn.exit1') }}
          </el-button>
          </el-col>
        </el-row>
        </el-header>
        <el-main>
          <el-table
            :data="groupMemberData"
            stripe
            border
            style="width: 100%">
            :row-class-name="tableRowClassName"
            <el-table-column
            prop="name"
            label="姓名">
            </el-table-column>

            <el-table-column
            prop="mebile"
            label="联系方式">
            </el-table-column>
            <el-table-column label="操作" width="400">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type= "danger"
                  icon="el-icon-delete"
                  v-show="showBtn()"
                  @click="deleteServer(scope.$index, scope.row)"
                  >删除</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-share"
                  @click="siginServer(scope.$index, scope.row)"
                  >分配服务器</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="searchServer(scope.$index, scope.row)"
                  >移除服务器</el-button>
              </template>
            </el-table-column>
        </el-table>

         <!-- 分配虚拟主机 -->
          <el-dialog title="分配服务器" :visible.sync="outerVisibles">
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
                <el-table-column
                  prop="expire_time"
                  v-if="false"
                  label="过期时间"
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
              v-show="false"
              :label-width="formLabelWidth">
                <el-input
                :disabled="true"
                v-model="form.expire_time"
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
                @click="innerVisible = true">选择服务器</el-button>
              </el-form-item>
              <el-form-item
              label="权限"
              :label-width="formLabelWidth">
                <el-switch
                on-value="1"
                off-value="0"
                inactive-text="允许修改用户"
                v-model="form.allow_upinfo"></el-switch>
                <el-switch
                on-value="1"
                off-value="0"
                inactive-text="是否允许重启"
                v-model="form.allow_reboot"></el-switch>
              </el-form-item>
              <el-form-item label="到期时间" :label-width="formLabelWidth">
                <div class="block">
                  <el-date-picker
                    v-model="form.datetime"
                    type="datetime"
                    value-format="timestamp"
                    placeholder="选择日期">
                  </el-date-picker>
                  <el-switch
                  on-value="1"
                  off-value="0"
                  inactive-text="默认服务器时间"
                  v-model="form.datestatus"></el-switch>
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

        <!-- 分给改组组员的主机数 -->
        <el-dialog
            :visible.sync="searcheServerDialog"
            width="60%"
            center>
            <el-table
              border
              :data="hostList"
              style="width: 100%"
              max-height="200">
              <el-table-column
                prop="alias"
                label="用户名称"
                width="120">
              </el-table-column>
              <el-table-column
                prop="sid"
                label="服务编号"
                width="120">
              </el-table-column>
              <el-table-column
                prop="username"
                label="系统账户"
                width="150">
              </el-table-column>
              <el-table-column
                prop="ips"
                label="IP地址"
                width="220">
              </el-table-column>
              <el-table-column
                prop="expire_time"
                :formatter="dateFormat" 
                label="到期日期">
              </el-table-column>
              <el-table-column
                label="操作"
                width="120">
                <template slot-scope="scope">
                  <el-button
                    @click="deleteRow(scope.$index, scope.row)"
                    type="danger"
                    size="small">
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>  
          </el-dialog>

          <!--添加成员-->
           <el-dialog title="添加群组成员" :visible.sync="outerVisible">
              <el-dialog
              width="30%"
              title="内层 Dialog"
              :visible.sync="innerVisible"
              append-to-body>
              </el-dialog>
              <el-container>
                <el-main width = "200">
                  <el-form ref="addform" :model="addform" label-width="80px">
                      <el-form-item label="姓名">
                        <el-input v-model="addform.name"></el-input>
                      </el-form-item>
                      <el-form-item label="联系电话">
                        <el-input v-model="addform.mebile"></el-input>
                      </el-form-item>
                    </el-form>
                </el-main>
              </el-container>
            <div slot="footer" class="dialog-footer">


              <el-button @click="outerVisible = false">取 消</el-button>
              <el-button type="primary" @click="innerVisible = true">确定</el-button>
            </div>
          </el-dialog> 

        <div align="center" style="padding: 20px 19px;">
          <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 30, 50, 100, 200, 500, 1000]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount">
          </el-pagination>
        </div>
       </el-main>
    </el-container>
   </div>
</template>
<script>
import Vue from 'vue'
import Qs from 'qs'
import {deleteGroupMember } from '@/api/group'
import axios from 'axios'
  export default {
    data() {
      return {
        outerVisible: false,
        innerVisible: false,
        addform: {
          name: ''
        },
        groupMemberData: [],
        //表格当前页数据
        tableData: [],
        //多选数组
        multipleSelection: [],
        //请求的URL
        url:'newstu/querystudentbypage',
        //搜索条件
        criteria: '',
        //下拉菜单选项
        select: '',
        //默认每页数据量
        pagesize: 10,
        //默认高亮行数据id
        highlightId: -1,
        //当前页码
        currentPage: 1,
        //查询的页码
        start: 1,
        //默认数据总数
        totalCount: 0,
        //服务器分配内容
        // 0 待审核、1 已加入、2 已离职、3 全部
        usernames: [],
        visible: true,
        ips_visible: false,
        sid_visible: false,
        checkedValue: 1,
        roles: this.$store.getters.roles,
        outerVisibles: false,
        innerVisible: false,
        searcheServerDialog: false,
        hostList: [],
        form: {
          username: 'administrator',
          mobile: '',
          expire_time: '',
          datetime: '',
          ips: '',
          delivery: '0',
          remark: '',
          sid: '',
          allow_upinfo: '0',
          allow_reboot: '0',
          allow_assign: '0',
          alias: '',
          datestatus: '1'
        },
        hostData: [],
        formLabelWidth: '120px'
      }
    },
    methods:{
        //查询分给该组员的主机数      
        searchServer(index,row){
          const mebile = row.mebile
          const params = {
            token: this.$store.state.user.token,
            assign_user: mebile,
            app_name: 'aanets'
          }
          axios({
            method: 'post',
            url:'/rdp/assign_list',
            data:params
          }).then((res)=>{
            if(res.data.result.length===0) {
              this.$message({
                message: '您没有给该组员分配服务器，没有服务器可以移除！',
                type: 'warning'
              })
            } else {
              this.hostList = res.data.result
              this.searcheServerDialog = true
            }
          })
        },
        //移除服务器
        deleteRow(index, rows){
          const params = {
            token: this.$store.state.user.token,
            hostid: rows.id,
            app_name: 'aanets'
          }
          axios({
            method: 'post',
            url:'/rdp/remove_service',
            data:params
          }).then((res)=>{
            if(res.data.code === 0){
              this.$message({
                message: '成功移除对改用户分配的服务器！',
                type: 'success'
              })
              this.searcheServerDialog = false
            }
          })
        },
        //服务器的分配保存
        saveHost() {
          var upstatus
          var bootstatus
          var datetime
          this.form.allow_upinfo ? upstatus = 1 : upstatus = 0
          this.form.allow_reboot ? bootstatus = 1 : bootstatus = 0
          if(this.form.sid === '') {
            this.$alert('请选择服务器', '温馨提醒')
          } else {
            if(this.form.datetime ===''&&!this.form.datestatus){
              this.$alert('请选择截止时间', '温馨提醒')
            } else {
              if(this.form.datestatus){
                datetime =  this.form.expire_time
                //this.outerVisibles = false
              } else{
                datetime =  this.form.datetime/1000
              }
              //分配虚拟主机
              const params = {
                sid: this.form.sid,
                token: this.$store.state.user.token,
                mobile: this.form.mobile,
                auto_assign: 0,
                username: this.form.username,
                expire_time: datetime,
                allow_reboot: bootstatus,
                allow_upinfo: upstatus,
                remark: this.form.remark,
                alias: this.form.alias,
                app_name: 'aanets'
              }
              axios({
                method: 'post',
                url:'/rdp/assign_service',
                data:params
              }).then((res)=>{
                if(res.data.code === 0){
                  this.$message({
                    message: '成功分配主机给群组成员——'+ this.form.alias,
                    type: 'success'
                  })
                  this.outerVisibles = false
                }else{
                  this.$message({
                    message: '分配服务器失败！'+res.data.detail,
                    type: 'error'
                  })
                }
              })
            }
          }
      },
      showBtn(){
          const role = this.$store.getters.roles[0]
          if(role === 'groupLeader'){
            return true
          } else {
             return false
          }
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      search: function(){
          this.loadData(this.criteria, this.currentPage, this.pagesize);
      },
      loadData: function(criteria, pageNum, pageSize){                    
         axios({
            url: '/org/selectViewGroupList',
            method: 'post',
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
            headers: {
                'deviceCode': 'A95ZEF1-47B5-AC90BF3'
            },
            data: {
              name: this.criteria,
              page: pageNum,
              per_page: pageSize
            }
        }).then((res)=>{
          this.totalCount = res.data.data.last_page
          this.currentPage = res.data.data.current_page
          this.groupMemberData = res.data.data.data
        })             
      },
      //每页显示数据量变更
      handleSizeChange: function(val) {
          this.pagesize = val;
          this.loadData(this.criteria, this.currentPage, this.pagesize);
      },
      //页码变更
      handleCurrentChange: function(val) {
          this.currentPage = val;
          this.loadData(this.criteria, this.currentPage, this.pagesize);
      },
      //选择服务器
      selectHost(index,row) {
        this.form.sid = row.sid
        this.form.ips = row.ips
        this.form.expire_time = row.expire_time
        const arr = row.users
        for (var index in arr) {
          this.usernames.push(arr[index].username)
        }
        this.innerVisible = false
        this.sid != ''  ? this.visible = false : this.visible = true
        this.sid != ''  ? this.sid_visible = true : this.sid_visible = false
        this.sid != ''  ? this.ips_visible = true : this.ips_visible = false


      },
      //分配服务器
      siginServer(index,row){
        this.visible = true
        this.ips_visible = false
        this.sid_visible = false
        this.usernames = []
        this.hostList = []
        this.form.sid = ''
        this.form.alias = row.name
        this.form.mobile = row.mebile
        const params = {
          token: this.$store.state.user.token,
          app_name: 'aanets'
        }
        
        axios({
          method: 'post',
          url:'/rdp/server',
          data:params
        }).then((res)=>{
          this.hostData = res.data.result
        })
        this.outerVisibles = true

      },
      //移除群组成员
      deleteServer(index,row){
        const param = {groupMemberId: row.groupMemberId}
        deleteGroupMember(param).then(response => {
          if (response.code === 0) {
            this.$message({
              message: '删除群组成员成功！',
              type: 'success'
            })
            axios({
                method: 'post',
                url:'/org/selectViewGroupList',
                data: ''
            }).then((res)=>{
                this.groupMemberData = res.data.data.data
            })
          }
        })
      },
      dateFormat(row, column, cellValue, index){
        var dateMat = new Date(cellValue*1000)
        const year = dateMat.getFullYear();
        const month = dateMat.getMonth() + 1;
        const day = dateMat.getDate();
        const hh = dateMat.getHours() < 10 ? '0' + dateMat.getHours():dateMat.getHours() ;
        const mm = dateMat.getMinutes() < 10 ? '0' + dateMat.getMinutes() : dateMat.getMinutes() ;
        const ss = dateMat.getSeconds() < 10 ? '0' + dateMat.getSeconds() : dateMat.getSeconds();
        const timeFormat= year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
        return timeFormat;
      },
      handleLogoutGroupClick () {
        // 登出群组
        Promise.all([
          this.$store.dispatch('GroupLogout'),
          this.$store.dispatch('toggleLogoutGroup', true)
        ]).then((result) => {
          this.$router.push({ path: '/' })
        }).catch((error) => {
          console.log('登出群组失败：%o', error)
        })
      },
      handleLoginGroup () {
        if (this.$store.getters.isLoginGroup) {
          this.$store.dispatch('delOthersViews', { path: this.$route.path })
          this.$store.dispatch('toggleLoginGroup', false)
        } else {
          this.$store.dispatch('delVisitedViews', { path: '/dashboard' })
        }
      }
    },      
    activated () {
      this.handleLoginGroup()
    },
    mounted: function (){
        axios({
            url: '/org/selectViewGroupList',
            method: 'post',
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
            headers: {
                'deviceCode': 'A95ZEF1-47B5-AC90BF3'
            },
            data: {
              name: this.criteria,
              page: 1,
              per_page:this.pagesize
            }
        }).then((res)=>{
          this.totalCount = res.data.data.last_page
          this.currentPage = res.data.data.current_page
          this.groupMemberData = res.data.data.data
        })
        this.handleLoginGroup()
    }
  }
</script>

<style scoped>
  .container{
    width:99.8%;
    height:500px;
    padding:10px
  }
  .header{
    background: #2196f317;
  }
  .el-table .warning-row {
    background: oldlace;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

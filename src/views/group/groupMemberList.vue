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
          <el-col :span="3">
            <el-button
            v-show="showBtn()"
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="openaddMeber">添加成员</el-button>
          </el-col>
          <el-col :span="4" :offset="8">
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
            :row-class-name="tableRowClassName"
            style="width: 100%">
            <el-table-column    type="expand">
               <template style="padding: 0px 0px;"  slot-scope="scope">
                  <childtable  :mebile="scope.row.mebile"></childtable>
              </template>
            </el-table-column>
            
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
                  type="primary"
                  icon="el-icon-tickets"
                  @click="searchServer(scope.$index, scope.row)"
                  >查看分配服务器</el-button>
              </template>
            </el-table-column>
        </el-table>

         <!-- 分配虚拟主机 -->
          <el-dialog  title="分配服务器" :visible.sync="outerVisibles">
            <el-dialog
              width = "30%"
              :visible.sync="innerVisible"
              append-to-body>
              <el-table
                :data="hostData"
                style="width: 100%">
                <el-table-column
                  prop="sid"
                  label="服务编号"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="ips"
                  label="IP地址"
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
              label="选择服务器"
              v-show="visible"
              :label-width="formLabelWidth">
                <el-button
                type="success"
                @click="innerVisible = true">{{buttonText}}</el-button>
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
              label="选择账户"
              v-show="ips_visible"
              :label-width="formLabelWidth">
                <el-switch
                  on-value="1"
                  off-value="0"
                  inactive-text="自动选择"
                  v-model="form.auto_select_system"></el-switch><br>
                  <div class="user_checkbox">
                    <el-radio-group v-model="form.username">
                      <el-radio v-for="city in usernames" :label="city" :key="city">{{city}}</el-radio>
                    </el-radio-group>
                  </div>
              </el-form-item>

              <el-form-item
              label="权限"
              :label-width="formLabelWidth">
                <el-switch
                on-value="1"
                off-value="0"
                inactive-text="允许修改组员"
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
                    @change = "DateControl"
                    value-format="timestamp"
                    placeholder="选择日期">
                  </el-date-picker><br>
                  <el-switch
                  on-value="true"
                  off-value="false"
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
              style="width: 100%">
              <el-table-column
                prop="alias"
                label="组员名称"
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
           <el-dialog width = "20%" title="添加群组成员" :visible.sync="outeraddVisible">
              <el-container>
                <el-main width = "200">
                    <table>
                        <tr>
                          <td style="text-align:right;">
                            姓名:
                          </td>
                          <td>
                            <el-autocomplete
                              style="padding:5px;width:200px;"
                              v-model="addform.name"
                              :fetch-suggestions="querySearchAsync"
                              placeholder="请输入姓名"
                              @select="handleSelectName"
                              @focus="focusPoint4"
                            ></el-autocomplete>
                          </td>
                        </tr>
                        <tr>
                          <td style="text-align:right;">
                            联系电话:
                          </td>
                          <td>
                            <el-autocomplete
                              v-model="addform.mobile"
                              style="width:200px;"
                              :fetch-suggestions="querySearchAsync3"
                              placeholder="请输入手机号码"
                              @select="handleSelectPhone"
                              @focus="focusPoint"
                            ></el-autocomplete>
                          </td>
                        </tr>
                    </table>
                </el-main>
              </el-container>
            <div slot="footer" class="dialog-footer">
              <el-button @click="outeraddVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveBtnGoup()">确定</el-button>
            </div>
          </el-dialog> 

          <!--同步通讯录添加成员-->
          <el-dialog width = "20%" title="同步电话通讯录添加群组成员":visible.sync="outeraddPhoneVisible">
              <el-container>
                <el-main>
                  <span>组员信息：</span>
                  <el-cascader
                    @change="getUserInfo"
                    placeholder="请输入组员名或者手机号"
                    :options="options"
                    filterable
                    width="400px"
                    v-model="selectValue" 
                  ></el-cascader>
                  
                </el-main>
              </el-container>
            <div slot="footer" class="dialog-footer">
              <el-button @click="outeraddPhoneVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveBtnGoupbyPhoneList()">确定</el-button>
            </div>
          </el-dialog> 

        <div align="center" style="padding: 20px 19px;">
          <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 50, 100, 200, 500, 1000]"
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
import childtable  from './childtable'
import {deleteGroupMember, saveGroupMember, checkGroupMember, addPhoneList } from '@/api/group'
import axios from 'axios'
  export default {
    components: {
        childtable
    },
    data() {
      return {
        data4: [],
        data3: [],
        timeout:  null,
        //级联选择框内容
        options:[],
        selectValue:[],
        //选择服务器标题
        buttonText: '',
        //关闭添加组员的按钮
        outeraddVisible: false,
        outeraddPhoneVisible: false,
        //添加组员输入的姓名和号码
        addform: {
          name: '',
          mobile: ''
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
        pagesize:10,
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
        //服务器编号和ip编号输入框状态
        ips_visible: false,
        sid_visible: false,
        roles: this.$store.getters.roles,
        //选择服务器弹出框状态
        outerVisibles: false,
        innerVisible: false,
        searcheServerDialog: false,
        hostList: [],
        hostList2: [],
        form: {
          username: '',
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
          auto_select_system: '0',
          alias: '',
          datestatus:false
        },
        hostData: [],
        formLabelWidth: '120px'
      }
    },
    methods:{
      //直接添加组员
      openaddMeber() {
        this.addform.name = ''
        this.addform.mobile = ''
        this.outeraddVisible = true
      },
      //打开通讯录
      openSelectPhoneList() {
        this.selectValue= []
        this.outeraddPhoneVisible = true
      },
      //获取选择的电话通讯录信息
      getUserInfo: function() {
        this.addform.name = ''
        this.addform.mobile = ''
        var arr = this.selectValue
        for (var i=0;i<arr.length;i++){
            
            if(i===0){
              this.addform.name =arr[i].replace(" ","")
            }
            if(i===1) {
              this.addform.mobile = arr[i]
            }
        }
      },
      //加载级联
      loadPhoneList: function() {
          axios({
            method: 'post',
            url:'/org/findPhoneList',
          }).then((res)=> {
              this.options = res.data.data
          })
        },
        //日期控制 组员选择时间超过当前系统时间 默认系统时间
        DateControl(){
          if(this.form.expire_time!=''){
            const ex = this.form.expire_time*1000
            const d = this.form.datetime
            //比较二者时间
            if(ex<d){
              this.$message({
                type: 'warning',
                message: '选择服务器到期时间已经超过服务器租用时间,系统默认选择服务器过期时间！'
              });
              this.form.datestatus = true
              this.form.datetime = ex
            } else {
              this.form.datetime = d
            }
          }
        },
        //通讯通信息同步
        saveBtnGoupbyPhoneList() {
          const userInfo = this.selectValue
          if(userInfo!=''&&userInfo!=null){
            this.addUserInfo(this.addform.name,this.addform.mobile,"")
          } else {
            this.$message({
              message: '请选择通讯录组员信息',
              type: 'error'
            })
          }

        },
        //保存组员的信息
        saveBtnGoup() {
           if(this.addform.name!=''&&this.addform.name!=null&&this.addform.mobile!=''&&this.addform.mobile!=null){
            this.addUserInfo(this.addform.name,this.addform.mobile,"outeraddVisible")
          } else {
            this.$message({
              message: '手机号和组员名不能为空！',
              type: 'error'
            })
          }
        },
        addUserInfo: function(name,mobile,dialogparameter){
            const checkParm = {
              mobile: mobile
            }
           //先判断该组员是否已经是群组成员
            checkGroupMember(checkParm).then(response => {
            if (response.code === 0) {
                const param = {
                  name: name,
                  mobile: mobile
                }
                saveGroupMember(param).then(response => {
                  if (response.code === 0) {
                    if(dialogparameter==='outeraddVisible') {
                        this.$confirm('添加群组成员成功！是否保存该组员信息到电话通讯录?', '温馨提醒', {
                          confirmButtonText: '保存',
                          cancelButtonText: '取消',
                          type: 'warning'
                        }).then(() => {
                          const telparams = {
                            name: name,
                            mobile: mobile
                          }
                          addPhoneList(telparams).then(response => {
                              if(response.data.code === 0){
                              //刷新远程连接通讯录号码或者姓名
                              this.loadTelList() 
                              this.loadNameList()
                               this.$confirm('该组员信息已经保存到电话通讯录！是否为该组员注册ONENET账号?', '温馨提醒', {
                                  confirmButtonText: '注册',
                                  cancelButtonText: '取消',
                                  type: 'warning'
                                }).then(() => {
                                  const registeparams = {
                                    mobile: this.addform.mobile,
                                    password: this.addform.mobile,
                                    nickname:  this.addform.name,
                                  }
                                  axios({
                                    method: 'post',
                                    url:'/rdp/tel_book_register',
                                    data:registeparams
                                  }).then((res)=> {
                                      if(res.data.result.data !=null){
                                        if(res.data.result.data.already === 1) {
                                          this.$message({
                                            type: 'success',
                                            message: '这个号码已经是ONENET账号!'
                                          })
                                          this.outeraddVisible = false
                                        }else{
                                          this.$message({
                                            type: 'success',
                                            message: '成功注册ONENET账号!'
                                          })
                                          this.outeraddVisible = false
                                        }  
                                      } else {
                                          this.$message({
                                            type: 'error',
                                            message: '注册ONENET账号失败!'
                                          })
                                          this.outeraddVisible = false
                                      }
                                  })
                                }).catch(() => {
                                  this.outeraddVisible = false
                                })
                              }
                          })
                        }).catch(() => {
                          this.$confirm('是否为该组员注册ONENET账号?', '温馨提醒', {
                            confirmButtonText: '注册',
                            cancelButtonText: '取消',
                            type: 'warning'
                          }).then(() => {
                            const registeparams = {
                              mobile: this.addform.mobile,
                              password: this.addform.mobile,
                              nickname:  this.addform.name,
                            }
                            axios({
                              method: 'post',
                              url:'/rdp/tel_book_register',
                              data:registeparams
                            }).then((res)=> {
                                if(res.data.result.data !=null){
                                  if(res.data.result.data.already === 1) {
                                    this.$message({
                                      type: 'success',
                                      message: '这个号码已经是ONENET账号!'
                                    })
                                  }else{
                                    this.$message({
                                      type: 'success',
                                      message: '成功注册ONENET账号!'
                                    })
                                  }  
                                }
                            })
                            this.outeraddVisible = false
                          }).catch(() => {
                            this.outeraddVisible = false
                          })
                        })
                    } else {
                       this.$confirm('添加群组成员成功！是否为该组员注册ONENET账号?', '温馨提醒', {
                          confirmButtonText: '注册',
                          cancelButtonText: '取消',
                          type: 'warning'
                        }).then(() => {
                          const registeparams = {
                              mobile: this.addform.mobile,
                              password: this.addform.mobile,
                              nickname:  this.addform.name,
                            }
                            axios({
                              method: 'post',
                              url:'/rdp/tel_book_register',
                              data:registeparams
                            }).then((res)=> {
                                if(res.data.result.data !=null){
                                  if(res.data.result.data.already === 1) {
                                    this.$message({
                                      type: 'success',
                                      message: '这个号码已经是ONENET账号!'
                                    })
                                  }else{
                                    this.$message({
                                      type: 'success',
                                      message: '成功注册ONENET账号!'
                                    })
                                  }  
                                }
                            })
                          this.outeraddPhoneVisible = false
                        }).catch(() => {
                          this. this.outeraddVisible  = false
                        })
                    }
                    this.loadData(this.criteria, this.currentPage, this.pagesize)
                  } else{
                    this.$message({
                      message: response.msg,
                      type: 'error'
                    })
                  }
                })
              }
          })
        },
        //查询分给该组员的主机数      
        searchServer(index,row) {
          this.loadAssignData(row.mebile)
        },
        //移除服务器
        deleteRow(index, rows) {
          const token = this.$store.state.user.token
          const params = {
            token: token,
            hostid: rows.id,
            app_name: 'aanets'
          }
          axios({
            method: 'post',
            url:'/rdp/remove_service',
            data:params
          }).then((res)=> {
            if(res.data.code === 0){
              this.$message({
                message: '成功移除对改组员分配的服务器！',
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
          this.form.allow_upinfo ? upstatus = 1 : upstatus = 0
          this.form.allow_reboot ? bootstatus = 1 : bootstatus = 0
          if(this.form.sid === '') {
            this.$alert('请选择服务器', '温馨提醒')
          } else {
            //判断系统账户是否选择
            if(this.form.username ===''&&!this.form.auto_select_system){
              this.$alert('账户选择不能为空！', '温馨提醒')
            } else {
              var datetime
              if(this.form.datestatus){
                datetime =  this.form.expire_time
                //this.outerVisibles = false
              } else{
                datetime =  this.form.datetime/1000
              }
              //分配虚拟主机
              const token = this.$store.state.user.token
              const params = {
                sid: this.form.sid,
                token: token,
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
                   this.$confirm('分配服务器失败！'+res.data.detail+".是否立即帮该组员注册帐户", '温馨提醒', {
                    confirmButtonText: '注册',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    const registeparams = {
                      mobile: this.form.mobile,
                      password: this.form.mobile,
                      nickname:  this.form.alias,
                    }
                    axios({
                      method: 'post',
                      url:'/rdp/tel_book_register',
                      data:registeparams
                    }).then((res)=> {
                      if(res.data.result.data !=null){
                        if(res.data.result.data.already === 1) {
                           this.$confirm('该组员已经注册！是否需要给相应的组员发送短信通知下载aardp', '温馨提醒', {
                            confirmButtonText: '发送',
                            cancelButtonText: '不发送',
                            type: 'warning'
                          }).then(() => {
                            
                          }).catch(() => {
                            this.outerVisibles = false  
                          });
                        } else {
                            this.$confirm('该组员注册成功！是否需要给相应的组员发送短信通知下载aardp', '温馨提醒', {
                            confirmButtonText: '发送',
                            cancelButtonText: '不发送',
                            type: 'warning'
                          }).then(() => {
                             this.$message({
                              message: '注册失败！！',
                              type: 'error'
                            })
                          }).catch(() => {
                            this.outerVisibles = false  
                          });
                        }
                      } else{
                         this.$message({
                          message: '取消！！',
                          type: 'error'
                        })
                      }
                    })
                  }).catch(() => {
                    this.$message({
                      message: '取消！',
                      type: 'error'
                    })
                    this.outerVisibles = false         
                  });
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
      //查询给指定组员分配的主机
      loadAssignData: function(mebile){
        const token = this.$store.state.user.token
        const params = {
            token: token,
            assign_user: mebile,
            app_name: 'aanets'
          }
          axios({
            method: 'post',
            url:'/rdp/assign_list',
            data:params
          }).then((res)=> {
            if(res.data.code != 0) {
              this.$message({
                message: '您没有给该组员分配服务器！！！',
                type: 'warning'
              })
            } else {
              this.hostList = res.data.result
              this.searcheServerDialog = true
            }
          })
      },
      //查询组员的数据
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
          this.totalCount = res.data.data.total
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
        //获取当前时间往后一个月的时间
        const date = new Date()
        const ex = row.expire_time*1000
        const d = date.getTime() + 3600*1000 *24*30
        //比较二者时间
        if(ex<d){
          this.form.datetime = ex
        } else {
          this.form.datetime = d
        }
        //选择服务器的时候先将服务器组员的列表清空 和 选项
        this.form.username = ''
        this.usernames = []
        for (var index in arr) {
          this.usernames.push(arr[index].username)
        }
        this.innerVisible = false
        //显示重新选择
        this.form.username = ''
        this.buttonText = this.form.ips !=''?'重选':'选择服务器'
        this.sid != ''  ? this.sid_visible = true : this.sid_visible = false
        this.sid != ''  ? this.ips_visible = true : this.ips_visible = false
      },
      //查询购买的服务器
      siginServer(index,row){

        const registeparams = {
          mobile: row.mebile,
          password: row.mebile,
          nickname:  row.name
        }
        axios({
          method: 'post',
          url:'/rdp/tel_book_register',
          data:registeparams
        }).then((res)=> {
            if(res.data.result.data !=null){
                //分配服务器内容
                this.visible = true
                this.ips_visible = false
                this.sid_visible = false
                this.usernames = []
                this.hostList = []
                this.form.sid = ''
                this.buttonText = '选择服务器'
                this.form.alias = row.name
                this.form.mobile = row.mebile
                const token = this.$store.state.user.token
                const params = {
                  token: token,
                  app_name: 'aanets',
                  is_only_sid: 1
                }
                
                axios({
                  method: 'post',
                  url:'/rdp/server',
                  data:params
                }).then((res)=>{
                  this.hostData = res.data.result
                })
                this.outerVisibles = true
            }
        })
      },
      //移除群组成员
      deleteServer(index,row){
        this.$confirm('删除群组成员前，请移除对该组员分配的服务器, 是否继续删除?', '温馨提醒', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const param = {groupMemberId: row.groupMemberId}
          deleteGroupMember(param).then(response => {
            if (response.code === 0) {
              this.$message({
                message: '删除群组成员成功！',
                type: 'success'
              }) 
              this.loadData(this.criteria, this.currentPage, this.pagesize)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })         
        })
      },
      dateFormat(row, column, cellValue, index){
        var dateMat = new Date(cellValue*1000)
        const year = dateMat.getFullYear();
        const month = (dateMat.getMonth() + 1)< 10 ? '0' + (dateMat.getMonth() + 1):(dateMat.getMonth() + 1);
        const day = dateMat.getDate()< 10 ? '0' + dateMat.getDate():dateMat.getDate();
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
          this.$router.push({ path: '/?' + +new Date() })
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
      },
      //电话通讯录 loadTelList loadNameList
      loadTelList: function() {
            axios({
              method: 'post',
              url:'/org/getTelList',
            }).then((res)=> {
                if(res.data!=null){
                  this.data3 = res.data.data
                } else{
                  this.data3 = []
                }
            })
        },
        loadNameList: function() {
            axios({
              method: 'post',
              url:'/org/getNameList',
            }).then((res)=> {
                if(res.data!=null){
                  this.data4 = res.data.data
                } else {
                  this.data4 = []
                }
            })
        },
        querySearchAsync(queryString, cb) {
          var data4 = this.data4
          var results = queryString ? data4.filter(this.createStateFilter(queryString)) : data4
          clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
            cb(results);
          }, 1000 * Math.random())
        },
        querySearchAsync3(queryString, cb) {
          var data3 = this.data3
          var results = queryString ? data3.filter(this.createStateFilter(queryString)) : data3
          clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
            cb(results);
          }, 1000 * Math.random())
        },
        createStateFilter(queryString) {
          return (state) => {
            return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
          }
        },
        handleSelectName(item) {
          this.data3 = []
          var child = []
          var s = item.value
          var ss = item.phone
          for (var i=0;i<ss.length;i++){
              child.push({"value":ss[i],"name":s})
          }
          this.data3 = child
        },
        handleSelectPhone(item) {
          this.addform.name = item.name
        },
        focusPoint(item) {
          const d4 = this.addform.name
          if(d4==''||4==null){
            this.loadTelList()
          } else {
            console.log()
          }
        },
        focusPoint4(item) {
          this.loadNameList()
        }
    },      
    activated () {
      this.handleLoginGroup()
    },
    mounted: function (){
         //加载密钥
        //加载
        this.loadNameList()
        this.loadTelList()
        //级联信息加载
        this.loadPhoneList()
        this.buttonText = this.form.ips !=''?'重选':'选择服务器'
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
          this.totalCount = res.data.data.total
          this.currentPage = res.data.data.current_page
          this.groupMemberData = res.data.data.data
        })
        this.handleLoginGroup()
    }
  }
</script>

<style scoped>
  .container{
    width:100%;
    height:auto;
    padding:0px
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
  .user_checkbox{
    border-radius: 4px;
    color: #fff;
    padding: 14px 15px;
    background-color: #B3E5FC;
  }
</style>

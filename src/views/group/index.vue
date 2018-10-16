<template>
  <div class="grouplist">
    <el-tabs type="border-card">
      <el-tab-pane  label="加入的群组">
        <el-container>
          <el-aside width="200">
            <el-row>
              <el-button icon = "el-icon-location" type="primary butList" >
              <p style="font-size:15px;padding-top:30px;">加入群组数：<span style="
              font-size: 18px;color: #EEEEEE;">12</span></p>
              </el-button>
            </el-row>
            <el-row>
              <el-button type="primary" @click="dialogCreateGroup = true">创建群组</el-button>
              <el-button type="success" @click="dialogJoinGroup = true">加入群组</el-button>
            </el-row>
          </el-aside>
          <el-container>
            <el-table
              :data="joinData"
              style="width: 100%"
              max-height="580">
              <el-table-column
                prop="name"
                label="群组名称"
                width="200">
              </el-table-column>
              <el-table-column
                prop="createDate"
                label="创建日期"
                width="200">
              </el-table-column> 
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="enterGroup(scope.$index, scope.row)">进入</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="exiteGroup(scope.$index, scope.row)">退出</el-button>
                </template>
              </el-table-column>
            </el-table>
            </el-main>
          </el-container>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="管理的群组">
        <el-container>
          <el-aside>
            <el-row>
              <el-button icon = "el-icon-location" type="primary butList" >
              <p style="font-size:15px;padding-top:30px;">拥有群组数：<span style="
              font-size: 18px;color: #EEEEEE;">12</span></p>
              </el-button>
            </el-row>
            <el-row>
              <el-button type="primary" @click="dialogCreateGroup = true">创建群组</el-button>
              <el-button type="success" @click="dialogJoinGroup = true">加入群组</el-button>
            </el-row>
          </el-aside>
          <el-container>
            <el-table
              :data="createData"
              style="width: 100%"
              max-height="580">
              <el-table-column
                prop="name"
                label="群组名称"
                width="200">
              </el-table-column>
              <el-table-column
                prop="createDate"
                label="创建日期"
                width="200">
              </el-table-column> 
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="enterGroup(scope.$index, scope.row)">进入</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="removeGroup(scope.$index, scope.row)">解散</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-container>
        </el-container>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="创建群组"
      :visible.sync="dialogCreateGroup"
      width="30%">
      <el-form   label-width="100px" class="demo-ruleForm">
        <el-form-item label="群组名称" prop="name">
          <el-input v-model="createForm.groupName"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="createForm.userName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveGroup">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="加入群组"
      :visible.sync="dialogJoinGroup"
      width="40%">
      <el-form >
          <el-tag type="success" size="max">请查找群组</el-tag>
          <el-select
            filterable
            clearable
            :is-required="true"
            v-model="joinForm.groupId"
            placeholder="请选择您想加入的群组">
            <el-option
              v-for="item in add_options"
              :key="item.groupId"
              :label="item.name"
              :value="item.groupId">
            </el-option>
          </el-select>
          <el-form-item label="审批人">
            <el-input v-model="joinForm.userName" placeholder="姓名"></el-input>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="joinGroup">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import { createGroup, selectgrouptList, joinGroup } from '@/api/group'
name: 'GroupList'
export default {
    data() {
      return {
        active: 0,
        dialogCreateGroup: false,
        dialogJoinGroup: false,
        add_option: [],
        createForm: {
          groupName: '',
          userName: ''
        },
        ruleForm: {},
        joinForm: {
          groupId: '',
          userName: ''
        },
        joinData: [],
        createData: [],
        formLabelWidth: '120px'
      }
    },
    methods: {
      enterGroup(index, row) {
        const groupId = row.groupId
        Promise.all([
          this.$store.dispatch('GroupLogin', { groupId })
        ]).then((result) => {
          this.$store.dispatch('toggleLoginGroup', true)
          this.$router.push({ path: '/' })
        }).catch((error) => {
          console.log('登录群组失败: %o', error)
        })
      },
      exiteGroup(index, row) {
        this.$alert("退出群组");
      },
      removeGroup(index, row) {
        this.$alert("解散群组");
      },
      joinGroup(){
        const param = {
          groupId: this.joinForm.groupId,
          userName: this.joinForm.userName
        }
        joinGroup(param).then(response => {
          if (response.code === 0) {
            this.$message({
              message: '已经成功加入群组，请耐心等待管理员审核。。。',
              type: 'success'
            })
            axios({
              method: 'post',
              url:'/org/joinGroupList',
              data: ''
            }).then((res)=>{
              this.joinData = res.data.data.data
            })
            this.joinForm.groupId = '',
            this.joinForm.userName = ''
            
          } else {
            this.$message.error('加入群组失败！')
          }
        }).catch(error => {
          this.$message.error('加入群组失败！'+ ': ' + error)
        })
        this.dialogJoinGroup = false
      },
      saveGroup(){
        const param = {
          groupName: this.createForm.groupName,
          userName: this.createForm.userName
        }
        createGroup(param).then(response => {
          if (response.code === 0) {
            this.$message({
              message: '创建群组成功',
              type: 'success'
            })
            axios({
              method: 'post',
              url:'/org/createGroupList',
              data: ''
            }).then((res)=>{
              this.createData = res.data.data.data
            })
            axios({
              method: 'post',
              url:'/org/joinGroupList',
              data: ''
            }).then((res)=>{
              this.joinData = res.data.data.data
            })
          } else {
            this.$message.error('创建群组失败！')
          }
        }).catch(error => {
          this.$message.error('创建群组失败！'+ ': ' + error)
        })
        this.dialogCreateGroup = false
      }
    },
    mounted: function () {
      var _this = this
      selectgrouptList().then(function (res) {
        _this.add_options = res.data.data
      }).catch(function (error) {
        console.log(error)
      })
      axios({
        method: 'post',
        url:'/org/joinGroupList',
        data: ''
      }).then((res)=>{
        this.joinData = res.data.data.data
      })
      axios({
        method: 'post',
        url:'/org/createGroupList',
        data: ''
      }).then((res)=>{
        this.createData = res.data.data.data
      })
    }
  }
</script>

<style scoped>
  .grouplist{
    width:100%;
    height:840px;
    padding:50px 50px 0px 50px;
  }
  .butList{
    margin:52px;
    font-size:40px;
    padding:10px;
  }
  .el-tabs--top.el-tabs .el-tabs__item:last-child{
    padding-left:60px;
  }
</style>

<template>
  <div class="grouplist">
    <el-tabs type="border-card">
      <el-tab-pane  label="加入的群组">
        <el-container>
          <el-aside>
            <el-row>
              <el-button icon = "el-icon-location" type="primary butList" >
              <p style="font-size:15px;padding-top:30px;">加入的群组数：<span style="
              font-size: 18px;color: #EEEEEE;">12</span></p>
              </el-button>
            </el-row>
            <el-row>
              <el-button type="primary" @click="dialogCreateGroup = true">创建群组</el-button>
              <el-button type="success" @click="dialogJoinGroup = true">加入群组</el-button>
            </el-row>
          </el-aside>
          <el-container>
            <el-main>
              <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                label="群组名称"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="日期"
                width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
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
            <el-main>
              <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                label="群组名称"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="日期"
                width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
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
            </el-main>
          </el-container>
        </el-container>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="创建群组"
      :visible.sync="dialogCreateGroup"
      width="30%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
      <el-form :model="form">
          
          <el-select
            filterable
            clearable
            :is-required="true"
            v-model="form.groupId"
            placeholder="请选择您想加入的群组">
            <el-option
              v-for="item in add_options"
              :key="item.groupId"
              :label="item.name"
              :value="item.groupId">
            </el-option>
          </el-select>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import { createGroup, selectgrouptList } from '@/api/group'
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
        form: {
          groupId: ''
        },
        tableData: [{
          date: '2016-05-02',
          name: '佛山季华园技术中心',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '创业园',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '科技园',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '地铁分局',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        formLabelWidth: '120px'
      }
    },
    methods: {
      enterGroup(index, row) {
        this.$alert("加入群组");
      },
      exiteGroup(index, row) {
        this.$alert("退出群组");
      },
      removeGroup(index, row) {
        this.$alert("解散群组");
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
        console.log('返回的数据%o',res.data.data)
        _this.add_options = res.data.data
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
</script>

<style scoped>
  .grouplist{
    width:80%;
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

<template>
    <el-container class="container">
        <!--查询已经分配的成员的清单 -->
        <el-table
        border
        :data="hostList"
        style="width: 100%">
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
          width="220">
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
  </el-container>
</template>
<script>
import Vue from 'vue'
import {deleteGroupMember, saveGroupMember, checkGroupMember } from '@/api/group'
import axios from 'axios'
  export default {
    data() {
      return {
        hostList: []
      }
    },
    methods:{
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
        //移除服务器
        deleteRow(index, rows) {
          const params = {
            token: this.$store.state.user.token,
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
                message: '成功移除对改用户分配的服务器！',
                type: 'success'
              })
              const params = {
                token: this.$store.state.user.token,
                app_name: 'aanets'
              }
              axios({
                method: 'post',
                url:'/rdp/assign_list',
                data:params
              }).then((res)=> {
                  this.hostList = res.data.result
              })
              this.searcheServerDialog = false
            }
          })
        }
    },
    mounted: function (){
      const params = {
        token: this.$store.state.user.token,
        app_name: 'aanets'
      }
      axios({
        method: 'post',
        url:'/rdp/assign_list',
        data:params
      }).then((res)=> {
          this.hostList = res.data.result
      })
    }
  }
</script>

<style scoped>
  .container{
    width:99.8%;
    height:auto;
    padding: 11px 23px 22px 23px;
    background: #b3e5fc3d;
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

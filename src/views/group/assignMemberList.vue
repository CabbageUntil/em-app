<template>
    <div>
      <el-button v-show="visibleLoad" style="border:none;font-size:18px;color:#2196F3;" :loading="true">数据在中请稍后......</el-button>
      <div   style="padding-top:10px;">
        <el-form  v-show="visible" label-width="100px">
          <el-form-item label="关键词">
            <el-input placeholder="请输入搜索关键词"  style="width:280px;" v-model="search"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!--查询已经分配的成员的清单 -->
      <el-table
        border
        :data="tables.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
        v-show="visible"
        style="width: 100%">
        <el-table-column
          prop="alias"
          label="用户名称"
          width="250">
        </el-table-column>
        <el-table-column
          prop="sid"
          label="服务编号"
          width="250">
        </el-table-column>
        <el-table-column
          prop="username"
          label="系统账户"
          width="250">
        </el-table-column>
        <el-table-column
          prop="ips"
          label="IP地址"
          width="250">
        </el-table-column>
        <el-table-column
          prop="expire_time"
          :formatter="dateFormat1" 
          label="到期日期">
        </el-table-column>
        <el-table-column
          label="操作"
          width="250">
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
      <div v-show="visible" align="center" style="padding: 20px 19px;">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 30, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>  
  </div>
</template>
<script>
import Vue from 'vue'
import moment from 'moment'
import {deleteGroupMember, saveGroupMember, checkGroupMember } from '@/api/group'
import axios from 'axios'
  export default {
    data() {
      return {
        visible: false,
        visibleLoad: true,
        visiblealert: false,
        pageSize: 10, // 每页大小默认值
        pageIndex: 1, // 默认第一页
        search: '',
        tableData: []
      }
    },
    methods:{
        dateFormat1(row, column, cellValue, index){
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
        //查询已经分配的服务器的列表
         loadAssign:function(){
            const token = this.$store.state.user.token
            const params = {
              token: token,
              app_name: 'aanets'
            }
            axios({
              method: 'post',
              url:'/rdp/assign_list',
              data:params
            }).then((res)=> {
                if(res.data.code === 0) {
                  this.visibleLoad = false
                  this.visible = true
                  this.tableData = res.data.result
                } else {
                  this.visibleLoad = false
                  this.visible = true
                }
            })
         },
        //移除服务器
        loadDelete:function(id) {
          const token = this.$store.state.user.token
          const params = {
            token: token,
            hostid: id,
            app_name: 'aanets'
          }
          axios({
            method: 'post',
            url:'/rdp/remove_service',
            data:params
          }).then((res)=> {
            if(res.data.code === 0){
              this.loadAssign()
              this.$message({
                message: '成功移除对改用户分配的服务器！',
                type: 'success'
              })
             
              this.searcheServerDialog = false
            }
          })
        },
        //移除服务器
        deleteRow(index, rows) {
          this.loadDelete(rows.id)
        },
        // 前端过滤
        format (val) {
          val = val.toString()
          if (val.indexOf(this.search) !== -1 && this.search !== '') {
            return val.replace(this.search, '<font color="red">' + this.search + '</font>')
          } else {
            return val
          }
        },
        handleSizeChange (val) {
          this.pageSize = val
        },
        handleCurrentChange (val) {
          this.pageIndex = val
        },
        siteTableHeader () {
          return 'sws-table-header'
        },
        tableRowClassName ({ row, rowIndex }) {
          if (rowIndex % 2) {
            return 'warning-row'
          } else {
            return 'success-row'
          }
        }
    },
    mounted: function (){
      this.loadAssign()
    },
    computed: {
      // 前端过滤
      tables () {
        const search = this.search
        if (search) {
          return this.tableData.filter(dataNews => {
            return Object.keys(dataNews).some(key => {
              return String(dataNews[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.tableData
      },
      // 总条数
      total () {
        return this.tables.length
      }
    },
    watch: {
    // 检测表格数据过滤变化，自动跳到第一页
      tables () {
        this.pageIndex = 1
      }
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

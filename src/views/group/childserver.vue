<template>
    <div>
     <el-alert
        v-show="visiblealert"
        title=""
        type="warning"
        :closable="false"
        description="没有服务器数据！！！"
        show-icon>
    </el-alert>
    <el-button
        v-show="visibleLoad"
        style="border:none;"

        :loading="true">数据在中请稍后......</el-button>
    <el-table
    v-show="visible"
    border
    :data="tables.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
    style = "width:100%;"
    v-loading="loading">
        <el-table-column
        prop="alias"
        label="用户名称"
        width="220">
        </el-table-column>
        <el-table-column
        prop="sid"
        label="服务编号"
        width="220">
        </el-table-column>
        <el-table-column
        prop="username"
        label="系统账户"
        width="250">
        </el-table-column>
        <el-table-column
        prop="ips"
        label="IP地址"
        width="220">
        </el-table-column>
        <el-table-column
        prop="expire_time"
        :formatter="dateFormat1" 
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
    <div v-show="visible" align="center" style="padding: 20px 19px;">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[10, 15,  20, 30, 50, 100, 200, 500]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>  
    </div> 
</template>
<script>
import Vue from 'vue'
import Qs from 'qs'
import moment from 'moment'
import axios from 'axios'
import { Loading } from 'element-ui'
export default {
     data() {
      return {
        hostList2: [],
        loading: true,
        visible: false,
        visibleLoad: true,
        visiblealert: false,
        pageSize: 10, // 每页大小默认值
        pageIndex: 1, // 默认第一页
        search: '',
        tableData: []
      }
    },
    props: {
        scope: Object ,
        ips: ''
    },
    methods: {
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
            this.visibleLoad = false
            if(res.data.code === 0){
                this.$message({
                    message: '成功移除对改用户分配的服务器！',
                    type: 'success'
                })
                this.loadAssign(this.ips)
            }
        })
      },
      //查询给指定用户分配的主机
      loadAssign: function(ips){
        const token = this.$store.state.user.token
        const params = {
            token: token,
            assign_ips: ips,
            app_name: 'aanets'
          }
          axios({
            method: 'post',
            url:'/rdp/assign_list',
            data:params
          }).then((res)=> {
            this.visibleLoad = false
            if(res.data.code === 0) {
              this.hostList2 = res.data.result
              this.tableData = res.data.result
              this.visible = true
            } else {
                this.visible = false
                this.loading = true
                this.visiblealert = true
            }
          })
      },
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
      // 前端过滤
      format (val) {
        val = val.toString()
        if (val.indexOf(this.search) !== -1 && this.search !== '') {
        return val.replace(this.search, '<font color="red">' + this.search + '</font>')
        } else {
        return val
        }
      },
      dateFormat (val) {
        return moment(val).format('YYYY-MM-DD')
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
    mounted() {
        this.loadAssign(this.ips)
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
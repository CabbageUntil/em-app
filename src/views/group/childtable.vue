<template>
    <el-table
    border
    style="padding: 1px 0px;"
    :data="hostList2">
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
</template>
<script>
import Vue from 'vue'
import Qs from 'qs'
import axios from 'axios'
export default {
     data() {
      return {
        hostList2: []
      }
    },
    props: {
        scope: Object ,
        mebile: ''
    },
    methods: {
        //移除服务器
        deleteRow(index, rows) {
            console.log(1)
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
                    this.loadAssign(this.mebile)
                }
            })
        },
      //查询给指定用户分配的主机
      loadAssign: function(mebile){
        const params = {
            token: this.$store.state.user.token,
            assign_user: mebile,
            app_name: 'aanets'
          }
          axios({
            method: 'post',
            url:'/rdp/assign_list',
            data:params
          }).then((res)=> {
              this.hostList2 = res.data.result
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
      }
    },
    mounted() {
        console.log(this.mebile)
        this.loadAssign(this.mebile)
    }
}
</script>
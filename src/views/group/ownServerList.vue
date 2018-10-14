<template>
  <div>
    <el-container class="container">
        <el-main>
          <el-table
            :data="hostData"
            stripe
            border
            style="width: 100%">

            <el-table-column
            prop="sid"
            label="服务器编号">
            </el-table-column>

            <el-table-column
            prop="system_name"
            label="系统名称">
            </el-table-column>

            <el-table-column
            prop="ips"
            label="IP地址">
            </el-table-column>
            
            <el-table-column
            prop="expire_time"
            :formatter="dateFormat" 
            label="到期时间">
            </el-table-column>

            <el-table-column
            prop="users.username"
            label="备注">
            </el-table-column>
        </el-table>
       </el-main>
    </el-container>
   </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
  export default {
    data() {
      return {
        hostData: []
        
      }
    },
    methods:{
      dateFormat(row, column, cellValue, index){
        var dateMat = new Date(cellValue*1000)
        const year = dateMat.getFullYear();
        const month = dateMat.getMonth() + 1;
        const day = dateMat.getDate();
        const hh = dateMat.getHours();
        const mm = dateMat.getMinutes();
        const ss = dateMat.getSeconds();
        const timeFormat= year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
        return timeFormat;
      }      
    },
    mounted: function (){
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
    }
  }
</script>

<style scoped>
  .container{
    width:99.8%;
    height:500px;
    padding:10px
  }
</style>

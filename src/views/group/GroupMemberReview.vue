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
            prop="name"
            label="姓名">
            </el-table-column>

            <el-table-column
            prop="mebile"
            label="联系方式">
            </el-table-column>
            <el-table-column label="审核" width="200">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="verify(scope.$index, scope.row)">通过</el-button>
                </template>
              </el-table-column>
        </el-table>
       </el-main>
    </el-container>
   </div>
</template>
<script>
import Vue from 'vue'
import {verifyGroupMember } from '@/api/group'
import axios from 'axios'
  export default {
    data() {
      return {
        hostData: []
        
      }
    },
    methods:{
      verify(index,row){
        const param = {groupMemberId: row.groupMemberId}
        verifyGroupMember(param).then(response => {
          if (response.code === 0) {
            this.$message({
              message: '审核成功！',
              type: 'success'
            })
            axios({
                method: 'post',
                url:'/org/selectNotViewGroupList',
                data: ''
            }).then((res)=>{
                this.hostData = res.data.data.data
            })
          } else {
            this.$message.error('审核失败！')
          }
        }).catch(error => {
          this.$message.error('审核失败'+ ': ' + error)
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
    mounted: function (){
        axios({
            method: 'post',
            url:'/org/selectNotViewGroupList',
            data: ''
        }).then((res)=>{
            this.hostData = res.data.data.data
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

<template>
  <div>
    <el-container class="container">
        <el-header class="header" style="height: 89px;border-radius: 5px;">
          <el-row :gutter="20" style="padding-top: 24px;">
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
            type="primary"
            icon="el-icon-edit">添加成员</el-button>
          </el-col>
          
        </el-row>
          
        </el-header>
        <el-main>
          <el-table
            :data="hostData"
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
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <el-button
                    size="medium"
                    type="danger"
                    icon="el-icon-delete"
                    @click="deleteServer(scope.$index, scope.row)"
                    >删除</el-button>
                </template>
              </el-table-column>
        </el-table>
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
        hostData: [],
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
        totalCount: 1000,
      }
    },
    methods:{
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
          this.hostData = res.data.data.data
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
      deleteServer(index,row){
        console.log(row.groupMemberId);
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
                this.hostData = res.data.data.data
            })
          }
        })
      },
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

<template>
  <div>
      <el-button v-show="visibleLoad" style="border:none;font-size:18px;color:#2196F3;" :loading="true">数据在中请稍后......</el-button>
      <div v-show="visible"  style="padding-top:10px;">
        <el-form  label-width="100px">
          <el-form-item label="关键词">
            <el-input placeholder="请输入搜索关键词"  style="width:280px;" v-model="search"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="tables.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
        stripe
        border
        v-show="visible"
        style="width: 100%">
       
        <el-table-column
        prop="name"
        label="姓名">
        </el-table-column>

        <el-table-column
        prop="mebile"
        label="联系方式">
        </el-table-column>
        <el-table-column label="审核" width="320">
            <template slot-scope="scope">
              <el-button
                size="mini"
                icon="el-icon-success"
                type="success"
                @click="verify(scope.$index, scope.row)">通过</el-button>
              <el-button
                size="mini"
                icon="el-icon-error"
                type="danger"
                @click="remove(scope.$index, scope.row)">拒绝</el-button>
            </template>
          </el-table-column>
      </el-table>
      <div v-show="visible"  align="center" style="padding: 20px 19px;">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 20, 50]"
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
import {verifyGroupMember } from '@/api/group'
import axios from 'axios'
  export default {
    data() {
      return {
        visible: false,
        visibleLoad: true,
        pageSize: 5, // 每页大小默认值
        pageIndex: 1, // 默认第一页
        search: '',
        tableData: []
      }
    },
    methods:{
      remove(index,row) {
        this.$alert("拒绝加群")
      },
      verify(index,row) {
        const param = {groupMemberId: row.groupMemberId}
        verifyGroupMember(param).then(response => {
          if (response.code === 0) {
            this.$message({
              message: '审核成功！',
              type: 'success'
            })
            this.loadNotViewMember()
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
      },
      loadNotViewMember: function() {
         axios({
            method: 'post',
            url:'/org/selectNotViewGroupList',
            data: ''
        }).then((res)=>{
            if(Array.isArray(res.data.data.data)&&res.data.data.data.length === 0) {
              this.visibleLoad = false
              this.visible  = true
            } else {
              this.visible = true
              this.visibleLoad = false
              this.tableData = res.data.data.data
            }
        })
      }  
    },
    mounted: function (){
      this.loadNotViewMember()
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
    height:500px;
    padding:10px
  }
</style>

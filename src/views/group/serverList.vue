<template>
  <div>

      <el-alert
        v-show="visiblealert" title="" type="warning" :closable="false"
        description="没有他人分配的服务器的记录！！！" show-icon >
      </el-alert>
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
        :fit="true">
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
      </el-table>
       <div  v-show="visible" align="center" style="padding: 20px 19px;">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[2, 3, 4, 5]"
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
import axios from 'axios'
  export default {
    data() {
      return {
        visible: false,
        visibleLoad: true,
        visiblealert: false,
        pageSize: 2, // 每页大小默认值
        pageIndex: 1, // 默认第一页
        search: '',
        tableData: []
      }
    },
    methods:{
      //日期格式化
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
      },
      //查询被分配的服务器
      loadServerData: function() {
        const params = {
          token: this.$store.state.user.token
        }
        axios({
            method: 'post',
            url:'/rdp/server',
            data:params
        }).then((res)=>{
          console.log('查询结果集%o',res.data)
          if(res.data.code ===0 ) {
              this.visible = true
              this.visibleLoad = false
              this.tableData = res.data.result
          } else {
              this.visibleLoad = false
              this.visiblealert = true
              this.visible  = false
          }
        })
      },
      //前端过滤数据
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
    mounted: function (){
        this.loadServerData()
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

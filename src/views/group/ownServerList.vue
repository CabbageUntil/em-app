<template>
  <div>
    <el-button v-show="visibleLoad" style="border:none;font-size:18px;color:#2196F3;" :loading="true">数据在中请稍后......</el-button>
    <el-container v-show="visible" class="container">
      <el-header>
          <el-form  label-width="100px">
            <el-form-item label="关键词查找">
              <el-input placeholder="请输入搜索关键字" style="width:280px;" v-model="search"></el-input>
            </el-form-item>
          </el-form>
        </el-header>
        <el-main>
          <el-table
            :data="tables.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
            stripe
            border
            :fit="true">
            <el-table-column    type="expand">
               <template style="padding: 0px 0px;"  slot-scope="scope">
                  <childserver  :ips="scope.row.ips"></childserver>
              </template>
            </el-table-column>

            <el-table-column
            prop="sid"
            label="服务编号">
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
        
        <div align="center" style="padding: 20px 19px;">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[10, 20, 30, 50,100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
       </el-main>
    </el-container>
   </div>
</template>
<script>
import Vue from 'vue'
import childserver  from './childserver'
import moment from 'moment'
import axios from 'axios'
  export default {
    components: {
        childserver
    },
    data() {
      return {
        visible: false,
        visibleLoad: true,
        pageSize: 10, // 每页大小默认值
        pageIndex: 1, // 默认第一页
        search: '',
        tableData: []
        
      }
    },
    methods:{
      //服务器日期格式化
      dateFormat(row, column, cellValue, index){
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
      //查询购买的服务器的列表
      loadOwnServer: function() {
        const token = this.$store.state.user.token
        const params = {
          token: token,
          app_name: 'aanets',
          is_only_sid: 1
        }
        axios({
            method: 'post',
            url:'/rdp/server',
            data:params
        }).then((res)=>{
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
        this.loadOwnServer()
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
    padding:10px
  }
</style>

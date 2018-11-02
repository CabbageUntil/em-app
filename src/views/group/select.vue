 <template>
  <div style="margin-left:150px;">
      <span>姓名: </span>
      <el-autocomplete
        style="padding:15px;"
        v-model="addform.name"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入姓名"
        @select="handleSelectName"
        @focus="focusPoint4"
      ></el-autocomplete><br>
      <span>联系电话: </span>
      <el-autocomplete
        v-model="addform.mobile"
        style="padding:10px;"
        :fetch-suggestions="querySearchAsync3"
        placeholder="请输入手机号码"
        @select="handleSelectPhone"
        @focus="focusPoint"
      ></el-autocomplete></br>
      <el-button type="primary" @click="getValue">提交</el-button>
  </div>
 </template>
<script>
import Vue from 'vue'
import axios from 'axios'
export default {
  data() {
    return {
      addform: {
        name: '',
        mobile: ''
      },
      data4: [],
      data3: [],
      timeout:  null
    };
  },
  methods: {
    loadTelList: function() {
        axios({
          method: 'post',
          url:'/org/getTelList',
        }).then((res)=> {
            this.data3 = res.data.data
        })
    },
    loadNameList: function() {
        axios({
          method: 'post',
          url:'/org/getNameList',
        }).then((res)=> {
            this.data4 = res.data.data
        })
    },
    getValue() {
       this.$message({
          type: 'success',
          message: "成功提交！姓名"+this.addform.name+"电话号码"+this.addform.mobile
        });
    },
    querySearchAsync(queryString, cb) {
      var data4 = this.data4
      var results = queryString ? data4.filter(this.createStateFilter(queryString)) : data4

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random())
    },
    querySearchAsync3(queryString, cb) {
      var data3 = this.data3
      var results = queryString ? data3.filter(this.createStateFilter(queryString)) : data3

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random())
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      }
    },
    handleSelectName(item) {
      this.data3 = []
      var child = []
      var s = item.value
      var ss = item.phone
      for (var i=0;i<ss.length;i++){
          child.push({"value":ss[i],"name":s})
      }
      this.data3 = child
    },
    handleSelectPhone(item) {
      this.addform.name = item.name
    },
    focusPoint(item) {
      const d4 = this.addform.name
      if(d4==''||4==null){
        this.loadTelList()
      } else {
        console.log()
      }
    },
    focusPoint4(item) {
      this.loadNameList()
    }
  },
  mounted() {
    this.loadNameList()
    this.loadTelList()
  }
}
</script>
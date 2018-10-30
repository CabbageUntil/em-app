<template>
<div>
    <el-select v-model="value"  filterable clearable  @change="selectGet" placeholder="请选择">
        <el-option
        v-for="item in options1"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
    </el-select>
    <el-select v-model="value1" filterable clearable    placeholder="请选择">
        <el-option
        v-for="item in options2"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
    </el-select>
   <div class="block">
    <span class="demonstration">只可选择最后一级菜单的选项</span>
    <el-cascader
        @change="selectGet1"
        placeholder="请输入关键字"
        :options="options3"
        filterable
        v-model="selectValue" 
    ></el-cascader>
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
        options1: [{
          value: '18076230400,17687659082',
          label: '张良'
        },{
          value: '13132988680,1769082',
          label: 'minmin'
        }],
        selectValue: [],
        options2: {},
        value: '',
        value1: '',
        options3: []
      }
    },
    methods: {
      // loadDelete:function(id) 
        loadPhoneList: function() {
          axios({
              method: 'post',
              url:'/org/findPhoneList',
            }).then((res)=> {
                console.log("%o",res.data)
                this.options3 = res.data.data
                
            })
        },
        selectGet(val){
            this.value = ''
            this.value1 = ''
            console.log("第一个输入框的值"+val)
            this.options2 = []
            let obj = {};
            obj = this.options1.find((item)=>{
                return item.value === val;
            });
            this.value = obj.label
            var nane = obj.label;
            var child = []
            var ss = val.split(",");
            for (var i=0;i<ss.length;i++){
                child.push({"value":obj.label,"label":ss[i]}); 
            }
            this.options2 = child
       },
        selectGet1(val){
            this.$alert("选择的数值："+this.selectValue)
        }
    },
    mounted: function (){
      this.loadPhoneList()
    },
  }
</script>

<style scoped>
  .container{
    width:99.8%;
    height:500px;
    padding:10px
  }
</style>

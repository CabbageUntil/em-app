<template>
  <div>
    <el-row>
      <label :class="{ 'required-label': isRequired }">{{ formItemName }}</label>
    </el-row>
    <el-row
      v-for="(item, index) in innerDataList"
      :key="item.id">
      <el-col :span="4">
        <el-input
          v-model="item.label"
          :placeholder="labelHint"
        />
      </el-col>
      <el-col :span="16">
        <div v-if="isRequired">
          <el-form-item
            v-if="isRequired"
            ref="formItemArea"
            :prop="fieldName + '.' + index + '.content'"
            :rules="{
              required: true, message: $t('form.personalInfo.validate.notEmpty'), trigger: 'blur'
            }"
            label-width="0"
          >
            <el-input
              v-model="item.content"
              :placeholder="contentHint"
            />
          </el-form-item>
        </div>
        <div v-else>
          <el-input
            v-model="item.content"
            :placeholder="contentHint"
          />
        </div>
      </el-col>
      <el-col
        :span="4"
        class="button-area">
        <el-button
          icon="el-icon-plus"
          @click="handlePlusClick"/>
        <el-button
          icon="el-icon-remove"
          @click="handleRemoveClick(item.id)"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'LabelValueField',
  props: {
    fieldName: {
      type: String,
      default: '',
      required: true
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    dataList: {
      type: Array,
      default () {
        return []
      }
    },
    formItemName: {
      type: String,
      required: true
    },
    labelHint: {
      type: String,
      default: '请输入标签'
    },
    contentHint: {
      type: String,
      default: '请输入内容'
    }
  },
  data () {
    return {
      innerDataList: this.dataList,
      index: 0
    }
  },
  computed: {
    lang () {
      return this.$i18n.locale
    }
  },
  watch: {
    dataList (newVal, oldVal) {
      this.innerDataList = newVal
    },
    lang (newVal, oldVal) {
      // 遍历修改表单项验证文字，修复切换语言后提示文字未更改
      let formItemArray = this.$refs.formItemArea
      formItemArray.forEach(item => {
        item.validateMessage = this.$t('form.personalInfo.validate.notEmpty', newVal)
      })
    }
  },
  methods: {
    handlePlusClick () {
      let obj = {
        id: --this.index,
        label: '',
        content: ''
      }
      this.dataList.push(obj)
    },
    handleRemoveClick (id) {
      if (this.dataList.length === 1) {
        Vue.set(this.dataList[0], 'label', '')
        Vue.set(this.dataList[0], 'content', '')
      } else {
        this.dataList.splice(this.dataList.findIndex(item => item.id === id), 1)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .button-area
    text-align: right
  .required-label::before
    content: '*'
    color: #f56c6c
    margin-right: 4px
</style>

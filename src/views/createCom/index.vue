<template>
  <div class="form-wrapper">
    <h1 class="ui center aligned header">{{ $t('form.createCompany.title') }}</h1>
    <el-form
      class="form"
      :model="form"
      ref="form"
      label-width="100px"
      :rules="rules"
    >
      <!-- 公司名 -->
      <el-form-item
        prop="orgName"
        :label="$t('form.createCompany.field.name.label')"
      >
        <el-input
          v-model="form.orgName"
          :placeholder="$t('form.createCompany.field.name.hint')"
        />
      </el-form-item>
      <!-- 联系电话 -->
      <el-form-item
        prop="tel"
        :label="$t('form.createCompany.field.tel.label')"
      >
        <el-input
          v-model="form.tel"
          :placeholder="$t('form.createCompany.field.tel.hint')"
          type="textarea"
        />
      </el-form-item>
      <!-- 邮件 -->
      <el-form-item
        prop="email"
        :label="$t('form.createCompany.field.email.label')"
      >
        <el-input
          v-model="form.email"
          :placeholder="$t('form.createCompany.field.email.hint')"
          type="textarea"
        />
      </el-form-item>
      <!-- 地址 -->
      <el-form-item
        prop="orgAddress"
        :label="$t('form.createCompany.field.address.label')"
      >
        <el-input
          v-model="form.orgAddress"
          :placeholder="$t('form.createCompany.field.address.hint')"
          type="textarea"
        />
      </el-form-item>
      <div class="btn-form-item">
        <el-button
          type="primary"
          @click="handleSubmitClick"
        >
          {{ $t('form.createCompany.btn.confirm') }}
        </el-button>
        <el-button
          @click="handleResetClick('form')"
        >
          {{ $t('form.createCompany.btn.reset') }}
        </el-button>
        <el-button
          @click="handleCancelClick"
        >
          {{ $t('form.createCompany.btn.cancel') }}
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validateName } from '@/api/form'
import { createCom } from '@/api/company'

export default {
  name: 'CreateCom',
  data () {
    return {
      userForm: '',
      form: {
        orgName: '',
        tel: '',
        email: '',
        orgAddress: ''
      },
      rules: this.getRules()
    }
  },
  computed: {
    lang () {
      return this.$i18n.locale
    }
  },
  watch: {
    lang (newVal, oldVal) {
      this.rules = this.getRules()
    }
  },
  methods: {
    handleSubmitClick () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$confirm(this.$t('form.createCompany.message.confirm.content'),
            this.$t('form.createCompany.message.confirm.title'),
            {
              confirmButtonText: this.$t('form.common.message.confirm'),
              cancelButtonText: this.$t('form.common.message.cancel'),
              type: 'warning'
            }
          ).then(() => {
            createCom(this.userForm, this.form).then(response => {
              const data = response
              console.log('data:->' + data)
              if (data.code === 0) {
                this.$message({
                  message: this.$t('form.createCompany.message.success'),
                  type: 'success'
                })
                this.handleCancelClick()
              } else {
                this.$message.error(this.$t('form.createCompany.message.fail'))
              }
            }).catch(error => {
              console.log('join fail: %o', error)
            })
          }).catch(() => {
          })
        } else {
          this.$message.error(this.$t('form.validate.formatError'))
        }
      })
    },
    handleResetClick (formName) {
      this.$refs[formName].resetFields()
    },
    async handleCancelClick () {
      await this.$parent.$parent.$children[2].closeSelectedTag({ path: this.$route.path })
    },

    handleNameChange (val) {
      if (this.form.orgName !== '') {
        validateName({ value: val, type: 'orgName' }).then(response => {
          const data = response
          if (data.code === -13) {
            this.error.name.duplicate = true
          } else {
            this.error.name.duplicate = false
          }
        })
      }
    },

    getRules () {
      let validateMsg = this.$t('form.createCompany.validate.notEmpty')
      return {
        orgName: [
          { required: true, validator: this.getOrgNameValidator, trigger: 'blur' }
        ],
        tel: [
          { required: true, message: validateMsg, trigger: 'blur' }
        ],
        email: [
          { required: true, message: validateMsg, trigger: 'blur' }
        ],
        address: [
          { required: true, message: validateMsg, trigger: 'blur' }
        ]
      }
    },
    getOrgNameValidator (rule, value, callback) {
      if (value === '') {
        callback(new Error(this.$t('form.createCompany.validate.notEmpty')))
      } else {
        validateName({ value, type: 'orgName' }).then(response => {
          const data = response
          if (data.code === -13) {
            callback(new Error(this.$t('form.createCompany.validate.duplicate')))
          } else {
            callback()
          }
        })
      }
    }
  },
  mounted () {
    // 关闭创建公司前填写用户信息页面
    this.$parent.$parent.$children[2].closeSelectedTag({ path: '/createCom/index' })
    // 读取用户信息表单，创建公司时候会一并提交
    this.userForm = this.$store.getters.userForm
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/formMixins.styl'
  displayCenter()
</style>

<template>
  <div class="form-wrapper">
    <el-row
      v-if="mode === 'form'"
      type="flex"
      justify="center"
      align="middle">
      <span>{{ $t('form.personalInfo.history.label') }}</span>
      <el-select
        class="history-selector"
        v-model="selectedHistory"
        clearable
        :placeholder="$t('form.personalInfo.history.select.hint')"
        @clear="buildEmptyForm"
        @change="handleArchiveChange"
      >
        <el-option
          v-for="item in historyOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </el-row>
    <h1 class="ui center aligned header">{{ $t('form.personalInfo.title') }}</h1>
    <el-form
      class="form"
      label-width="150px"
      :rules="rules"
      :model="form"
      ref="infoForm"
    >
      <!-- 姓名 -->
      <el-form-item
        prop="memberName"
        :label="$t('form.personalInfo.field.name.label')"
      >
        <el-col :span="12">
          <el-input
            v-model="form.memberName"
            :placeholder="$t('form.personalInfo.field.name.hint')"
          />
        </el-col>
      </el-form-item>
      <!-- 学历 -->
      <el-form-item
        prop="education"
        :label="$t('form.personalInfo.field.education.label')"
      >
        <el-select
          v-model="form.education"
          :placeholder="$t('form.personalInfo.field.education.hint')"
        >
          <el-option
            :label="$t('form.personalInfo.field.education.option.illiterate')"
            :value="1"/>
          <el-option
            :label="$t('form.personalInfo.field.education.option.primary')"
            :value="2"/>
          <el-option
            :label="$t('form.personalInfo.field.education.option.junior')"
            :value="3"/>
          <el-option
            :label="$t('form.personalInfo.field.education.option.senior')"
            :value="4"/>
          <el-option
            :label="$t('form.personalInfo.field.education.option.juniorCollege')"
            :value="5"/>
          <el-option
            :label="$t('form.personalInfo.field.education.option.bachelor')"
            :value="6"/>
          <el-option
            :label="$t('form.personalInfo.field.education.option.Master')"
            :value="7"/>
          <el-option
            :label="$t('form.personalInfo.field.education.option.Doctor')"
            :value="8"/>
          <el-option
            :label="$t('form.personalInfo.field.education.option.Post')"
            :value="9"/>
        </el-select>
      </el-form-item>
      <!-- 性别 -->
      <el-form-item
        prop="sex"
        :label="$t('form.personalInfo.field.sex.label')"
      >
        <el-radio-group
          v-model="form.sex"
        >
          <el-radio :label="1">
            {{ $t('form.personalInfo.field.sex.radio.female') }}
          </el-radio>
          <el-radio :label="0">
            {{ $t('form.personalInfo.field.sex.radio.male') }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 婚否 -->
      <el-form-item
        prop="maritalStatus"
        :label="$t('form.personalInfo.field.marital.label')"
      >
        <el-radio-group
          v-model="form.maritalStatus"
        >
          <el-radio :label="false">
            {{ $t('form.personalInfo.field.marital.radio.single') }}
          </el-radio>
          <el-radio :label="true">
            {{ $t('form.personalInfo.field.marital.radio.married') }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 生日 -->
      <el-form-item
        prop="birthday"
        :label="$t('form.personalInfo.field.birthday.label')"
      >
        <el-date-picker
          type="date"
          :placeholder="$t('form.personalInfo.field.birthday.hint')"
          v-model="form.birthday"
        />
      </el-form-item>
      <!-- 身份证过期日 -->
      <el-form-item
        prop="idCardExp"
        :label="$t('form.personalInfo.field.IDCardExp.label')"
      >
        <el-date-picker
          type="date"
          :placeholder="$t('form.personalInfo.field.IDCardExp.hint')"
          v-model="form.idCardExp"
        />
      </el-form-item>
      <!-- 身份证号码 -->
      <el-form-item
        prop="idCard"
        :label="$t('form.personalInfo.field.idCard.label')"
      >
        <el-col :span="12">
          <el-input
            v-model="form.idCard"
            :placeholder="$t('form.personalInfo.field.idCard.hint')"
          />
        </el-col>
      </el-form-item>
      <!-- 银行卡号 -->
      <el-form-item
        prop="blankId"
        :label="$t('form.personalInfo.field.blankCard.label')"
      >
        <el-col :span="12">
          <el-input
            v-model="form.blankId"
            :placeholder="$t('form.personalInfo.field.blankCard.hint')"
          />
        </el-col>
      </el-form-item>
      <!-- 开户行 -->
      <el-form-item
        prop="blankName"
        :label="$t('form.personalInfo.field.blankName.label')"
      >
        <el-col :span="12">
          <el-input
            v-model="form.blankName"
            :placeholder="$t('form.personalInfo.field.blankName.hint')"
          />
        </el-col>
      </el-form-item>
      <!-- 紧急联系人 -->
      <el-form-item
        required
        :label="$t('form.personalInfo.field.emergencyContact.label')"
      >
        <el-col :span="12">
          <el-form-item
            prop="emergencyUser"
            ref="sp1">
            <el-input
              v-model="form.emergencyUser"
              :placeholder="$t('form.personalInfo.field.emergencyContact.hint.name')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="emergencyMobile"
            ref="sp2">
            <el-input
              v-model="form.emergencyMobile"
              :placeholder="$t('form.personalInfo.field.emergencyContact.hint.tel')"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <!-- 生肖 -->
      <!-- 籍贯 -->
      <el-form-item
        :label="$t('form.personalInfo.field.nativePlace.label')"
      >
        <el-input
          v-model="form.nativePlace"
          :placeholder="$t('form.personalInfo.field.nativePlace.hint')"
        />
      </el-form-item>
      <!-- 电话 -->
      <label-value-list
        :is-required="true"
        field-name="telList"
        :form-item-name="$t('form.personalInfo.field.tel.label')"
        :label-hint="$t('form.personalInfo.field.tel.hint.label')"
        :content-hint="$t('form.personalInfo.field.tel.hint.value')"
        :data-list="form.telList"
      />
      <!-- 邮箱 -->
      <label-value-list
        :is-required="true"
        field-name="emailList"
        :form-item-name="$t('form.personalInfo.field.email.label')"
        :label-hint="$t('form.personalInfo.field.email.hint.label')"
        :content-hint="$t('form.personalInfo.field.email.hint.value')"
        :data-list="form.emailList"
      />
      <!-- 地址 -->
      <label-value-list
        :is-required="true"
        field-name="addressList"
        :form-item-name="$t('form.personalInfo.field.address.label')"
        :label-hint="$t('form.personalInfo.field.address.hint.label')"
        :content-hint="$t('form.personalInfo.field.address.hint.value')"
        :data-list="form.addressList"
      />
      <!-- 其他 -->
      <label-value-list
        field-name="otherList"
        :form-item-name="$t('form.personalInfo.field.other.label')"
        :label-hint="$t('form.personalInfo.field.other.hint.label')"
        :content-hint="$t('form.personalInfo.field.other.hint.value')"
        :data-list="form.otherList"
      />
      <div class="btn-form-item">
        <el-button
          type="primary"
          @click="handleOkClick">
          <!--
          创建公司 --- 下一步
          加入公司 --- 确认
          编辑员工信息 --- 保存
          -->
          {{
            mode === 'form' ?
              (orgId ? $t('form.personalInfo.btn.confirm') : $t('form.personalInfo.btn.next')) :
              $t('form.personalInfo.btn.save')
          }}
        </el-button>
        <el-button @click="handleCancelClick">
          {{ $t('form.personalInfo.btn.cancel') }}
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import LabelValueList from '@/components/LabelValueList'
import SymbolicAnimal from './components/SymbolicAnimal'

import { fetchMember, fetchArchiveGeneral,findMemberById, fetchSpecArchive, saveMember } from '@/api/member'
import { joinCom } from '@/api/company'

export default {
  components: {
    LabelValueList,
    SymbolicAnimal
  },
  data () {
    return {
      mode: '',
      selectedHistory: null,
      historyOption: [],
      orgId: null,
      form: {},
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
    handleOkClick () {
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          if (this.mode === 'form') {
            // 加入公司
            if (this.orgId) {
              this.$confirm(this.$t('form.joinCompany.message.confirm.content').replace('%{name}', this.$store.getters.joinComName),
                this.$t('form.joinCompany.message.confirm.title'),
                {
                  confirmButtonText: this.$t('form.common.message.confirm'),
                  cancelButtonText: this.$t('form.common.message.cancel'),
                  type: 'warning'
                }
              ).then(() => {
                this.form.orgId = this.orgId
                joinCom(this.form).then(response => {
                  const data = response
                  if (data.code === 0) {
                    this.$message({
                      message: this.$t('form.joinCompany.message.success').replace('%{name}', this.$store.getters.joinComName),
                      type: 'success'
                    })
                    this.handleCancelClick()
                  } else {
                    this.$message.error(this.$t('form.joinCompany.message.fail'))
                  }
                }).catch(error => {
                  console.log('join fail: %o', error)
                })
              }).catch(() => {
              })
            // 创建公司
            } else {
              this.$store.dispatch('setForm', JSON.stringify(this.form)).then(() => {
                this.$router.push({ path: '/createCom/orgForm' })
              })
            }
          // 保存员工信息
          } else if (this.mode === 'edit') {
            saveMember(this.form).then(response => {
              const data = response
              if (data.code === 0) {
                this.$message({
                  message: this.$t('table.editMember.message.success'),
                  type: 'success'
                })
                this.handleCancelClick()
              } else {
                this.$message.error(this.$t('form.editMember.message.fail'))
              }
            })
          }
        } else {
          this.$message.error(this.$t('form.validate.formatError'))
        }
      })
    },
    async handleCancelClick () {
      await this.$parent.$parent.$children[2].closeSelectedTag({ path: this.$route.path })
    },
    buildEmptyForm () {
      this.form = {
        id: 0,
        memberName: '',
        education: '',
        maritalStatus: '',
        sex: '',
        orgId: '',
        birthday: null,
        idCardExp: null,
        idCard: '',
        blankId: '',
        blankName: '',
        emergencyUser: '',
        emergencyMobile: '',
        sybolicAnimal: null,
        nativePlace: '',
        telList: [
          {
            id: 0,
            label: '',
            content: ''
          }
        ],
        emailList: [
          {
            id: 0,
            label: '',
            content: ''
          }
        ],
        addressList: [
          {
            id: 0,
            label: '',
            content: ''
          }
        ],
        otherList: [
          {
            id: 0,
            label: '',
            content: ''
          }
        ]
      }
    },
    fillData (data) {
      this.form = {
        id: data.id,
        memberName: data.name,
        education: data.education,
        maritalStatus: data.maritalStatus,
        sex: data.sex,
        birthday: new Date(data.birthday),
        idCardExp: new Date(data.idCardExp),
        emergencyUser: data.emergencyUser,
        emergencyMobile: data.emergencyMobile,
        idCard: data.idCard,
        blankName: data.blankName,
        blankId: data.blankId,
        sybolicAnimal: data.animal,
        nativePlace: data.nativePlace,
        telList: data.tel.length === 0 ? [
          {
            id: 0,
            label: '',
            content: ''
          }
        ] : data.tel,
        emailList: data.email.length === 0 ? [
          {
            id: 0,
            label: '',
            content: ''
          }
        ] : data.email,
        addressList: data.address.length === 0 ? [
          {
            id: 0,
            label: '',
            content: ''
          }
        ] : data.address,
        otherList:data.other.length === 0 ? [
          {
            id: 0,
            label: '',
            content: ''
          }
        ] : data.other
      }
    },
    handleArchiveChange (orgId) {
      fetchSpecArchive(orgId).then(response => {
        this.fillData(response.data)
      })
    },
    getRules () {
      let validateMsg = this.$t('form.personalInfo.validate.notEmpty')
      return {
        memberName: [
          { required: true, message: validateMsg, trigger: 'blur' }
        ],
        education: [
          { required: true, message: validateMsg, trigger: 'blur' }
        ],
        maritalStatus: [
          { required: true, message: validateMsg, trigger: 'blur' }
        ],
        birthday: [
          { type: 'date', required: true, message: validateMsg, trigger: 'blur' }
        ],
        idCardExp: [
          { type: 'date', required: true, message: validateMsg, trigger: 'blur' }
        ],
        sex: [
          { required: true, message: validateMsg, trigger: 'blur' }
        ],
        idCard: [
          { required: true, message: validateMsg, trigger: 'blur' }
        ],
        blankId: [
          { required: true, message: validateMsg, trigger: 'blur' }
        ],
        blankName: [
          { required: true, message: validateMsg, trigger: 'blur' }
        ],
        emergencyUser: [
          { required: true, message: validateMsg, trigger: 'blur' }
        ],
        emergencyMobile: [
          { required: true, message: validateMsg, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    // 根据路由地址判断页面模式
    // 抽取路由地址
    let path = this.$route.path
    // 从路由地址最后获取ID
    let id = this.$route.params && this.$route.params.id
    this.orgId = id
    if (/(joinCom|createCom)/.test(path)) {
      this.mode = 'form'
      // 读取与个人有挂钩的公司员工档案
      fetchArchiveGeneral().then(response => {
        const { data } = response
        for (let k of Object.keys(data)) {
          this.historyOption.push({ label: data[k], value: parseInt(k) })
        }
      })
      // 构建空的表单
      this.buildEmptyForm()
    } else if (path.indexOf('/member/edit') >= 0) {
      findMemberById(id).then(response => {
        this.mode = 'edit'
        //console.log('用户详细信息：%o',response.data)
        this.fillData(response.data)
      })
    } else {
      this.closePage()
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/formMixins.styl'
  displayCenter()
  .history-selector
    margin-left: 10px
    width: 400px
  label-value-list
    padding-top: 25px;
</style>

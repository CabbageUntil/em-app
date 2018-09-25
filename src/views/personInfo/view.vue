<template>
  <div>
    <el-row
      type="flex"
      justify="center">
      <el-card class="box-card">
        <el-row class="card-item">
          <el-col :span="4">{{ $t('form.personalInfo.field.name.label') }}</el-col>
          <el-col :span="20">{{ form.memberName }}</el-col>
        </el-row>
        <el-row class="card-item">
          <el-col :span="4">{{ $t('form.personalInfo.field.education.label') }}</el-col>
          <el-col :span="20">{{ formatEducation(form.education) }}</el-col>
        </el-row>
        <el-row class="card-item">
          <el-col :span="4">{{ $t('form.personalInfo.field.sex.label') }}</el-col>
          <el-col :span="20">{{ formatSex(form.sex) }}</el-col>
        </el-row>
        <el-row class="card-item">
          <el-col :span="4">{{ $t('form.personalInfo.field.marital.label') }}</el-col>
          <el-col :span="20">{{ formatMaritalStatus(form.maritalStatus) }}</el-col>
        </el-row>
        <el-row class="card-item">
          <el-col :span="4">{{ $t('form.personalInfo.field.birthday.label') }}</el-col>
          <el-col :span="20">{{ form.birthday }}</el-col>
        </el-row>
        <el-row class="card-item">
          <el-col :span="4">{{ $t('form.personalInfo.field.IDCardExp.label') }}</el-col>
          <el-col :span="20">{{ form.idCardExp }}</el-col>
        </el-row>
        <el-row class="card-item">
          <el-col :span="4">{{ $t('form.personalInfo.field.emergencyContact.label') }}</el-col>
          <el-col :span="20">{{ form.emergencyUser + ' ' + form.emergencyMobile }}</el-col>
        </el-row>
        <el-row class="card-item">
          <el-col :span="4">{{ $t('form.personalInfo.field.symbolicAnimal.label') }}</el-col>
          <el-col :span="20">{{ formatSymbolicAnimal(form.sybolicAnimal) }}</el-col>
        </el-row>
        <el-row class="card-item">
          <el-col :span="4">{{ $t('form.personalInfo.field.nativePlace.label') }}</el-col>
          <el-col :span="20">{{ form.nativePlace }}</el-col>
        </el-row>
        <el-row
          v-if="phoneList"
          class="card-item">
          <el-row>
            {{ $t('form.personalInfo.field.tel.label') }}
          </el-row>
          <el-row
            v-for="item in phoneList"
            :key="item.id"
            class="list-item">
            <el-col :span="4">{{ item.label }}</el-col>
            <el-col :span="20">{{ item.content }}</el-col>
          </el-row>
        </el-row>
        <el-row
          v-if="emailList"
          class="card-item">
          <el-row>
            {{ $t('form.personalInfo.field.email.label') }}
          </el-row>
          <el-row
            v-for="item in emailList"
            :key="item.id"
            class="list-item">
            <el-col :span="4">{{ item.label }}</el-col>
            <el-col :span="20">{{ item.content }}</el-col>
          </el-row>
        </el-row>
        <el-row
          v-if="addressList"
          class="card-item">
          <el-row>
            {{ $t('form.personalInfo.field.address.label') }}
          </el-row>
          <el-row
            v-for="item in addressList"
            :key="item.id"
            class="list-item">
            <el-col :span="4">{{ item.label }}</el-col>
            <el-col :span="20">{{ item.content }}</el-col>
          </el-row>
        </el-row>
        <el-row
          v-if="otherList"
          class="card-item">
          <el-row>
            {{ $t('form.personalInfo.field.other.label') }}
          </el-row>
          <el-row
            v-for="item in otherList"
            :key="item.id"
            class="list-item">
            <el-col :span="4">{{ item.label }}</el-col>
            <el-col :span="20">{{ item.content }}</el-col>
          </el-row>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { fetchMember , findMemberById } from '@/api/member'

import { formatEducation, formatMaritalStatus, formatSex, formatSymbolicAnimal } from '@/utils/fieldFormatter'

export default {
  data () {
    return {
      form: {},
      phoneList: [],
      emailList: [],
      addressList: [],
      otherList: []
    }
  },
  methods: {
    closePage () {
      this.$store.dispatch('delVisitedViews', { path: this.$route.path }).then((views) => {
        const latestView = views.slice(-1)[0]
        if (latestView) {
          this.$router.push(latestView)
        } else {
          this.$router.push('/')
        }
      })
    },
    formatEducation (val) {
      return formatEducation(val)
    },
    formatMaritalStatus (val) {
      return formatMaritalStatus(val)
    },
    formatSex (val) {
      return formatSex(val)
    },
    formatSymbolicAnimal (val) {
      return formatSymbolicAnimal(val)
    }
  },
  mounted () {
    // 根据路由地址判断页面模式
    // 抽取路由地址
    let path = this.$route.path
    // 从路由地址最后获取ID
    let id = parseInt(path.match(/\/(\d+)$/)[1])
    if (!id) {
      this.closePage()
    }
    findMemberById(id).then(response => {
      const data = response.data
      this.form = {
        memberName: data.name,
        education: data.education,
        maritalStatus: data.maritalStatus,
        sex: data.sex,
        birthday: new Date(data.birthday),
        idCardExp: new Date(data.idCardExp),
        emergencyUser: data.emergencyUser,
        emergencyMobile: data.emergencyMobile,
        sybolicAnimal: data.animal,
        nativePlace: data.nativePlace
      }
      this.phoneList = data.tel
      this.emailList = data.email
      this.addressList = data.address
      this.otherList = data.other
    })
  }
}
</script>

<style lang="stylus" scoped>
  .box-card
    min-width: 800px
    max-width: 1000px
    margin-top: 10px
  .card-item
    margin-bottom: 6px
  .list-item
    padding-left: 20px
    border-bottom: 1px solid #666
</style>

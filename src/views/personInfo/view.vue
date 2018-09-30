<template>
  <div>
    <el-row
      type="flex"
      justify="center">
      <el-card class="box-card" style="color: #5D4037;">
        <table style="width: 100%">
          <tr>
            <td class="tile">
              <el-tag type="warning" size="small" >{{ $t('form.personalInfo.field.name.label') }}</el-tag>
            </td>
            <td>{{ form.memberName }}</td>
          </tr>
          <tr>
            <td class="tile">
              <el-tag type="warning" size="small">{{ $t('form.personalInfo.field.sex.label') }}</el-tag>
            </td>
            <td>{{ formatSex(form.sex) }}</td>
            <td class="tile">
              <el-tag type="warning" size="small">{{ $t('form.personalInfo.field.marital.label') }}</el-tag>
            </td>
            <td>{{ formatMaritalStatus(form.maritalStatus) }}</td>
          </tr>
          <tr>
            <td class="tile">
              <el-tag type="warning" size="small">{{ $t('form.personalInfo.field.education.label') }}</el-tag>
            </td>
            <td>{{ formatEducation(form.education) }}</td>
            <td class="tile">
              <el-tag type="warning" size="small">{{ $t('form.personalInfo.field.symbolicAnimal.label') }}</el-tag>
            </td>
            <td>
              <el-col>{{ formatSymbolicAnimal(form.sybolicAnimal) }}</el-col>
            </td>
          </tr>
          <tr>
            <td class="tile">
              <el-tag type="warning" size="small">{{ $t('form.personalInfo.field.birthday.label') }}</el-tag>
            </td>
            <td>
              <el-col >{{ parseTime(form.birthday) }}</el-col>
            </td>
            <td class="tile">
              <el-tag type="warning" size="small">{{ $t('form.personalInfo.field.IDCardExp.label') }}</el-tag>
            </td>
            <td>{{ parseTime(form.idCardExp) }}</td>
          </tr>
          <tr>
            <td class="tile">
              <el-tag type="warning" size="small">{{ $t('form.personalInfo.field.emergencyContact.label') }}</el-tag>
            </td>
            <td>{{ form.emergencyUser + ' ' + form.emergencyMobile }}</td>
            <td class="tile">
              <el-tag type="warning" size="small">{{ $t('form.personalInfo.field.nativePlace.label') }}</el-tag>
            </td>
            <td>{{ form.nativePlace }}</td>
          </tr>
          <tr>
            <td class="tile">
              <el-tag type="warning" size="small">{{ $t('form.personalInfo.field.tel.label') }}</el-tag>
            </td>
            <td>
              <el-row
                v-if="phoneList"
                class="card-item">
                <el-row
                  v-for="item in phoneList"
                  :key="item.id">
                  {{ item.content }}<el-tag type="success" size="mini">{{ item.label }}</el-tag>
                </el-row>
              </el-row>
            </td>
          </tr>
          <tr>
            <td class="tile">
              <el-tag type="warning" size="small">{{ $t('form.personalInfo.field.email.label') }}</el-tag>
            </td>
            <td>
              <el-row
                v-if="emailList"
                class="card-item">
                <el-row
                  v-for="item in emailList"
                  :key="item.id">
                  {{ item.content }}<el-tag type="success" size="mini">{{ item.label }}</el-tag>
                </el-row>
              </el-row>
            </td>
          </tr>
          <tr>
            <td class="tile">
              <el-tag type="warning" size="small">{{ $t('form.personalInfo.field.address.label') }}</el-tag>
            </td>
            <td>
              <el-row
                v-if="addressList"
                class="card-item">
                <el-row
                  v-for="item in addressList"
                  :key="item.id">
                  {{ item.content }}<el-tag type="success" size="mini">{{ item.label }}</el-tag>
                </el-row>
              </el-row>
            </td>
          </tr>
          <tr>
            <td class="tile">
              <el-tag type="warning" size="small">
                {{ $t('form.personalInfo.field.other.label') }}
              </el-tag>
            </td>
            <td>
              <el-row
                v-for="item in otherList"
                :key="item.id">
                {{ item.content }}<el-tag type="success" size="mini">{{ item.label }}</el-tag>
              </el-row>
            </td>
          </tr>
        </table>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { fetchMember , findMemberById } from '@/api/member'

import { formatEducation, formatMaritalStatus, formatSex, formatSymbolicAnimal } from '@/utils/fieldFormatter'
import { parseTime } from '@/utils/index'

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
      if(val != null) {
        const value = parseInt(val);
        return formatEducation(value)
      }
    },
    parseTime(val){
      return parseTime(val, '{y}年{m}月{d}日')
    },
    formatMaritalStatus (val) {
      if(val){
        return formatMaritalStatus(1)
      }else{
        return formatMaritalStatus(0)
      }
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
    min-width: 680px
    max-width: 1000px
    margin-top: 10px
  .card-item
    margin-bottom: 6px
  .list-item
    padding-left: 8%
    line-height: 25px
    border-bottom: none
  tr
    line-height: 32px
  .tile
    text-align: left
</style>

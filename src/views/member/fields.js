import i18n from '@/lang'

let prefix = 'table.fields'

export const memberListTableFields = [
  {
    name: 'name',
    title: () => i18n.t(prefix + '.memberList.name'),
    sortField: 'member_name'
  },
  {
    name: 'department',
    title: () => i18n.t(prefix + '.memberList.department')
  },
  {
    name: 'post',
    title: () => i18n.t(prefix + '.memberList.post')
  },
  {
    name: 'education',
    title: () => i18n.t(prefix + '.memberList.education'),
    callback: 'formatEducation'
  },
  {
    name: 'maritalStatus',
    title: () => i18n.t(prefix + '.memberList.marital'),
    callback: 'formatMaritalStatus'
  },
  {
    name: 'sex',
    title: () => i18n.t(prefix + '.memberList.sex'),
    callback: 'formatSex'
  },
  {
    name: 'birthday',
    title: () => i18n.t(prefix + '.memberList.birthday'),
    callback: 'formatDate'
  },
  {
    name: 'idCardExp',
    title: () => i18n.t(prefix + '.memberList.idCardExp'),
    callback: 'formatDate'
  },
  {
    name: 'nativePlace',
    title: () => i18n.t(prefix + '.memberList.nativePlace')
  },
  {
    name: 'animal',
    title: () => i18n.t(prefix + '.memberList.symbolicAnimal'),
    callback: 'formatSymbolicAnimal'
  },
  {
    name: 'emergencyUser',
    title: () => i18n.t(prefix + '.memberList.emergencyUser')
  },
  {
    name: 'emergencyMobile',
    title: () => i18n.t(prefix + '.memberList.emergencyTelNo')
  },
  {
    name: 'applicateDate',
    title: () => i18n.t(prefix + '.memberList.applicateDate'),
    callback:'formatDate'
  },
  {
    name: 'entryDate',
    title: () => i18n.t(prefix + '.memberList.entryDate'),
    callback: 'formatDate'
  },
  {
    name: 'leaveDate',
    title: () => i18n.t(prefix + '.memberList.leaveDate'),
    callback: 'formatDate'
  },
  {
    name: 'memberStatus',
    title: () => i18n.t(prefix + '.memberList.status'),
    callback: 'formatMemberStatus'
  },
  {
    name: '__slot:actions',
    title: () => i18n.t(prefix + '.memberList.operation'),
    titleClass: 'center aligned',
    dataClass: 'center aligned',
    width: '20%'
  }
]

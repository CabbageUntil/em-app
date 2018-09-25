import i18n from '@/lang'

let prefix = 'table.fields'
export const existApartmentTableFields = [
  {
    name: 'deptName',
    title: () => i18n.t(prefix + '.apartmentList.deptName')
  },
  {
    name: 'deptStatus',
    title: () => i18n.t(prefix + '.apartmentList.deptStatus'),
    callback: 'formatApartmentStatus'
  },
  {
    name: 'parentName',
    title: () => i18n.t(prefix + '.apartmentList.parentName')
  },
  {
    name: 'deptCreateDatetime',
    title: () => i18n.t(prefix + '.apartmentList.deptCreateDatetime'),
    callback:'formatDate'
  },
  {
    name: 'deptRemoveDatetime',
    title: () => i18n.t(prefix + '.apartmentList.deptRemoveDatetime'),
    callback:'formatDate'
  },
  {
    name: '__slot:actions',
    title: () => i18n.t(prefix + '.apartmentList.operation'),
    titleClass: 'center aligned',
    dataClass: 'center aligned',
    width: '150px'
  }
]

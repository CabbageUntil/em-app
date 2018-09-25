import i18n from '@/lang'

let prefix = 'table.fields'

export const existComTableFields = [
  {
    name: 'orgName',
    title: () => i18n.t(prefix + '.existCompany.orgName'),
    sortField: 'org_name'
  },
  {
    name: 'createDatetime',
    title: () => i18n.t(prefix + '.existCompany.createDate'),
    sortField: 'create_datetime',
    callback:'formatDate'
  },
  {
    name: '__slot:actions',
    title: () => i18n.t(prefix + '.existCompany.operation'),
    titleClass: 'center aligned',
    dataClass: 'center aligned',
    width: '150px'
  }
]

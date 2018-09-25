import i18n from '@/lang'

let prefix = 'table.fields'

export const joinTableFields = [
  {
    name: 'name',
    title: () => i18n.t(prefix + '.joinCompany.orgName'),
    sortField: 'org_name'
  },
  {
    name: 'entry_date',
    title: () => i18n.t(prefix + '.joinCompany.entryDate'),
    sortField: 'entry_date'
  },
  {
    name: '__slot:actions',
    title: () => i18n.t(prefix + '.joinCompany.operation'),
    titleClass: 'center aligned',
    dataClass: 'center aligned',
    width: '150px'
  }
]

export const ownTableFields = [
  {
    name: 'name',
    title: () => i18n.t(prefix + '.ownCompany.orgName'),
    sortField: 'org_name'
  },
  {
    name: 'create_date',
    title: () => i18n.t(prefix + '.ownCompany.createDate'),
    sortField: 'create_datetime'
  },
  {
    name: '__slot:actions',
    title: () => i18n.t(prefix + '.ownCompany.operation'),
    titleClass: 'center aligned',
    dataClass: 'center aligned',
    width: '150px'
  }
]

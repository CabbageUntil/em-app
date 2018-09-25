import i18n from '@/lang'

let prefix = 'table.fields'
export const existScheduleTableFields = [
  {
    name: '__checkbox',
    titleClass: 'center aligned',
    dataClass: 'center aligned',
    width: '50px'
  },
  {
    name: 'deptName',
    title: () => i18n.t(prefix + '.scheduleList.deptName')
  },
  {
    name: 'memberName',
    title: () => i18n.t(prefix + '.scheduleList.memberName')
  },
  {
    name: 'note1',
    title: () => i18n.t(prefix + '.scheduleList.note1')
  },
  {
    name: 'note2',
    title: () => i18n.t(prefix + '.scheduleList.note2')
  },
  {
    name: 'note3',
    title: () => i18n.t(prefix + '.scheduleList.note3')
  },
  {
    name: 'arrange_date',
    title: () => i18n.t(prefix + '.scheduleList.createDatetime'),
    callback:'formatDate'
  },
  {
    name: '__slot:actions',
    title: () => i18n.t(prefix + '.scheduleList.operation'),
    titleClass: 'center aligned',
    dataClass: 'center aligned',
    width: '150px'
  }
]

import i18n from '@/lang'

export function formatEducation (val) {
  let prefix = 'form.personalInfo.field.education.option.'
  switch (val) {
    case 1:
      return i18n.t(prefix + 'illiterate')
    case 2:
      return i18n.t(prefix + 'primary')
    case 3:
      return i18n.t(prefix + 'junior')
    case 4:
      return i18n.t(prefix + 'senior')
    case 5:
      return i18n.t(prefix + 'juniorCollege')
    case 6:
      return i18n.t(prefix + 'bachelor')
    case 7:
      return i18n.t(prefix + 'Master')
    case 8:
      return i18n.t(prefix + 'Doctor')
    case 9:
      return i18n.t(prefix + 'Post')
    default:
      return null
  }
}

export function formatMaritalStatus (val) {
  let prefix = 'form.personalInfo.field.marital.radio.'
  switch (val) {
    case 0:
      return i18n.t(prefix + 'single')
    case 1:
      return i18n.t(prefix + 'married')
    default:
      return null
  }
}

export function formatSex (val) {
  let prefix = 'form.personalInfo.field.sex.radio.'
  switch (val) {
    case 0:
      return i18n.t(prefix + 'male')
    case 1:
      return i18n.t(prefix + 'female')
    default:
      return null
  }
}

export function formatSymbolicAnimal (val) {
  let prefix = 'form.personalInfo.field.symbolicAnimal.option.'
  switch (val) {
    case 0:
      return i18n.t(prefix + 'Rat')
    case 1:
      return i18n.t(prefix + 'Ox')
    case 2:
      return i18n.t(prefix + 'Tiger')
    case 3:
      return i18n.t(prefix + 'Rabbit')
    case 4:
      return i18n.t(prefix + 'Dragon')
    case 5:
      return i18n.t(prefix + 'Snake')
    case 6:
      return i18n.t(prefix + 'Horse')
    case 7:
      return i18n.t(prefix + 'Goat')
    case 8:
      return i18n.t(prefix + 'Monkey')
    case 9:
      return i18n.t(prefix + 'Rooster')
    case 10:
      return i18n.t(prefix + 'Dog')
    case 11:
      return i18n.t(prefix + 'Pig')
    default:
      return null
  }
}
export function formatMemberStatus (val) {
  let prefix = 'form.personalInfo.field.memberStatus.'
  // 0 待审核、1 已加入、2 已离职
  switch (val) {
    case 0:
      return i18n.t(prefix + 'pending')
    case 1:
      return i18n.t(prefix + 'alreadyJoined')
    case 2:
      return i18n.t(prefix + 'resigned')
    default:
      return null
  }
}
export function formatApartmentStatus (val) {
  let prefix = 'form.apartmentInfo.field.status.radio.'
  const i =  parseInt(val);
  switch (i) {
    case 0:
      return  "<button style='color: #fff;background: #f44336a1;border: none;border-radius: 8px;height:30px;'>"+i18n.t(prefix + 'twostatus')+"</button>"
    case 1:
      return "<button style='color: #fff;background: #689f38;border: none;border-radius: 8px;height:30px;'>"+i18n.t(prefix + 'onestatus')+"</button>"
    default:
      return null
  }
}

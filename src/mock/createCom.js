import { param2Obj } from '@/utils'

const nameArray = ['A', 'B', 'C']

export default {
  validateName: config => {
    const { value, type } = param2Obj(config.url)
    if (type === 'orgName') {
      let resultCode = nameArray.indexOf(value) === -1 ? 0 : -13
      return {
        code: resultCode,
        msg: 'success',
        data: null
      }
    } else {
      return false
    }
  },

  createCom: config => {
    const { userForm, orgForm } = JSON.parse(config.body)
    console.group('create company...')
    //console.log('userForm: %o', userForm)
    //console.log('orgForm: %o', orgForm)
    console.groupEnd()

    return {
      code: 0,
      msg: 'success'
    }
  }
}

import Cookies from 'js-cookie'

const form = {
  state: {
    userForm: Cookies.get('userForm'),
    companyName: Cookies.get('joinComName')
  },
  mutations: {
    SET_FORM: (state, form) => {
      state.userForm = form
      Cookies.set('userForm', form)
    },
    SET_JOIN_COM_NAME: (state, companyName) => {
      state.companyName = companyName
      Cookies.set('joinComName', companyName)
    }
  },
  actions: {
    setForm ({ commit }, form) {
      commit('SET_FORM', form)
    },
    setJoinComName ({ commit }, companyName) {
      commit('SET_JOIN_COM_NAME', companyName)
    }
  }
}

export default form

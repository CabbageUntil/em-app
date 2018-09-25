import Cookies from 'js-cookie'
import JwtDecode from 'jwt-decode'

const TokenKey = 'token'
const OrgTokenKey = 'orgToken'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function getOrgToken () {
  return Cookies.get(OrgTokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function setOrgToken (token) {
  return Cookies.set(OrgTokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function removeOrgToken () {
  return Cookies.remove(OrgTokenKey)
}

export function jwtDecode (jwtToken) {
  let decoded
  try {
    decoded = JwtDecode(jwtToken)
  } catch (e) {
    decoded = ''
  }
  return decoded
}

import { getToken, jwtDecode, removeToken, removeOrgToken } from '@/utils/auth.js'

const userMap = {
  test: {
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzM1MTg0MTcsImV4cCI6MTU2NTA1NDQxNywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInVzZXJuYW1lIjoidGVzdCIsInJvbGUiOiJ2aXNpdG9yIiwibmFtZSI6InRlc3QiLCJhdmF0YXIiOiJodHRwczovL3dwaW1nLndhbGxzdGNuLmNvbS9mNzc4NzM4Yy1lNGY4LTQ4NzAtYjYzNC01NjcwM2I0YWNhZmUuZ2lmIiwiaW50cm9kdWN0aW9uIjoi5oiR5piv5ri45a6iIn0.Og-eHzXl_DQ2pdHwTDmtl37mopcX7ajFrLpIY0i-iyU'
  }
}

const companyArray = [
  {
    id: 1,
    name: 'A',
    member: [
      {
        id: 100,
        username: 'test',
        name: 'John',
        role: 'creator',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzM1MjIxOTksImV4cCI6MTU2NTA1ODE5OSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIm9yZ05hbWUiOiJBIiwibWVtYmVyTmFtZSI6IkpvaG4iLCJyb2xlIjoiY3JlYXRvciJ9.EbZ35bzqjXS15PLZqTg_o4u6hzwrpvpBtYrGQuHvEtk'
      }
    ]
  },
  {
    id: 2,
    name: 'B',
    member: [
      {
        id: 200,
        username: 'test',
        name: 'Sarah',
        role: 'member',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzQxNDI4NTMsImV4cCI6MTU2NTY3ODg1MywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInJvbGUiOiJtZW1iZXIiLCJvcmdOYW1lIjoiQiIsIm1lbWJlck5hbWUiOiJTYXJhaCJ9.pcgrZLGB-940eKzl0UqkrUTM0Nd-0_TcRrdRmon7-Wk'
      }
    ]
  }
]

export default {
  login: config => {
    const { username } = JSON.parse(config.body)
    return {
      code: 0,
      msg: 'success',
      data: {
        jwt: userMap[username].token
      }
    }
  },
  loginCom: config => {
    const { orgId } = JSON.parse(config.body)
    let claim = jwtDecode(getToken())
    let findCompany = companyArray.find(item => item.id === orgId)
    let findMember = findCompany.member.find(item => item.username === claim.username)
    return {
      code: 0,
      msg: 'success',
      data: {
        jwt: findMember.token
      }
    }
  },
  logout: config => {
    removeToken()
    removeOrgToken()
    return {
      code: 0,
      msg: 'success'
    }
  },
  logoutCom: config => {
    removeOrgToken()
    return {
      code: 0,
      msg: 'success'
    }
  },
  userInfo: () => ({
    code: 0,
    msg: 'success'
  })
}

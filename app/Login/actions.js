export const actionList = {
  'LOGIN': Symbol('LOGIN'),
  'CLEAN': Symbol('CLEAN'),
  'CHECK_TOKEN': Symbol('CHECK_TOKEN'),
  'SET_TOKEN': Symbol('SET_TOKEN'),
  'INPUT_CHANGE': Symbol('INPUT_CHANGE')
}

export const login = (username, password) => ({
  type: actionList.LOGIN,
  httpRequest: {
    method: 'POST',
    url: '/api/login',
    body: {username, password},
    json: true
  }
})

export const checkToken = (token) => ({
  type: actionList.CHECK_TOKEN,
  httpRequest: {
    method: 'GET',
    url: '/api/checkToken',
    body: {token},
    json: true
  }
})

export const setToken = (token) => ({type: actionList.SET_TOKEN, token})
export const cleanup = (token) => ({type: actionList.CLEAN})

export const inputChange = (field, value) => ({
  type: actionList.INPUT_CHANGE,
  field,
  value
})

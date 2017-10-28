export const actionList = {
  'LOGIN': Symbol('LOGIN'),
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

export const inputChange = (field, value) => ({
  type: actionList.INPUT_CHANGE,
  field,
  value
})

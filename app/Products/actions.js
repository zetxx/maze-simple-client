export const actionList = {
  'FETCH': Symbol('FETCH')
}

export const fetch = (category) => ({
  type: actionList.FETCH,
  httpRequest: {
    method: 'GET',
    url: '/api/products',
    body: {},
    json: true
  }
})

export const actionList = {
  'FETCH': Symbol('FETCH'),
  'SET_SEARCH': Symbol('SET_SEARCH')
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

export const setSearchWord = (word) => ({
  type: actionList.SET_SEARCH,
  word
})

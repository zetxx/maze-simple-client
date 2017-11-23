export const actionList = {
  'FETCH': Symbol('FETCH'),
  'SET_SEARCH': Symbol('SET_SEARCH'),
  'SET_SEARCH_CAT': Symbol('SET_SEARCH_CAT')
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

export const setSearchCategory = (categoryIds) => ({
  type: actionList.SET_SEARCH_CAT,
  categoryIds
})

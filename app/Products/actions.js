export const actionList = {
  'FETCH': Symbol('FETCH'),
  'SET_SEARCH': Symbol('SET_SEARCH'),
  'SET_SEARCH_CAT': Symbol('SET_SEARCH_CAT')
}

export const fetch = (products) => ({
  type: actionList.FETCH,
  httpRequest: {
    method: (products ? 'POST' : 'GET'),
    url: '/api/products',
    body: (products ? {products} : {}),
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

export const actionList = {
  'FETCH': Symbol('FETCH'),
  'CHANGE_LANG': Symbol('CHANGE_LANG')
}

export const fetch = () => ({
  type: actionList.FETCH,
  httpRequest: {
    method: 'GET',
    url: '/api/siteConfig',
    json: true
  }
})

export const changeLanguage = (to) => ({
  type: actionList.CHANGE_LANG,
  to
})

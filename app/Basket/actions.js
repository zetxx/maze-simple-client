export const actionList = {
  'CHANGE': Symbol('CHANGE'),
  'EXPORT_PREPARE': Symbol('EXPORT_PREPARE')
}

export const change = (id) => ({
  type: actionList.CHANGE,
  id
})

export const exportPrepare = (products) => {
  return {
    type: actionList.EXPORT_PREPARE,
    httpRequest: {
      method: 'POST',
      url: `/api/products/basket/export/prepare`,
      body: {products},
      json: true
    }
  }
}

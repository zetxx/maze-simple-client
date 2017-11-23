export const actionList = {
  'CHANGE': Symbol('CHANGE')
}

export const change = (id) => ({
  type: actionList.CHANGE,
  id
})

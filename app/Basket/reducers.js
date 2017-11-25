import {actionList} from './actions'
import {fromJS} from 'immutable'
const localStorage = window.localStorage

const defBasketState = fromJS({items: [], exportPrepareId: -1})

export const basket = (state = defBasketState, action) => {
  if (action.type === '@@INIT') {
    state = fromJS(localStorage.getItem('reduxState.basket') ? JSON.parse(localStorage.getItem('reduxState.basket')) : {})
      .set('exportPrepareId', -1)
  } else if (action.type === actionList.CHANGE) {
    return state
      .update('items', (list) => {
        if (list.indexOf(action.id) >= 0) {
          return list.filter((id) => (id !== action.id))
        }
        return list.push(action.id)
      })
  } else if (action.type === actionList.EXPORT_PREPARE && action.status === 'received') {
    return state.set('exportPrepareId', action.data)
  }
  return state
}

import {actionList} from './actions'
import {fromJS} from 'immutable'
const localStorage = window.localStorage

const defBasketState = fromJS({items: []})

export const basket = (state = defBasketState, action) => {
  if (action.type === '@@INIT') {
    state = fromJS(localStorage.getItem('reduxState.basket') ? JSON.parse(localStorage.getItem('reduxState.basket')) : {})
  } else if (action.type === actionList.CHANGE) {
    return state
      .update('items', (list) => {
        if (list.indexOf(action.id) >= 0) {
          return list.filter((id) => (id !== action.id))
        }
        return list.push(action.id)
      })
  }
  return state
}

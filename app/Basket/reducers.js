import {actionList} from './actions'
import {fromJS} from 'immutable'

const defBasketState = fromJS({items: []})

export const basket = (state = defBasketState, action) => {
  if (action.type === actionList.CHANGE) {
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

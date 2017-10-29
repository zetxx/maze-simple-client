import {actionList} from './actions'
import {fromJS} from 'immutable'

const defLoginState = fromJS({data: []})

export const products = (state = defLoginState, action) => {
  if (action.type === actionList.FETCH && action.status === 'received') {
    return defLoginState
      .set('data', fromJS(action.data || []))
  }
  return state
}

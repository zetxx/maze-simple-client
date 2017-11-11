import {actionList} from './actions'
import {fromJS} from 'immutable'

const defLoginState = fromJS({data: [], searchWord: ''})

export const products = (state = defLoginState, action) => {
  if (action.type === actionList.FETCH && action.status === 'received') {
    return defLoginState
      .set('data', fromJS(action.data || []))
  } else if (action.type === actionList.SET_SEARCH) {
    return state
      .set('searchWord', action.word)
  }
  return state
}

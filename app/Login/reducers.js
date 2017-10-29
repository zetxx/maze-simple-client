import {actionList} from './actions'
import {fromJS} from 'immutable'

const defLoginState = fromJS({username: '', password: '', loginInfo: {}})

export const login = (state = defLoginState, action) => {
  if (action.type === actionList.INPUT_CHANGE) {
    return state.setIn([action.field], action.value)
  } else if (action.type === actionList.LOGIN && action.status === 'received') {
    return defLoginState
      .set('loginInfo', fromJS(action.data))
  }
  return state
}

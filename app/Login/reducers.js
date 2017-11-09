import {actionList} from './actions'
import {fromJS} from 'immutable'

const defLoginState = fromJS({username: '', password: '', loginInfo: {}, token: '', checkTokeResult: false})

export const login = (state = defLoginState, action) => {
  if (action.type === actionList.INPUT_CHANGE) {
    return state.setIn([action.field], action.value)
  } else if (action.type === actionList.LOGIN && action.status === 'received') {
    return defLoginState
      .set('loginInfo', fromJS(action.data))
  } else if (action.type === actionList.SET_TOKEN) {
    return state.set('token', action.token)
  } else if (action.type === actionList.CHECK_TOKEN && action.status === 'received') {
    if (action.status === 'received') {
      return state
        .set('checkTokeResult', (action.err ? undefined : true))
    } else {
      return state
        .set('checkTokeResult', null)
    }
  } else if (action.type === actionList.CLEAN) {
    return defLoginState
  }
  return state
}

import {actionList} from './actions'
import {fromJS} from 'immutable'

const defLoginState = fromJS({token: '', username: '', password: ''})

export const login = (state = defLoginState, action) => {
  if (action.type === actionList.INPUT_CHANGE) {
    return state.setIn([action.field], action.value)
  }
  return state
}

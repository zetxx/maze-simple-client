import {actionList} from './actions'
import {fromJS} from 'immutable'

const defLoginState = fromJS({
  'language': undefined
})

export const siteConfig = (state = defLoginState, action) => {
  if (action.type === actionList.FETCH && action.status === 'received') {
    state = fromJS(action.data)
    return state.setIn(['language', 'current'], state.getIn(['language', 'default']))
  } else if (action.type === actionList.CHANGE_LANG) {
    return state.setIn(['language', 'current'], action.to)
  }
  return state
}

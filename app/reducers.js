import {login} from './Login/reducers'
import {siteConfig} from './Config/reducers'
import {products} from './Products/reducers'
import {basket} from './Basket/reducers'

export default {
  login,
  siteConfig,
  products,
  basket,
  prefetchDialog(state = {open: false, count: 0}, action) {
    if (action.preloader === false) {
      return state
    }
    if (action.httpRequest) {
      if (action.status === 'sent') {
        return Object.assign({}, state, {open: true, count: state.count + 1})
      } else if (action.status === 'received') {
        var count = state.count - 1
        if (count <= 0) {
          return Object.assign({}, state, {open: false, count: count})
        }
        return Object.assign({}, state, {count: count})
      }
    }
    return state
  },
  errorDialog(state = {open: false, errorStack: []}, action) {
    if (action.httpRequest && action.status === 'received' && action.err) {
      var newState = Object.assign({}, state, {open: true})
      newState.errorStack.push((action.err.response && action.err.response.body) || action.err)
      return newState
    } else if (action.type === 'CLEANUP_HIDE_ERRORS') {
      return {open: false, errorStack: []}
    }
    return state
  }
}

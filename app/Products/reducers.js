import {actionList} from './actions'
import {fromJS, List} from 'immutable'

const defLoginState = fromJS({products: [], searchWord: '', searchCategory: [], productCategories: [], currencyRate: {}})

export const products = (state = defLoginState, action) => {
  if (action.type === actionList.FETCH && action.status === 'received') {
    return defLoginState
      .set('products', fromJS(action.data.products || []))
      .set('productCategories', fromJS(action.data.productCategories || []))
      .set('currencyRate', fromJS(action.data.currencyRate || {}))
  } else if (action.type === actionList.SET_SEARCH) {
    return state
      .set('searchWord', action.word)
  } else if (action.type === actionList.SET_SEARCH_CAT) {
    if (!action.categoryIds[action.categoryIds.length - 1]) {
      return state
        .set('searchCategory', List())
    }
    return state
      .set('searchCategory', List(action.categoryIds))
  }
  return state
}

import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import {Router, Route, hashHistory, Redirect} from 'react-router'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import reducers from './reducers'
import {request} from './middleware'
import Login from './Login'
import Main from './Main'

injectTapEventPlugin()

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  compose(
    applyMiddleware(request),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/login' component={Login} />
      <Route path='/:token/:page' component={Main} />
      <Redirect from='/' to='/login' />
    </Router>
  </Provider>,
  document.getElementById('root')
)

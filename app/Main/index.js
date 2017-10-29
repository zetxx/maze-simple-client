import React from 'react'
import {connect} from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import PrefetchDialog from './PrefetchDialog.js'
import ErrorDialog from './ErrorDialog.js'
import Login from '../Login'
import {Entry} from '../Entry'
import PropTypes from 'prop-types'
import {fetch} from '../Config/actions'

const theme = createMuiTheme()

class Gate extends React.Component {
  componentWillMount() {
    this.props.fetch()
  }
  render() {
    if (!this.props.siteConfig.get('language')) {
      return null
    }
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          {this.props.loginToken ? <Entry /> : <Login />}
          {this.props.children}
          <PrefetchDialog />
          <ErrorDialog />
        </div>
      </MuiThemeProvider>
    )
  }
}

Gate.propTypes = {
  children: PropTypes.object,
  siteConfig: PropTypes.object,
  loginToken: PropTypes.bool,
  fetch: PropTypes.func
}

Gate.contextTypes = {
  router: PropTypes.object
}

export default connect(
  (state) => ({
    siteConfig: state.siteConfig,
    loginToken: !!state.login.getIn(['loginInfo', 'token'])
  }),
  {fetch}
)(Gate)

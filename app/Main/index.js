import React from 'react'
import {connect} from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import PrefetchDialog from './PrefetchDialog.js'
import ErrorDialog from './ErrorDialog.js'
import {Entry} from '../Entry'
import PropTypes from 'prop-types'
import {setToken, checkToken} from '../Login/actions'
import {fetch as fetchSiteConfig} from '../Config/actions'

const theme = createMuiTheme()

class Gate extends React.Component {
  componentWillMount() {
    if (!this.props.siteConfig.get('language')) {
      this.props.fetchSiteConfig()
    }
  }
  componentWillUpdate (nextProps, nextState) {
    nextProps.params.token && this.props.setToken(nextProps.params.token)
    nextProps.checkTokeResult === false && nextProps.tokenExists && this.props.checkToken(nextProps.token)
    if (nextProps.tokenExists && nextProps.checkTokeResult === undefined) {
      this.context.router.push('/login')
    } else if (nextProps.checkTokeResult) {
      return true
    }
    return false
  }
  render() {
    if (!this.props.siteConfig.get('language') || !this.props.tokenExists || !this.props.checkTokeResult) {
      return null
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Entry page={this.props.params.page} />
          {this.props.children}
          <PrefetchDialog />
          <ErrorDialog />
        </div>
      </MuiThemeProvider>
    )
  }
}

Gate.propTypes = {
  token: PropTypes.string,
  tokenExists: PropTypes.bool,
  checkTokeResult: PropTypes.bool,
  params: PropTypes.object,
  children: PropTypes.object,
  siteConfig: PropTypes.object,
  fetchSiteConfig: PropTypes.func,
  checkToken: PropTypes.func,
  setToken: PropTypes.func
}

Gate.contextTypes = {
  router: PropTypes.object
}

export default connect(
  (state) => ({
    siteConfig: state.siteConfig,
    checkTokeResult: state.login.get('checkTokeResult'),
    tokenExists: !!state.login.get('token'),
    token: state.login.get('token')
  }),
  {fetchSiteConfig, setToken, checkToken}
)(Gate)

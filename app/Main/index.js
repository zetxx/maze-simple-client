import React from 'react'
import {connect} from 'react-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import PrefetchDialog from './PrefetchDialog.js'
import ErrorDialog from './ErrorDialog.js'
import PropTypes from 'prop-types'

class Gate extends React.Component {
  getChildContext() {
    return {muiTheme: getMuiTheme()}
  }
  redirect(to) {
    if (!to.bubbles) {
      this.context.router.push(to)
    }
  }
  render() {
    return (
      <div>
        zzzz
        {this.props.children}
        <PrefetchDialog />
        <ErrorDialog />
      </div>
    )
  }
}

Gate.propTypes = {
  children: PropTypes.object
}

Gate.contextTypes = {
  router: PropTypes.object
}

Gate.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
}

export default connect(
  (state) => ({}),
  {}
)(Gate)

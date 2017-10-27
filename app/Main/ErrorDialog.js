import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog/Dialog'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import {errorParser} from '../Helpers.js'
import PropTypes from 'prop-types'

class ErrorDialog extends React.Component {
  render() {
    const actions = [
      <FlatButton
        label='OK'
        primary
        onTouchTap={this.props.cleanup}
      />
    ]

    return (
      <Dialog style={{zIndex: 9999}} title='ERROR STACK BELOW' modal open={this.props.errorDialog.open} actions={actions}>
        {this.props.errorDialog.errorStack.map((err, idx) => {
          return errorParser(err, idx)
        })}
      </Dialog>
    )
  }
}

ErrorDialog.propTypes = {
  cleanup: PropTypes.func,
  errorDialog: PropTypes.object
}

export default connect(
  (state) => ({errorDialog: state.errorDialog}),
  {
    cleanup() {
      return {type: 'CLEANUP_HIDE_ERRORS'}
    }
  }
)(ErrorDialog)

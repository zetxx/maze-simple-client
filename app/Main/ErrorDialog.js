import React from 'react'
import {connect} from 'react-redux'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import PropTypes from 'prop-types'
import {Translate} from '../Translation'

import Card, {CardHeader} from 'material-ui/Card'

const errorParser = (err, idx) => {
  return (
    <Card key={idx}>
      <CardHeader
        title={err.error + ' ' + err.statusCode}
        subheader={err.message}
      />
    </Card>
  )
}

class ErrorDialog extends React.Component {
  render() {
    return (
      <Dialog open={this.props.errorDialog.open} style={{zIndex: 9999}}>
        <DialogTitle><Translate>ERROR STACK BELOW</Translate></DialogTitle>
        <DialogContent>
          {this.props.errorDialog.errorStack.map((err, idx) => {
            return errorParser(err, idx)
          })}
        </DialogContent>
        <DialogActions>
          <Button onTouchTap={this.props.cleanup} color='primary'>
            <Translate>OK</Translate>
          </Button>
        </DialogActions>
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

import React from 'react'
import {connect} from 'react-redux'
import {Translate} from '../Translation'
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'
import PropTypes from 'prop-types'

class PrefetchDialog extends React.Component {
  render() {
    return (
      <Dialog open={this.props.prefetchDialog.open} style={{zIndex: 9999}}>
        <DialogTitle><Translate>Working</Translate></DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Translate>Please wait for a while, fetching data</Translate>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    )
  }
}

PrefetchDialog.propTypes = {
  prefetchDialog: PropTypes.object
}

export default connect(
  (state) => ({prefetchDialog: state.prefetchDialog})
)(PrefetchDialog)

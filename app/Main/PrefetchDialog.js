import React from 'react'
import {connect} from 'react-redux'
import {Translate} from '../Translation'
import Dialog from 'material-ui/Dialog/Dialog'
import PropTypes from 'prop-types'

class PrefetchDialog extends React.Component {
  render() {
    return (
      <Dialog title={<h3 style={{padding: '24px'}}><Translate id='Action ordered!' /></h3>} modal open={this.props.prefetchDialog.open}>
        <Translate id='pwfwfd' />
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

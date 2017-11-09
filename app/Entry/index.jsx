import React from 'react'
import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
// import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import T from '../Translation'
import Products from '../Products'

export class Entry extends React.Component {
  render() {
    var page = null
    switch (this.props.page) {
      case 'products':
        page = (<Products />)
        break
    }
    return (
      <div>
        <AppBar>
          <Toolbar>
            <Typography type='title' color='inherit'>
              <T>Results Bellow</T>
            </Typography>
          </Toolbar>
        </AppBar><br />
        {page}
      </div>
    )
  }
}

Entry.propTypes = {
  page: PropTypes.string
}

import React from 'react'
import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
// import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import logoBig from '../static/images/logo-big.jpg'
import T from '../Translation'
import Products from '../Products'

export class Entry extends React.Component {
  render() {
    var page = null
    var title = ''
    switch (this.props.page) {
      case 'products':
        title = 'Products'
        page = (<Products />)
        break
    }
    return (
      <div>
        <AppBar>
          <Toolbar>
            <img src={logoBig} alt='logo' style={{width: '150px', margin: '2px 10px 0 0'}} />
            <Typography type='title' color='inherit'>
              <T>{title}</T>
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

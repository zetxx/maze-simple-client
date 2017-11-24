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
import Basket from '../Basket'

export class Entry extends React.Component {
  render() {
    var page = null
    var appBarRight = null
    var title = ''
    switch (this.props.page) {
      case 'products':
        title = 'Products'
        page = (<Products />)
        appBarRight = (<Basket />)
        break
      case 'basket':
        title = 'Basket'
        page = (<Products basketSelected />)
        appBarRight = (<Basket basketSelected />)
        break
    }
    return (
      <div>
        <AppBar>
          <Toolbar>
            <img src={logoBig} alt='logo' style={{width: '150px', margin: '2px 10px 0 0'}} />
            <Typography type='title' color='inherit' style={{flex: 1}}>
              <T>{title}</T>
            </Typography>
            {appBarRight}
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

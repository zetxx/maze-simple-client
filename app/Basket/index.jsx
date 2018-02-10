import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Badge from 'material-ui/Badge'
import Button from 'material-ui/Button'
import ShoppingCart from 'material-ui-icons/ShoppingCart'
// import T from '../Translation'

export class Basket extends React.Component {
  // constructor(p) {
  //   super(p)
  // }
  render() {
    let href = this.props.basketSelected ? `#/${this.props.token}/products` : `#/${this.props.token}/basket`
    return (
      <Button variant='fab' color='primary' href={href}>
        <Badge badgeContent={this.props.basketSize} color='secondary'>
          <ShoppingCart />
        </Badge>
      </Button>
    )
  }
}

Basket.propTypes = {
  basketSize: PropTypes.number,
  token: PropTypes.string,
  basketSelected: PropTypes.bool
}

export default connect(
  (state) => {
    var basketItems = state.basket.get('items')
    return {
      basketSize: (basketItems && basketItems.size) || 0,
      token: state.login.getIn(['token'])
    }
  },
  {}
)(Basket)

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
    return (
      <Button fab color='primary' href='/abc' >
        <Badge badgeContent={this.props.basketSize} color='accent' href='/abc' >
          <ShoppingCart />
        </Badge>
      </Button>
    )
  }
}

Basket.propTypes = {
  basketSize: PropTypes.number
}

export default connect(
  (state) => {
    return {
      basketSize: state.basket.get('items').size
    }
  },
  {}
)(Basket)

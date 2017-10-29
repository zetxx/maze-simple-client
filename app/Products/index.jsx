import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import T from '../Translation'
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import {fetch} from './actions'

export class Products extends React.Component {
  componentWillMount() {
    this.props.fetch()
  }
  render() {
    return (
      <Paper elevation={4} style={{padding: '15px', margin: '50px 0 0 0'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <T>Name</T>
              </TableCell>
              <TableCell>
                <T>Price</T>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.products.map((v, idx) => {
              console.log(v)
              return (
                <TableRow key={idx}>
                  <TableCell>{v.name}</TableCell>
                  <TableCell>{v.price}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

Products.propTypes = {
  fetch: PropTypes.func,
  products: PropTypes.array
}

export default connect(
  (state) => ({
    products: state.products.get('data').toJS()
  }),
  {fetch}
)(Products)

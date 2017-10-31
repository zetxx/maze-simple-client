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
import AttachmentIcon from 'material-ui-icons/Attachment'
import Paper from 'material-ui/Paper'
import {fetch} from './actions'

var fileStyles = {
  display: 'inline-block',
  margin: '0 10px 0 0'
}

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
              <TableCell>
                <T>Files</T>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.products.map((v, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell>{v.name}</TableCell>
                  <TableCell>{v.price}</TableCell>
                  <TableCell>
                    {(v.files || []).map((file) => {
                      if (file.contentType.indexOf('image') >= 0) {
                        return (<a style={fileStyles} target='_blank' href={`/api/files/${file.id}`} title={file.name}><img alt={file.name} src={`/api/files/image/${file.id}/40x40`} /></a>)
                      }
                      return (<a style={fileStyles} target='_blank' href={`/api/files/${file.id}`} title={file.name}><AttachmentIcon style={{width: '40px', height: '40px'}} /></a>)
                    })}
                  </TableCell>
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

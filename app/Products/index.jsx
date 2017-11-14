import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table'
import AttachmentIcon from 'material-ui-icons/Attachment'
import Paper from 'material-ui/Paper'
import {fetch, setSearchWord} from './actions'
import Toolbar from 'material-ui/Toolbar'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid'
import T from '../Translation'

var fileStyles = {
  display: 'inline-block',
  margin: '0 10px 0 0'
}

export class Products extends React.Component {
  constructor(p) {
    super(p)
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentWillMount() {
    this.props.fetch()
  }
  handleSearch (e) {
    this.props.setSearchWord(e.target.value)
  }
  render() {
    console.log(this.props.searchWord)
    return (
      <Paper elevation={4} style={{padding: '15px', margin: '50px 0 0 0'}}>
        <Toolbar>
          <Grid container spacing={24}>
            <TextField label='Search word' onChange={this.handleSearch} />
          </Grid>
          <a href={`/api/products/export/${this.props.token}`} style={{textAlign: 'right'}}>Export</a>
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell key={1}>
                <T>Name</T>
              </TableCell>
              <TableCell key={2}>
                <T>Price</T>
              </TableCell>
              <TableCell key={3}>
                <T>Files</T>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.products
              .filter((v) => {
                return this.props.searchWord === '' ||
                (v.name.indexOf(this.props.searchWord) >= 0)
              })
              .map((v, idx) => {
                return (
                  <TableRow key={idx}>
                    <TableCell key={`1_${idx}`}>{v.name}</TableCell>
                    <TableCell key={`2_${idx}`}>{v.price}</TableCell>
                    <TableCell key={`3_${idx}`}>
                      {(v.files || []).map((file, idx2) => {
                        if (file.contentType.indexOf('image') >= 0) {
                          return (<a key={idx2} style={fileStyles} target='_blank' href={`/api/files/${file.id}`} title={file.name}><img alt={file.name} src={`/api/files/image/${file.id}/40x40`} /></a>)
                        }
                        return (<a key={idx2} style={fileStyles} target='_blank' href={`/api/files/${file.id}`} title={file.name}><AttachmentIcon style={{width: '40px', height: '40px'}} /></a>)
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
  token: PropTypes.string,
  searchWord: PropTypes.string,
  setSearchWord: PropTypes.func,
  products: PropTypes.array
}

export default connect(
  (state) => ({
    products: state.products.get('data').toJS(),
    searchWord: state.products.get('searchWord'),
    token: state.login.get('token')
  }),
  {fetch, setSearchWord}
)(Products)

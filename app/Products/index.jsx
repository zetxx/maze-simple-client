import React from 'react'
import Button from 'material-ui/Button'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table'
import Select from 'material-ui/Select'
import Input, {InputLabel} from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import {FormControl} from 'material-ui/Form'
import AttachmentIcon from 'material-ui-icons/Attachment'
import Paper from 'material-ui/Paper'
import {fetch, setSearchWord, setSearchCategory} from './actions'
import {change as toBasket} from '../Basket/actions'
import Toolbar from 'material-ui/Toolbar'
import ShoppingCart from 'material-ui-icons/ShoppingCart'
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
    this.handleCategorySearch = this.handleCategorySearch.bind(this)
  }
  componentWillMount() {
    this.props.fetch()
  }
  handleSearch (e) {
    this.props.setSearchWord(e.target.value)
  }
  handleCategorySearch ({target: {value}}) {
    this.props.setSearchCategory(value)
  }
  handleToBasket (id) {
    return () => {
      this.props.toBasket(id)
    }
  }
  render() {
    return (
      <Paper elevation={4} style={{padding: '15px', margin: '50px 0 0 0'}}>
        <Toolbar>
          <Grid container spacing={24}>
            <FormControl>
              <InputLabel><T>Search word</T></InputLabel>
              <Input onChange={this.handleSearch} />
            </FormControl>
            &nbsp;
            <FormControl>
              <InputLabel><T>Category</T></InputLabel>
              <Select
                style={{width: '100px'}}
                multiple
                value={this.props.searchCategory}
                onChange={this.handleCategorySearch}
                input={<Input id='name-multiple' />}
              >
                <MenuItem key={0} value={0}><T>Clear all</T></MenuItem>
                {this.props.productCategories.map(item => (
                  <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Button raised href={`/api/products/export/${this.props.token}`} style={{textAlign: 'right'}} color='primary'>
            <T>Export</T>
          </Button>
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell key={1}>
                <T>Name</T>
              </TableCell>
              <TableCell key={2}>
                <T>Category</T>
              </TableCell>
              <TableCell key={3}>
                {{
                  '': (''),
                  'EUR': (<T>Price EUR/without vat</T>),
                  'BGN': (<T>Price BGN/without vat</T>),
                  'USD': (<T>Price USD/without vat</T>),
                  'JPY': (<T>Price JPY/without vat</T>),
                  'GBP': (<T>Price GBP/without vat</T>),
                  'RUB': (<T>Price RUB/without vat</T>)
                }[this.props.currency]}
              </TableCell>
              <TableCell key={4}>
                <T>Files</T>
              </TableCell>
              <TableCell key={5} style={{width: '20px'}}>
                <T>Add To Basket</T>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.products
              .filter((v) => {
                return this.props.searchWord === '' ||
                ((v.name || '').toLowerCase().indexOf(this.props.searchWord.toLowerCase()) >= 0) ||
                ((v.articleNum || '').toLowerCase().indexOf(this.props.searchWord.toLowerCase()) >= 0)
              })
              .filter((v) => {
                return this.props.searchCategory.length === 0 ||
                this.props.searchCategory.indexOf(v.productCategory.id) >= 0
              })
              .map((v, idx) => {
                return (
                  <TableRow key={idx}>
                    <TableCell key={`1_${idx}`}>{v.name}</TableCell>
                    <TableCell key={`2_${idx}`}>{v.productCategory.name}</TableCell>
                    <TableCell key={`3_${idx}`}>{v.price}</TableCell>
                    <TableCell key={`4_${idx}`}>
                      {(v.files || []).map((file, idx2) => {
                        if (file.contentType.indexOf('image') >= 0) {
                          return (<a key={idx2} style={fileStyles} target='_blank' href={`/api/files/${file.id}`} title={file.name}><img alt={file.name} src={`/api/files/image/${file.id}/40x40`} /></a>)
                        }
                        return (<a key={idx2} style={fileStyles} target='_blank' href={`/api/files/${file.id}`} title={file.name}><AttachmentIcon style={{width: '40px', height: '40px'}} /></a>)
                      })}
                    </TableCell>
                    <TableCell key={`5_${idx}`}><ShoppingCart onClick={this.handleToBasket(v.id)} style={{cursor: 'pointer'}} /></TableCell>
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
  currency: PropTypes.string,
  searchWord: PropTypes.string,
  searchCategory: PropTypes.array,
  setSearchCategory: PropTypes.func,
  toBasket: PropTypes.func,
  setSearchWord: PropTypes.func,
  productCategories: PropTypes.array,
  products: PropTypes.array
}

export default connect(
  (state) => {
    return {
      products: state.products.get('products').toJS(),
      productCategories: state.products.get('productCategories').toJS(),
      currency: state.products.getIn(['currencyRate', 'currency']) || '',
      searchWord: state.products.get('searchWord'),
      searchCategory: state.products.get('searchCategory').toJS(),
      token: state.login.get('token')
    }
  },
  {fetch, setSearchWord, setSearchCategory, toBasket}
)(Products)

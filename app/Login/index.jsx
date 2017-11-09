import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Translate} from '../Translation'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import {login, inputChange, cleanup} from './actions'
import {fetch} from '../Config/actions'

export class Login extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.canLogin = this.canLogin.bind(this)
  }
  componentWillMount() {
    this.props.fetch()
    this.props.cleanup()
  }
  handleLogin() {
    this.props.login(this.props.username, this.props.password)
  }
  handleChange(field) {
    return (e) => {
      this.props.inputChange(field, e.target.value)
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.token) {
      this.context.router.push(`/${nextProps.token}/products`)
    }
  }
  canLogin() {
    return (
      this.props.username !== '' &&
      this.props.password !== ''
    )
  }
  render() {
    if (!this.props.siteConfig.get('language')) {
      return null
    }
    return (
      <Paper elevation={4} style={{width: '600px', margin: '20% auto 0 auto', padding: '10px'}}>
        <Typography type='headline' component='h3'>
          <Translate>Login</Translate>
        </Typography>
        <div>
          <TextField
            onChange={this.handleChange('username')}
            label='User Name'
            type='text'
            margin='normal'
            value={this.props.username}
          />&nbsp;
          <TextField
            onChange={this.handleChange('password')}
            label='Password'
            type='password'
            autoComplete='current-password'
            margin='normal'
            value={this.props.password}
          />&nbsp;&nbsp;&nbsp;
          <Button disabled={!this.canLogin()} raised color='primary' onTouchTap={this.handleLogin}>
            <Translate>Login</Translate>
          </Button>
        </div>
      </Paper>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func,
  cleanup: PropTypes.func,
  siteConfig: PropTypes.object,
  inputChange: PropTypes.func,
  fetch: PropTypes.func,
  username: PropTypes.string,
  token: PropTypes.string,
  password: PropTypes.string
}

Login.contextTypes = {
  router: PropTypes.object
}

export default connect(
  (state) => ({
    siteConfig: state.siteConfig,
    username: state.login.get('username'),
    password: state.login.get('password'),
    token: state.login.getIn(['loginInfo', 'token'])
  }),
  {login, inputChange, fetch, cleanup}
)(Login)

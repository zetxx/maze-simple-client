import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Translate} from '../Translation'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import {login, inputChange} from './actions'

export class Login extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.canLogin = this.canLogin.bind(this)
  }
  handleLogin() {
    this.props.login(this.props.username, this.props.password)
  }
  handleChange(field) {
    return (e) => {
      this.props.inputChange(field, e.target.value)
    }
  }
  canLogin() {
    return (
      this.props.username !== '' &&
      this.props.password !== ''
    )
  }
  render() {
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
  inputChange: PropTypes.func,
  username: PropTypes.string,
  password: PropTypes.string
}

export default connect(
  (state) => ({
    username: state.login.get('username'),
    password: state.login.get('password')
  }),
  {login, inputChange}
)(Login)

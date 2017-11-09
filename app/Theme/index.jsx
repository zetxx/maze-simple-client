import React from 'react'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'
import PropTypes from 'prop-types'
import {red} from 'material-ui/colors'

const theme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: red['A100']
      }
    },
    MuiButton: {
      raisedPrimary: {
        backgroundColor: red['A100'],
        '&:hover': {
          backgroundColor: red['500']
        }
      }
    }
  }
})

export class ThemeProvider extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        {this.props.children}
      </MuiThemeProvider>
    )
  }
}

ThemeProvider.propTypes = {
  children: PropTypes.node
}

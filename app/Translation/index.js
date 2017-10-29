import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
// import createClass from 'create-react-class'

class translate extends React.Component {
  constructor(props) {
    super(props)
    this.getTranslation.bind(this)
  }
  getTranslation() {
    if (this.props.language.current === '') {
      throw new Error(`no language defined`)
    } else if (!this.props.language.dictionary[this.props.language.current]) {
      throw new Error(`no messages defined for language "${this.props.language.current}"`)
    } else if (!this.props.language.dictionary[this.props.language.current][this.props.children]) {
      throw new Error(`no label "${this.props.children}" defined for language "${this.props.language.current}" messages`)
    } else {
      return this.props.language.dictionary[this.props.language.current][this.props.children]
    }
  }
  render() {
    return (
      <span>{this.getTranslation()}</span>
    )
  }
}

translate.propTypes = {
  children: PropTypes.string,
  language: PropTypes.object
}

export const Translate = connect(
  (state) => ({language: state.siteConfig.get('language').toJS()})
)(translate)

export default Translate

import React from 'react'
import {connect} from 'react-redux'
import Languages from '../../config/languages'
import PropTypes from 'prop-types'
// import createClass from 'create-react-class'

class translate extends React.Component {
  constructor(props) {
    super(props)
    this.getTranslation.bind(this)
  }
  getTranslation() {
    if (!this.props.language) {
      throw new Error(`no language "${this.props.language}" defined`)
    } else if (!Languages[this.props.language]) {
      throw new Error(`no messages defined for language "${this.props.language}"`)
    } else if (!Languages[this.props.language][this.props.id]) {
      throw new Error(`no id "${this.props.id}" defined for language "${this.props.language}" messages`)
    } else {
      return Languages[this.props.language][this.props.id]
    }
  }
  render() {
    var text = this.getTranslation()

    return (
      <span>{text}</span>
    )
  }
}

class translateHTML extends translate {
  render() {
    var text = this.getTranslation()

    return (
      <span dangerouslySetInnerHTML={{__html: text}} />
    )
  }
}

translate.propTypes = {
  id: PropTypes.string,
  language: PropTypes.string
}

export const Translate = connect(
  (state) => ({language: state.siteConfig.globalLanguage})
)(translate)

export const TranslateHTML = connect(
  (state) => ({language: state.siteConfig.globalLanguage})
)(translateHTML)

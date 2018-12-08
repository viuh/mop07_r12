import React from 'react'

class TogglableDiv extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true
    }
  }

  toggleVisible = () => {
    this.setState({ visible: true})
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={showWhenVisible} onClick={this.toggleVisibility}></div>
        <div style={hideWhenVisible} onClick={this.toggleVisibility}>
        {this.props.children}
          </div>
      </div>
    )
  }
}

export default TogglableDiv


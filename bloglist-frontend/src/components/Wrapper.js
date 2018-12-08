import React from 'react'
import LoginForm from './LoginForm'

class Wrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formInput: '',
      username: 'test',
      password: 'test' ,
      //onSubmit: 'X',
      handleSubmit: 0,
      handleChange: 0,
      visible: '',
      chgCounter : 0,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();
    alert(
      `Selected `
    );
    this.setState({handleSubmit: 1})
    }
  
  

  onChange = (e) => {
    e.preventDefault();
    this.props.onChange();
    let tila = this.state.chgCounter+1

    this.setState({ 
        formInput: e.target.value , 
        username : e.target.value
     })
  }
  /*onSubmit = (e) => {
    this.setState({ onSubmit: 'Y' })
  }*/

  handleChange = (e) => {
    this.setState({handleChange: 1 , username : e.target.value
    })
  }


  render() {
    return (
      <LoginForm
        value={this.state.formInput}
        username={this.state.username}
        password={this.state.password}
        onSubmit={this.props.onSubmit}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}        
      />
  )}
}

export default Wrapper

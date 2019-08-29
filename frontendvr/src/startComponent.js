import React, { Component } from 'react'
import axios from 'axios'

class StartComponent extends Component {
  state = {
    username: '',
    password: '',
  }
  handleChange = (e) => {
    nm = e.target.name
    val = e.target.value
    this.setState(prevState => {
      const newState = prevState
      newState[nm] = val;
      return newState
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/user_login/', this.state)
      .then(res => {
        console.log("Success")
        window.location.href = "http://localhost:3000/phone_reg/"+res.data.id.toString()
        localStorage.setItem('username',res.data.username)
      })
      .catch(err => {
        console.log(err)
      })
  }
  render () {
    return (
        <div id="start">
          <h2>Welcome to VR game app</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
            <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
            <input type="submit" />
          </form>
        </div>
        )
  }
}

export default StartComponent

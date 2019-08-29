import React, { Component } from 'react'
import axios from 'axios'

class PhoneRegComponent extends Component {
  state = {
    'phone_reg_name': '',
    fetching: true,
    isAuthorised: false
  }
  componentDidMount () {
    let user_id = this.props.match.params.user_id
    let get_url = 'https://localhost:8000/api/users/'+user_id.toString()+'/'
    axios.get(get_url)
      .then(res => {
        let ia = false
        let un = localStorage.getItem('username')
        this.setState({fetching: false})
        if (un !== res.data.username)
            ia = false
        else
            ia = true
        this.setState({isAuthorised: ia})
      })
      .catch(err => {
        console.log(err)
      })
  }
  handleChange = (e) => {
    let nm = e.target.name
    let val = e.target.value
    this.setState(prevState => {
      const newState = prevState
      newState[nm] = val;
      return newState
    })
  }
  handleSubmit = (e) => {
    let user_id = this.props.match.params.user_id
    let post_data = this.state
    post_data['user_id'] = user_id
    axios.post('https://localhost:8000/api/userdb/', post_data)
      .then(res => {
        console.log("Success")
        window.location.href = "http://localhost:3000/vrgame/"+res.data.id.toString()
      })
      .catch(err => {
        console.log(err)
      })
  }
  render () {
    const {fetching, isAuthorised} = this.state
    return (
  <div>
    {fetching ?
        (<h1>Loading...</h1>) : isAuthorised ? (<div>
          <h3>Welcome</h3>
          <h3>Create new session for starting the game</h3>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="phone_reg_name" value={this.state.phone_reg_name} onChange={this.handleChange} />
            <input type="submit" />
          </form>
        </div>) : (<h1>You are unauthorized</h1>)}
  </div>
        )
  }
}

export default PhoneRegComponent

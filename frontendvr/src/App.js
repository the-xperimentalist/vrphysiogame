import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import StartComponent from './startComponent'
import PhoneRegComponent from './phoneRegComponent'
import VrGameComponent from './vrGameComponent'

class App extends Component {
  state = {}
  render () {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact name='start' path='/' component={StartComponent} />
            <Route exact name='phone_reg' path='/phone_reg/:user_id' component={PhoneRegComponent} />
            <Route exact name='vrgame' path='/vrgame/:user_db_id' component={VrGameComponent} />
          </Switch>
        </BrowserRouter>
        )
  }
}

export default App

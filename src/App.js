import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route path='/' component={Login} exact/>
            <Route path='/dashboard' component={Dashboard} />
            {/* <Route path='/profile' component={Profile} /> */}
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;

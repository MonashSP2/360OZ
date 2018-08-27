import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Before from './pages/Before';
import After from './pages/After';
import Sign from './Sign';

class Body extends Component {
  render() {
    return (
      <main>
        <Sign />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/before' component={Before}/>
          <Route path='/after' component={After}/>
        </Switch>
      </main>
    )
  }
}

export default Body;

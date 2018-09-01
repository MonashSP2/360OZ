import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Before from './pages/Before';
import SearchCampus from './pages/SearchCampus';
import SearchCaulfield from './pages/SearchCaulfield';
import SearchClayton from './pages/SearchClayton';
import SearchParkville from './pages/SearchParkville';
import SearchPeninsula from './pages/SearchPeninsula';

import After from './pages/After';

class Body extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/before' component={Before}/>
          <Route path='/searchcampus' component={SearchCampus}/>
          <Route path='/searchcaulfield' component={SearchCaulfield}/>
          <Route path='/searchclayton' component={SearchClayton}/>
          <Route path='/searchparkville' component={SearchParkville}/>
          <Route path='/searchpeninsula' component={SearchPeninsula}/>
          <Route path='/after' component={After}/>
        </Switch>
      </main>
    )
  }
}

export default Body;

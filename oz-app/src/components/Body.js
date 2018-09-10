import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom'
import Home from './pages/Home'
import Before from './pages/Before';
import SearchCampus from './pages/SearchCampus';
import SearchCaulfield from './pages/SearchCaulfield';
import SearchClayton from './pages/SearchClayton';
import SearchParkville from './pages/SearchParkville';
import SearchPeninsula from './pages/SearchPeninsula';
import LocationRequest from './pages/LocationRequest';
import PlanTemplate from './pages/PlanTemplate';
import Results from './pages/parts/challengeform/showResults';

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
          <Route exact path='/after' component={After}/>
          <Route exact path='/locationrequest' component={LocationRequest}/>
          <Route exact path='/locationrequest/:locationpara' component={PlanTemplate}/>
          <Route exact path='/locationrequest/:locationpara/challengesubmission' component={Results}/>
        </Switch>
      </main>
    )
  }
}

export default Body;

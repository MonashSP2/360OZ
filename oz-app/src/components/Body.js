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
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Login from './pages/Login';

import After from './pages/After';
import UsefulInfoPhone from './pages/UsefulInfoPhone';
import UsefulInfoBank from './pages/UsefulInfoBank';

function onAuthRequired({history}) {
  history.push('/login');
}

class Body extends Component {
  render() {
    return (
      <main>
        <Security issuer='https://dev-801046.oktapreview.com/oauth2/default'
                  client_id='0oagb60a0cBf8bi0F0h7'
                  redirect_uri={window.location.origin + '/implicit/callback'}
                  onAuthRequired={onAuthRequired} >
        <Switch>
          <SecureRoute exact path='/' component={Home}/>
          <SecureRoute path='/before' component={Before}/>
          <SecureRoute path='/searchcampus' component={SearchCampus}/>
          <SecureRoute path='/searchcaulfield' component={SearchCaulfield}/>
          <SecureRoute path='/searchclayton' component={SearchClayton}/>
          <SecureRoute path='/searchparkville' component={SearchParkville}/>
          <SecureRoute path='/searchpeninsula' component={SearchPeninsula}/>
          <SecureRoute exact path='/after' component={After}/>
          <SecureRoute exact path='/usefulinfophone' component={UsefulInfoPhone}/>
          <SecureRoute exact path='/usefulinfobank' component={UsefulInfoBank}/>
          <SecureRoute exact path='/locationrequest' component={LocationRequest}/>
          <SecureRoute exact path='/locationrequest/:locationpara' component={PlanTemplate}/>
          <SecureRoute exact path='/locationrequest/:locationpara/challengesubmission' component={Results}/>
            <Route path='/login' render={() => <Login baseUrl='https://dev-801046.oktapreview.com' />} />
            <Route path='/implicit/callback' component={ImplicitCallback} />
      </Switch>
      </Security>

      </main>
    )
  }
}

export default Body;

import React,{ Component } from 'react'
import LocationForm from './parts/locationform';
import './LocationRequest.css';
import ChallengeButton from '../ChallengeButton';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import PlanTemplate from './PlanTemplate'

class SearchCampus extends Component {
  state = {
    fireRedirect: false
  }
  regionSearch = async (e) => {
    e.preventDefault();
    this.setState({ fireRedirect: true })
    const text = e.target.latitude.value +"&"+e.target.longitude.value
    this.setState({
      locationpara: text
    });
  }

 render() {
  const { fireRedirect } = this.state
  return (
    <div>
      <div className="challenge-button-container">
        <ChallengeButton />
      </div>
      <div id="ChallengeStart">
        <div>
        <LocationForm regionSearch={this.regionSearch}/>
          {fireRedirect && (
          <Redirect to={{pathname:'/locationrequest/' + this.state.locationpara,
            state: {
              locationpara: this.state.locationpara } }}/>
        )}
      </div>
      </div>

    </div>
  )
}
}

export default SearchCampus;

import React, { Component}  from 'react';
import './Before.css';
import InterestForm from './parts/interestform';
import './SearchClayton.css';

import CaulfieldMapSection from './parts/mapcaulfield';
import ControlPanel from './parts/control-panel';
import { Link } from 'react-router-dom';

class Caulfield extends Component{
  state = {
    interest: undefined,
    error: undefined
  }

  interestSearch = async (e) => {
    e.preventDefault();
    const text = e.target.elements.interest.value
    this.setState({interest:text})
  }
  render(){
    return (
      <div>
        <div className="beforeContainer">
          <div className="beforeSection">
            <span className="beforeTitle">Which is the best suburb for you?</span>
            </div>
            <div className="droplist">
              <InterestForm interestSearch={this.interestSearch}/>
          </div>
        </div>
        <div>
          <CaulfieldMapSection
            interest = {this.state.interest}/>
        </div>
      </div>
    )
  }
}
export default Caulfield;

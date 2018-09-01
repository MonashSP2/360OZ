import React, { Component}  from 'react';
import './Before.css';
import Form from './parts/form';
import CaulfieldMapSection from './parts/mapcaulfield';
import ControlPanel from './parts/control-panel';
import { Link } from 'react-router-dom';

class Before extends Component{
  state = {
    interest: undefined,
    error: undefined
  }

  regionSearch = async (e) => {
    e.preventDefault();
    const text = e.target.textContent
    console.log(e.target.textContent);
    const campusText = /Select your campus(.*)Search/;
    const campusMatch = campusText.exec(text);
    this.setState({
      campus: campusMatch[1],
      error: ""
    });
  }
  render(){
    return (
      <div>
        <div className="beforeContainer">
          <div className="beforeSection">
            <span className="beforeTitle">Before you arrive</span>
            </div>
            <div className="droplist">
            <Form regionSearch={this.regionSearch}/>
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
export default Before;

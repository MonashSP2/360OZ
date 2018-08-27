import React, { Component}  from 'react';
import './Before.css';
import Form from './parts/form';
import MapSection from './parts/map';
import ControlPanel from './parts/control-panel';
import { Link } from 'react-router-dom';

class Before extends Component{
  state = {
    age: undefined,
    gender: undefined,
    campus: undefined,
    error: undefined
  }

  regionSearch = async (e) => {
    e.preventDefault();
    const text = e.target.textContent
    const campusText = /Select your campus(.*)Select top most populated areas/;
    const campusMatch = campusText.exec(text);
    const rankText = /Select top most populated areas(.*)Search/;
    const rankMatch = rankText.exec(text);
    console.log(campusMatch[1],rankMatch[1])
    this.setState({
      campus: campusMatch[1],
      rank: rankMatch[1],
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
          <MapSection
            campus = {this.state.campus}
            rank = {this.state.rank} />
        </div>
      </div>
    )
  }
}
export default Before;

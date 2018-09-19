import React from 'react';
import ChallengeForm from './parts/challengeform/ChallengeForm';
//   <h3> { match.params.locationpara }</h3>

const PlanTemplate = ({ match }) => {
  this.state = {
    locationpara: match.params.locationpara
  }
  return (
    <div style={{  height: '100vh',
      backgroundColor: 'white'}}>
      <ChallengeForm locationpara={this.state.locationpara}/>
    </div>
  )
}
export default PlanTemplate;

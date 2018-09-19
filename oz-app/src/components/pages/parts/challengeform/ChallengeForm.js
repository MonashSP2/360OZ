import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from "./store";
import FormEntry from "./FormEntry";
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

class ChallengeForm extends Component {
  state = {
    fireRedirect: false,
    results:''
  }
  showResults= async (e) => {
    this.setState({ fireRedirect: true})
    const text = (`\n\n${JSON.stringify(e, null, 2)}`)
    this.setState({results:text})
  }

  render() {
    const { fireRedirect } = this.state
    return (
      <div>
        <Provider store={store}>
          <div style={{ padding: 15 }}>
            <FormEntry onSubmit={this.showResults} />
              {fireRedirect && (
              <Redirect to={{pathname:'/locationrequest/' + this.props.locationpara + '/challengesubmission',
                state: {
                  results: this.state.results
                 }}}/>
            )}
          </div>
        </Provider>
      </div>
    );
  }
}
export default ChallengeForm;

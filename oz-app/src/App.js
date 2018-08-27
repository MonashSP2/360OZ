import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Body from './components/Body';

class App extends Component {
  render() {
    return (
      <div>
        <div className="col-xs-4 control-container">
          <Header />
        </div>
        <div className="col-xs-8 control-body">
          <Body />
        </div>
      </div>
    );
  }
}

export default App;

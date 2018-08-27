import React, {Component}from 'react';
import { Link } from 'react-router-dom';
import './Sign.css';


class Sign extends Component{
  render() {
    return (
        <nav className="signupin">
            <ul>
              <li><Link to='/'>Sign In</Link></li>
              <li><Link to='/'><button className="signButton">Sign Up</button></Link></li>
            </ul>
        </nav>
    )
  }
}

export default Sign;

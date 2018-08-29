import React, {Component}from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './image/logo.png';
import { Switch } from 'antd';

class Header extends Component{

  render() {
    return (
        <nav className="navBar">
          <ul>
            <Link to='/'><img src={logo} alt="logo" height="40" id='logo_img'></img></Link>
            <span id='slogan'>A view just for you</span>

            <li><Link to='/before'>BEFORE</Link></li>
          </ul>
        </nav>
    )
  }
}

export default Header;

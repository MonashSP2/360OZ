import React, {Component}from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './image/logo.png';
import { Switch } from 'antd';

class Header extends Component{

  render() {
    return (
      <div>
        <input type="checkbox" id="nav" className="hidden"/>

        <label htmlFor="nav" className="nav-btn">
                        <i></i>
                        <i></i>
                        <i></i>
                  </label>
        <nav className="navBar">
          <Link id='logo_link' to='/'><img src={logo} alt="logo" height="40" id='logo_img'></img></Link>
        </nav>
        <div className='navWrapper'>
          <ul>
            <li><Link to='/'>HOME</Link></li>
            <li><Link to='/searchcampus'>BEFORE</Link></li>
            <li><Link to='/locationrequest'>AFTER</Link></li>
          </ul>
        </div>
        </div>
    )
  }
}

export default Header;

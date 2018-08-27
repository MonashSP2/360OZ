import React, {Component}from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './image/logo.png';



class Header extends Component{

  onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  render() {
    return (
      <header>
        <nav>
          <ul>
            <Link to='/'><img src={logo} alt="logo" height="20"></img></Link>
            <li><Link to='/before'>BEFORE</Link></li>
            <li><Link to='/after'>AFTER</Link></li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header;

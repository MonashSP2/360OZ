import React, {Component}from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './image/logo.png';
import { Switch } from 'antd';

class Header extends Component{

  onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  render() {
    return (
        <nav className="navBar">
          <ul>
            <Link to='/'><img src={logo} alt="logo" height="20"></img></Link>
            <li> <Switch defaultChecked checkedChildren="英" unCheckedChildren="中" onChange={this.onChange} /></li>
            <li><Link to='/before'>BEFORE</Link></li>
            <li><Link to='/after'>AFTER</Link></li>
          </ul>
        </nav>
    )
  }
}

export default Header;

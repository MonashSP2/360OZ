import React from 'react'
import Button from '../Button';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <div className="button-container">
      <Link to='/before'><Button /></Link>
    </div>
  </div>
)

export default Home

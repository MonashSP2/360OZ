import React from 'react'
import BeforeButton from '../BeforeButton';
import ChallengeButton from '../ChallengeButton';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <div className="button-container">
      <Link to='/before'><BeforeButton /></Link>
    </div>
    <div className="beforeExplanation">
      <div>
      <p id='homeTitle'>Your journey </p>
      <p id='homeTitle'>starts here.</p>
      </div>
      <div id='homeDesc'>
      <p >A guide to find the best place to live in OZ that will suit your needs.</p>
      </div>
    </div>
  </div>
)

export default Home

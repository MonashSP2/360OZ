import React from 'react'
import BeforeButton from '../BeforeButton';
import AfterButton from '../ChallengeButton';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <div className="button-container">
      <Link to='/searchcampus'><BeforeButton /></Link>
      <Link to='/locationrequest'><AfterButton /></Link>
    </div>
    <div className="beforeExplanation">
      <div>
      <p id='homeTitle'>Your journey starts here...</p>
      </div>
      <div id='homeDesc'>
      <p >Guide to find the best place to live in Melbourne that suit your needs</p>
      </div>
    </div>
    <div className="beforeExplanation" style={{marginTop:'210px'}}>
      <div>
      <p id='homeTitle'>3 Day Challenge...</p>
      </div>
      <div id='homeDesc'>
      <p >Exciting 3-day plan to arrive, survive and immerse in Melbourne</p>
      </div>
    </div>
  </div>
)

export default Home

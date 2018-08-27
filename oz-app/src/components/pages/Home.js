import React from 'react'
import BeforeButton from '../BeforeButton';
import ChallengeButton from '../ChallengeButton';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <div className="button-container">
      <Link to='/before'><BeforeButton /></Link>
      <Link to='/After'><ChallengeButton /></Link>
    </div>
    <div className="beforeExplanation">
      <div>
      <h2>Exploratory</h2>
      </div>
      <div>
      360OZ contains insights for Chinese International students planning to come to Melbourne for studies
      </div>
    </div>
    <div className="arriveExplanation">
      <div>
      <h2>Challenge</h2>
      </div>
      <div>
      Exciting 3-day plan to arrive, survive and immerse
      </div>
    </div>
  </div>
)

export default Home

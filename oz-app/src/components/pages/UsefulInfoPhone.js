import React from 'react';
import './UsefulInfo.css';

const UsefulInfoPhone =()=>{
    return (
      <div>
      <div className="beforeContainer">
          <div className="beforeSection">
            <span className="beforeTitle">
              Australian Mobile Carriers</span>
          </div>
      </div>
        <div id="infoContainer">
        <h3>
          Australian Mobile Carriers
        </h3>
        <p>
          Aussie carriers and networks. The three mobile networks in Australia are owned and operated by Telstra, Optus and Vodafone. The numerous other service providers all work on one of these networks.

          To know more about their value plans and more information on the student plans:
        </p>
          <ul id="infoLink">
          <li><a href="https://www.vodafone.com.au/students">Visit Vodafone</a></li>
          <li><a href="https://www.vodafone.com.au/students">Visit Telstra</a></li>
          <li><a href="https://offer.optus.com.au/student-hub">Visit Optus</a></li>
          </ul>
        </div>
      </div>
    )
}
export default UsefulInfoPhone;

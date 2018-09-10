import React from 'react';
import './Button.css';
import { Spin } from 'antd';


const Before = () =>{
    return (
      <div className="buttonmargin">
        <button type="button" className="beforeButton" ><span id='homeButton'>Before you arrive</span></button>
      </div>
    )
}
export default Before;

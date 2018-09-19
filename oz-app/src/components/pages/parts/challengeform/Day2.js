import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import renderField from './renderField';
import './Day.css';
import { Progress } from 'antd';


const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

const Day2 = props => {
  const { handleSubmit, previousPage } = props;
  return (
<div>

      <div className="beforeContainer">
          <div className="beforeSection">
            <span className="beforeTitle">
              Revive</span>
          </div>
      </div>
  <form id="challengeForm" onSubmit={handleSubmit}>
    <Progress id='processBar' percent={66.6} strokeWidth={40} showInfo={false} />
      <div id='processBarTitle'><button style={{marginLeft:'10px'}} type="submit" id="processBarButton" onClick={previousPage}>Day 1</button><span>Day 2</span>
    </div>
      <div id='planItem'>
        <Field
          name="groceries"
          id="groceries"
          component="input"
          type="checkbox"
          style={{marginRight:'10px'}}
        /><label htmlFor="groceries"><span>Stock up on groceries and toiletries</span></label>
        <div>
          <span style={{float:'left',color:'#939393',marginTop:'6px',marginLeft:'26px'}}>
            Stock up on necessities and toiletries.
          </span>
        </div>
      </div>


      <div id='planItem'>
        <Field
          name="beddings"
          id="beddings"
          component="input"
          type="checkbox"
          style={{marginRight:'10px'}}
        /><label htmlFor="beddings"><span>Shop for beddings</span></label>
        <div>
          <span style={{float:'left',color:'#939393',marginTop:'6px',marginLeft:'26px'}}>
            Buy bed linens, covers and other items to have a comfortable home.
          </span>
        </div>
      </div>
      <div id='planItem'>
        <Field
          name="cooking"
          id="cooking"
          component="input"
          type="checkbox"
          style={{marginRight:'10px'}}
        /><label htmlFor="cooking"><span>Buy some cooking needs </span></label>
        <div>
          <span style={{float:'left',color:'#939393',marginTop:'6px',marginLeft:'26px'}}>
            Satisfy your cravings with the right tools in your kitchen.

          </span>
        </div>
      </div>
      <div id='planItem'>
        <Field
          name="clothing"
          id="clothing"
          component="input"
          type="checkbox"
          style={{marginRight:'10px'}}
        /><label htmlFor="clothing"><span>Shop for clothing needs </span></label>
        <div>
          <span style={{float:'left',color:'#939393',marginTop:'6px',marginLeft:'26px'}}>
            	Buy the right outfit to wear with Melbourne’s unpredictable weather.
          </span>
        </div>
      </div>

      <div>
        <button type="button" className="previous" id='previousDayButton' onClick={previousPage}>
          Previous
        </button>
        <button type="submit" className="next" id='dayButton'>Next</button>
      </div>
    </form>
  </div>
  );
};

export default reduxForm({
  form: 'wizard', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(Day2);

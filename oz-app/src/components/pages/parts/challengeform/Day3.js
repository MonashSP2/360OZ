import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import { Progress } from 'antd';
import './Day.css';

const Day3 = props => {
  const { handleSubmit, pristine, previousPage, submitting } = props;
  return (
    <div>

      <Progress id='processBar' percent={100} strokeWidth={40} showInfo={false} />
      <div id='processBarTitle'><span>Day 1</span><span>Day 2</span><span>Day 3</span>
      </div>
        <div className="beforeContainer">
            <div className="beforeSection">
              <span className="beforeTitle">
                Immerse</span>
            </div>
        </div>

  <form  id="challengeForm" onSubmit={handleSubmit}>
        <div id='planItem'>
        <Field
          name="arts"
          id="arts"
          component="input"
          type="checkbox"
          style={{marginRight:'10px'}}
        /><label htmlFor="arts"><span>Arts</span></label>
      </div>

        <div id='planItem'>
        <Field
          name="history"
          id="history"
          component="input"
          type="checkbox"
            style={{marginRight:'10px'}}
        /><label htmlFor="history"><span>History</span></label>
      </div>

    <div id='planItem'>
        <Field
          name="sportsstuff"
          id="sportsstuff"
          component="input"
          type="checkbox"
          style={{marginRight:'10px'}}
        /><label htmlFor="sports"><span>Sports</span></label>
      </div>

      <div>
        <button type="button" className="previous" id='previousDayButton'  onClick={previousPage}>
          Previous
        </button>
        <button type="submit" id='dayButton' disabled={pristine || submitting}>Submit</button>
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
})(Day3);

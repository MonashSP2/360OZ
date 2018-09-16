import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Day1 from './Day1';
import Day2 from './Day2';
import Day3 from './Day3';

class FormEntry extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
    };
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { onSubmit } = this.props;
    const { page } = this.state;
    return (
      <div>
        {page === 1 && <Day1 onSubmit={this.nextPage} />}
        {page === 2 &&
          <Day2
            previousPage={this.previousPage}
            onSubmit={onSubmit} 
          />}
        {page === 3 &&
          <Day3
            previousPage={this.previousPage}
            onSubmit={onSubmit}
          />}
      </div>
    );
  }
}

FormEntry.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default FormEntry;

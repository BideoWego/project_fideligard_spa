import React, { Component } from 'react';
import Dates from '../components/Dates';

class DatesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: props.dates
    };
  }

  onDateChange = e => {
    this.props.setSelectedDateIndex(+e.target.value);
  }

  render() {

    return (
      <div className="DatesContainer">
        <Dates value={this.props.selectedDateIndex} dates={this.state.dates} onChange={this.onDateChange} />
      </div>
    );
  }
}

export default DatesContainer;

import React, { Component } from 'react';
import { Dates } from '../components';

class DatesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: props.dates
    };
  }

  onChangeDate = e => {
    this.props.setSelectedDateIndex(+e.target.value);
  }

  render() {

    return (
      <div className="DatesContainer">
        <Dates
          value={this.props.selectedDateIndex}
          dates={this.state.dates}
          onChangeDate={this.onChangeDate} />
      </div>
    );
  }
}

export default DatesContainer;

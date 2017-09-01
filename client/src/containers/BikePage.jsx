import React from 'react';
import Auth from '../modules/Auth';
import Bike from '../components/Bike.jsx';

// Set initial state
let state = {
  bikeActive: false
};

class BikePage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // Retrieve the last state
    this.state = state;
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <Bike
        bikeActive={ this.props.bikeActive }
        handleBikeSelection={ this.props.handleBikeSelection }
      />
    );
  }
};

export default BikePage;

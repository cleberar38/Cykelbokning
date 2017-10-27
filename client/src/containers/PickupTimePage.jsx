import React, { PropTypes } from 'react';
import PickupTime from '../components/PickupTime.jsx';
import Auth from '../modules/Auth';

class PickupTimePage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      value: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value){

    event.preventDefault();

    const target = event.target.innerText;

    Auth.setPickupTime(target);

    this.setState({
      value
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <PickupTime
        onChange={this.handleChange}
        errors={this.state.errors}
        value={this.state.value}
      />
    );
  }
}

PickupTimePage.propTypes = {

};

export default PickupTimePage;

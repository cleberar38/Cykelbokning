import React from 'react';
import Auth from '../modules/Auth';
import MessageToUSer from '../components/MessageToUSer.jsx';

// Set initial state
let state = {
  messages: '',
  messageChanged: false
};

class MessageToUSerPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // Retrieve the last state
    this.state = state;
    this.handleBackToBooking.bind(this);
  }

  handleBackToBooking() {
    console.log("I AM INSIDE THE handleBackToBooking");
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <MessageToUSer
        messageChanged={ this.props.messageChanged }
        messages={ this.props.messages}
        handleBackToBooking={ this.props.handleBackToBooking }
      />
    );
  }
}

export default MessageToUSerPage;

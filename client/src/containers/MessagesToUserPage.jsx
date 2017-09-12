import "babel-polyfill";
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

    this.handleBackBtn = this.handleBackBtn.bind(this);
  }

  handleBackBtn() {

    console.log("handleBackBtn Message");    
    this.setState({
      messages: '',
      messageChanged: false
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <MessageToUSer
        messageChanged={ this.props.messageChanged }
        messages={ this.props.messages}
        handleBackBtn={ this.handleBackBtn }
        isVerified= { this.props.isVerified }
      />
    );
  }
}

export default MessageToUSerPage;

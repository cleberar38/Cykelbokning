import "babel-polyfill";
import React from 'react';
import Auth from '../modules/Auth';
import Confirmation from '../components/Confirmation.jsx';

// Set initial state
let state = {
  messages: '',
  messageChanged: false
};

class ConfirmationPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // Retrieve the last state
    this.state = state;

    this.handleConfirmation = this.handleConfirmation.bind(this);
  }
  
  handleConfirmation() {

    let token = document.location.hash.split("token=")[1];

    // //prevent default action. in this case, action is the form submission event
    event.preventDefault();

    const formData = `token=${token}`;
    
    const self = this;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/confirmation');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        self.setState({
          messages: xhr.response.message,
          messageChanged: xhr.response.success,
        });

      } else {
        // failure

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });

    this.setState({
      messages: '',
      messageChanged: false,
    });
    
    xhr.send(formData);

  }


  /**
   * Render the component.
   */
  render() {
    return (
      <Confirmation
        messageChanged={ this.props.messageChanged }
        messages={ this.props.messages }
        handleConfirmation={ this.handleConfirmation }
      />
    );
  }
}

export default ConfirmationPage;

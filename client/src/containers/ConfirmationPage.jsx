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

          let response = null;

          // Opera 8.0+
          var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

          // Firefox 1.0+
          var isFirefox = typeof InstallTrigger !== 'undefined';

          // Safari 3.0+ "[object HTMLElementConstructor]" 
          var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

          // Internet Explorer 6-11
          var isIE = /*@cc_on!@*/false || !!document.documentMode;

          // Edge 20+
          var isEdge = !isIE && !!window.StyleMedia;

          // Chrome 1+
          var isChrome = !!window.chrome && !!window.chrome.webstore;

          // Blink engine detection
          var isBlink = (isChrome || isOpera) && !!window.CSS;

          //IE problem! We have to parse the response since in IE everything became string!
          if (isIE) { response = JSON.parse(xhr.response); } else {
              response = xhr.response;
          }

        self.setState({
          messages: response.message,
          messageChanged: response.success,
        });

      } else {
        // failure

          //IE problem! We have to parse the response since in IE everything became string!
          const response = JSON.parse(xhr.response);

        const errors = response.errors ? xhr.response.errors : {};
        errors.summary = response.message;

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

import React, { PropTypes } from 'react';
import ResetPassword from '../components/ResetPassword.jsx';

class ResetPasswordPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      messageChanged: false,
      response: null,
      token: null,
      messages: '',
      errors: {},
      user: {
        passwordconfirm: '',
        password: ''

      }
    };

    this.handleConfirmation = this.handleConfirmation.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  handleConfirmation(event) {

    // //prevent default action. in this case, action is the form submission event
    event.preventDefault();

    let token = document.location.hash.split("token=")[1];
    const password = this.state.user.password;
    const passwordconfirm = this.state.user.passwordconfirm;

    const formData = `token=${token}&password=${password}&passwordconfirm=${passwordconfirm}`;

    const self = this;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/reset');
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
          messageChanged: response.success,
          messages: response.message
        });

      } else {
        // failure

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

        const errors = response.errors ? response.errors : {};
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
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    let field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });

  }

  /**
   * Render the component.
   */
  render() {
    return (
      <ResetPassword
        onSubmit={this.handleConfirmation}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        messageChanged={this.state.messageChanged}
        messages={this.state.messages}

      />
    );
  }
}

ResetPasswordPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ResetPasswordPage;

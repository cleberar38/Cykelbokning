import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import LoginForm from '../components/LoginForm.jsx';

let state = {
  isVerified: false,
  messageChanged: false,
  messages: '',
  errors: {},
  successMessage: '',
  user: {
    email: '',
    password: '',
    name: ''
  }
};

class LoginPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    //successMessage = '';

    // set the initial component state
    this.state = state;

    if (storedMessage) {
      this.setState({
        successMessage: storedMessage
      });

      localStorage.removeItem('successMessage');
    }

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    }

  handleSubmit(event) {
      console.log('this.state.user A name was submitted: ' + this.state.user);
      event.preventDefault();
  }


  componentDidMount() {

      window.scrollTo(0, 0);

  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    let self = this;

    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/login');
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

        // change the component-container state
        this.setState({
          errors: {},
          isVerified: xhr.response.isVerified
        });

        console.log("xhr.response.isVerified : ", response.isVerified);

        if(response.isVerified === false){
          this.setState({
            messageChanged: true,
            messages: ""
          });
        }
        if(response.isVerified){
          this.setState({
            messageChanged: false,
            messages: '',
            isVerified: true
          });
        }
         
        // save the token
        Auth.authenticateUser(response.token);
        if (response.userdata !== undefined || response.userdata != null || response.userdata !== '') {
            if (response.userdata.name !== undefined || response.userdata.name != null || response.userdata.name !== '') {
                Auth.setUserName(response.userdata.name);
            }
        }
        
        Auth.setVerifyUser(response.isVerified);

        

        if(response.userdata.usertype === "admin"){
          Auth.authenticateAdminUser("admin");
        }

          // change the current URL to /
          this.context.router.replace('/');

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

        // change the component state
        const errors = response.errors ? response.errors : {};
        errors.summary = response.message;

        this.setState({
          errors,
          user:{
            name: response.user !== undefined ? response.user.name : ''
          }
        });
      }
    });
    xhr.send(formData);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {

    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });

    Auth.setUserEmail(user.email);
    Auth.setUserName(user.name);
    
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
        messageChanged={this.state.messageChanged}
        messages={this.state.messages}
        isVerified={this.state.isVerified}
        handleSubmit={this.handleSubmit}
      />
    );
  }

}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginPage;

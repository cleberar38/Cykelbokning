import React from 'react';
import Auth from '../modules/Auth';
import HomePageForm from '../components/HomePageForm.jsx';

class HomePage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    this.state = {
      value: 1,
      errors: {},
      successMessage,
      booking: {
        user: '',
        daytaken: '',
        plats: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.processForm = this.processForm.bind(this);
    this.changePlats = this.changePlats.bind(this);
    this.handleUserConfirmation = this.handleUserConfirmation.bind(this);
  }

  handleUserConfirmation(){
    console.log('Auth.isUserAuthenticated', Auth.isUserAuthenticated8());
  }

  handleChange(event, index, value) {
       this.setState({value})
  }

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const user = encodeURIComponent(this.state.booking.user);
    const daytaken = encodeURIComponent(this.state.booking.daytaken);
    const plats = encodeURIComponent(this.state.booking.plats);
    const formData = `user=${user}&daytaken=${daytaken}&plats=${plats}`;

    console.log(formData);

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/plats');
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
          errors: {}
        });

        // save the token
        Auth.authenticateUser(response.token);


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
          errors
        });
      }
    });
    xhr.send(formData);
  }

  changePlats(event) {

    const plats = event.target.name;

    this.setState({
      booking:{
        plats: plats
      }
    });

    console.log("INSIDE CHANGE PLATS", this.state);
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/booking');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            //IE problem! We have to parse the response since in IE everything became string!
            const response = JSON.parse(xhr.response);
        this.setState({
          booking: response
        });
      }
    });
    xhr.send();
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <HomePageForm
        value={this.state.value}
        onSubmit={this.processForm}
        onChange={this.changePlats}
        handleTimeChange={this.handleTimeChange}
        handleDateChange={this.handleDateChange}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        booking={this.state.booking}
        handleUserConfirmation={this.handleUserConfirmation} />
    );
  }
}

export default HomePage;

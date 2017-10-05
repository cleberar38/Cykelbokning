import "babel-polyfill";
import React from 'react';
import Auth from '../modules/Auth';
import Profile from '../components/Profile.jsx';
import PropTypes from 'prop-types';

// Set initial state
let state = {
  bikename: '',
  nextAvailablePeriodDate: '',
  period: '',
  profileresult: null,
  name: '',
  messageChanged: false,
  messages: ''

};

class ProfilePage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // Retrieve the last state
    this.state = state;

    this.getProfileInfo = this.getProfileInfo.bind(this);
    this.removeBooking = this.removeBooking.bind(this);
    this.handleBackBtn = this.handleBackBtn.bind(this);

  }

  componentWillMount(props) {

    var userid = localStorage.getItem("useremail");



    this.getProfileInfo(userid);

    console.log("ProfilePage state : ", this.state);
    console.log("ProfilePage props : ", this.props);
  }

  componentDidMount(props) {
    console.log("ProfilePage state : ", this.state);

  }

  handleBackBtn() {
      console.log("handleBackBtn props", props);
      console.log("handleBackBtn this.props", this.props);
      this.setState({
          messages: '',
          messageChanged: false
      });
  }

  removeBooking(evt, bikebookingid) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    const formData = `bikebookingid=${bikebookingid}`;

    const self = this;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/unbookbike');
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

          console.log("xhr.response.done : ", response.done);

         
         

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

        console.log("ERROR : ", errors);

        this.setState({
          errors
        });
      }
    });

    xhr.send(formData);

  }

  getProfileInfo(userid) { //In this case the userid is the email address

    const formData = `userid=${userid}`;

    const self = this;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/profile');
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
          profileresult:  response.result
        }, () =>
          console.log("this.state.profileresult : ", this.state)
        );

        //console.log("Response from AUTH profile : ", xhr.response.result )

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

        console.log("ERROR : ", errors);

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <Profile
        bikename={this.state.bikename}
        nextAvailablePeriodDate={this.state.nextAvailablePeriodDate}
        period={this.state.period}
        profileresult={this.state.profileresult}
        removeBooking={this.removeBooking}
        name={this.state.name}
        messageChanged={this.state.messageChanged}
        messages={this.state.messages}
        handleBackBtn={this.handleBackBtn}

      />
    );
  }
}

export default ProfilePage;

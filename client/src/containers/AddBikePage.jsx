import React from 'react';
import Auth from '../modules/Auth';
import AddBikeForm from '../components/AddBikeForm.jsx';
import PopUpConfirmation from 'react-popconfirm';

// Set initial state
let state = {
  bike: {
    bikeid: '', //{type: String, unique: true},
    biketype: '', //String,
    bikename: '', //String,
    imgurl: '', //String
  },
  message: '',
  messages: '',
  errors: {},
  messageChanged: false,
  isAdminUserAuthenticated: false
};

class AddBikePage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // Retrieve the last state
    this.state = state;

    //Here you declare the functions and bind it to "this"
    this.addNewBike = this.addNewBike.bind(this);

  }

  addNewBike(event){
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const bikeid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const bikename = encodeURIComponent(this.state.bike.bikename);
    const biketype = encodeURIComponent(this.state.bike.biketype);
    const imgurl = encodeURIComponent(this.state.bike.imgurl);

    const formData = `bikeid=${bikeid}&bikename=${bikename}&biketype=${biketype}&imgurl=${imgurl}`;

    const self = this;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/addbike');
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

        //console.log("this.state.period", this.state.period);
        //TODO: Set the state of the periods available
        self.setState({
          //bike: self.state.bike,
          messageChanged: true,
          messages: response.message,
          errors: {},
        });

        //console.log("addPeriod xhr.response: ", xhr.response);

        //this.props.router.replace('/');

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

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  onChange(event) {
    const field = event.target.name;
    const bike = this.state.bike;
    bike[field] = event.target.value;

    this.setState({
      bike
    });

    //Auth.setUserEmail(user.email);
    //Auth.setUserName(user.name);

  }

  componentWillMount() {

    //console.log("componentWillMount()");

    this.setState({
      bike: {
        bikeid: this.state.bike.bikeid,
        biketype: this.state.bike.biketype,
        bikename: this.state.bike.bikename,
        imgurl: this.state.bike.imgurl
      },
    });
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {

    //console.log("Auth.isAdminUserAuthenticated()", Auth.isAdminUserAuthenticated());

    if(Auth.isAdminUserAuthenticated()){
      this.setState({
        bike: {
          bikeid: this.state.bike.bikeid,
          biketype: this.state.bike.biketype,
          bikename: this.state.bike.bikename,
          imgurl: this.state.bike.imgurl
        },
      });
    }
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <AddBikeForm
        bike={this.state.bike}
        message={this.state.message}
        messages={this.state.messages}
        addNewBike={this.addNewBike}
        onSubmit={this.addNewBike}
        errors={this.state.errors}
        onChange={this.onChange}
        messageChanged={this.state.messageChanged}
        isAdminUserAuthenticated={this.state.isAdminUserAuthenticated}
       />
    );
  }
};

export default AddBikePage;

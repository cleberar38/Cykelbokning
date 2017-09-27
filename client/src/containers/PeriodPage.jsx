import React from 'react';
import Auth from '../modules/Auth';
import PeriodForm from '../components/PeriodForm.jsx';
import PopUpConfirmation from 'react-popconfirm';

// Set initial state
let state = {
  period: {
    periodid: '', //{type: String, unique: true},
    periodname: '', //String,
    datefrom: '', //Date,
    dateto: '', //Date
    bikedescurl: 'https://cykelbiblioteket.helsingborg.se/', // String,
    bikeimgurl: '', //String,
    bikename: '', //String,
    bikeid: '', //String,
    isbooked: '', //{ type: Boolean, default: false }
  },
  message: '',
  messages: '',
  errors: {},
  messageChanged: false,
  isAdminUserAuthenticated: false
};

class PeriodPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // Retrieve the last state
    this.state = state;

    //Here you declare the functions and bind it to "this"
    this.addPeriod = this.addPeriod.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  addPeriod(event){
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const periodid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const periodname = encodeURIComponent(this.state.period.periodname);
    const datefrom = encodeURIComponent(this.state.period.datefrom);
    const dateto = encodeURIComponent(this.state.period.dateto);
    const bikedescurl = encodeURIComponent(this.state.period.bikedescurl);
    const bikeimgurl = encodeURIComponent(this.state.period.bikeimgurl);
    const bikename = encodeURIComponent(this.state.period.bikename);
    const bikeid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    const formData = `periodid=${periodid}&periodname=${periodname}&datefrom=${datefrom}&dateto=${dateto}&bikedescurl=${bikedescurl}&bikeimgurl=${bikeimgurl}&bikename=${bikename}&bikeid=${bikeid}`;

    const self = this;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/addperiod');
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
          //period: self.state.period,
          messageChanged: true,
          messages: response.message
        });

        //console.log("addPeriod xhr.response: ", xhr.response);

        // change the component-container state
        this.setState({
          errors: {},
        });
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
    const period = this.state.period;
    period[field] = event.target.value;

    this.setState({
      period
    });

    //Auth.setUserEmail(user.email);
    //Auth.setUserName(user.name);

  }

  componentWillMount() {

    //console.log("componentWillMount()");

    this.setState({
      period: {
        periodname: this.state.period.periodname, //String,
        datefrom: this.state.period.datefrom, //Date,
        dateto: this.state.period.dateto, //Date
        bikedescurl: this.state.period.bikedescurl,
        bikeimgurl: this.state.period.bikeimgurl,
        bikename: this.state.period.bikename,
        isbooked: this.state.period.isbooked

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
        period: {
          periodname: this.state.period.periodname, //String,
          datefrom: this.state.period.datefrom, //Date,
          dateto: this.state.period.dateto //Date
        },
      });
    }
  }


  /**
   * Render the component.
   */
  render() {
    return (
      <PeriodForm
        messageChanged={this.state.messageChanged}
        period={this.state.period}
        message={this.state.message}
        messages={this.state.messages}
        addPeriod={this.addPeriod}
        onSubmit={this.addPeriod}
        errors={this.state.errors}
        onChange={this.onChange}
        isAdminUserAuthenticated={this.state.isAdminUserAuthenticated}
       />

    );
  }
};

export default PeriodPage;

import React from 'react';
import Auth from '../modules/Auth';
import Bike from '../components/Bike.jsx';
import Image from '../components/Image.jsx';

// Set initial state
let state = {
  bikeActive: false,
  messageChanged: false,
  isBikeChecked: false,
  messages: '',
  bike: {
    bikeid: '',
    biketype: '',
    name: '',
    imgurl: '',
    amountavailable: 0 
  }
};

class BikePage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // Retrieve the last state
    this.state = state;
    this.addBike = this.addBike.bind(this);
  }

  addBike(event){
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const biketype = encodeURIComponent(this.state.bike.biketype); //req.biketype,
    const name = encodeURIComponent(this.state.bike.name); //req.name,
    const imgurl = encodeURIComponent(this.state.bike.imgurl); //req.imgurl,
    

    const formData = `biketype=${biketype}&name=${name}&imgurl=${imgurl}`;

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
          bike: self.state.bike,
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

  checkBikeAvailable() {

    if(!this.state.isBikeChecked){
      
      console.log("CHEKING WHICH BIKE ARE AVAILABLE...!!!");

      const self = this;

      // create an AJAX request
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/auth/checkbike');
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

          console.log("checkPeriodsAvailable response", response);

          //TODO: Set the state of the periods available

          self.setState({
            periodData: response
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

          console.log("ERROR", response);

        }
      });

      xhr.send();
      //if(!this._mounted){
        //this.setState({
          //isPeriodChecked: true,
          //periodData: response
        //});
      //}
    }else{
      console.log("ALREADY CHECKED...!!!");
    }
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <Bike
        addBike={this.props.addBike}
        createImages={this.createImages}
        messageChanged={ this.props.messageChanged }
        isBikeChecked={ this.props.messageChanged }
        messages={ this.props.messages }
        bike={ this.props.bike }
        bikeActive={ this.props.bikeActive }
        handleBikeSelection={ this.props.handleBikeSelection }  
      />
    );
  }
};

export default BikePage;

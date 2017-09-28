import React from 'react';
import Auth from '../modules/Auth';
import BookingFormAll from '../components/BookingFormAll.jsx';
import PopUpConfirmation from 'react-popconfirm';

// Set initial state
let state = {
  periodData: null,
  bookingPeriodData: null,
  periodBtnState: "primary",
  bikeActive: false,
  isBikeAvailable: false,
  periodsAvailable: [],
  arrayBikes: {},
  value: 2,
  errors: {},
  successMessage: '',
  booking: {
    name: '',
    bikeperiod: '',
    user: ''
  },
  optionSelected: '',
  isPeriodChecked: false,
  isBookingPeriodChecked: false,
  btnPeriodClicked: false,
  messageChanged: false,
  messages: '',
  lastPeriodClicked: null
};

class BookingPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    const storedMessage = localStorage.getItem('successMessage');

    // Retrieve the last state
    this.state = state;

    if (storedMessage) {
      this.state.successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    this.handleBikeSelection = this.handleBikeSelection.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.processForm = this.processForm.bind(this);
    this.handleSetPeriod = this.handleSetPeriod.bind(this);
    this.checkPeriodsAvailable = this.checkPeriodsAvailable.bind(this);
    this.checkPeriodsInBooking = this.checkPeriodsInBooking.bind(this);
    //this.handleBackBtn = this.handleBackBtn.bind(this);
  }

  componentWillMount() {
    Auth.setPeriod('');
    Auth.setBikeName('');
  }


  componentWillUnmount() {
    /*
      Check if the component is mounted
      before set states
    */
    if(!this._mounted){
      this.setState({
        isPeriodChecked: false,
      });

      this.checkPeriodsAvailable();
    }

    let self = this;

    this._mounted = false;

    this.setState({
      lastPeriodClicked: self.state.lastPeriodClicked
    });

  }

  handleChange(event, index, value) {
       this.setState({value})
  }

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    const userid = localStorage.getItem('useremail');
    const periodid = localStorage.getItem('bikeperiod');
    const bikeid = localStorage.getItem('bike');

    console.log("bikeid : " , bikeid);

    const formData = `userid=${userid}&periodid=${periodid}&bikeid=${bikeid}`;

    //console.log(formData);
    const self = this;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/bikebooking');
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
        self.setState({
          messages: response.message,
          messageChanged: response.success
        });

        // save the token
        Auth.authenticateUser(response.token);

        Auth.setPeriod('');
        Auth.setBikeName('');

        //Does not work
        //this.props.router.replace("/message");

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

        self.setState({
            messages: errors.periodid,
            messageChanged: true
          });

        this.setState({
          errors
        });
      }
    });

    PopUpConfirmation({
      confirmation:'Är du säker?',
      okLabbel: 'Ja',
      cancelLabel: 'Nej',
      placement:'top',
      element: event.target	// target is the element you clicked
      }).then(
      (result) => {
        // `proceed` callback
        //console.log('proceed called');

        //this.props.router.replace("/message");

          xhr.send(formData); // Send data to DB

      },

      (result) => {
        // `cancel` callback
        console.log('cancel called');
      }
    );
  }

  //handleBackBtn() {
    //this.setState({
      //messages: '',
    //  messageChanged: false,
    //  errors: {}
    //});
//  }

  handleSetPeriod(evt, value){

    var bg = document.getElementsByClassName("periodBtn");

    for(var i=0,leni=bg.length; i<leni; i++){
      bg[i].style.backgroundColor = '';
    }

    if(evt !== undefined && evt !== "null" && evt !== null){
      evt.target.style.backgroundColor = "rgba(20,25,22,0.35)";
    }
    Auth.setPeriod(value);
  }

  handleBikeSelection(evt) {


    let bikeSelected = evt.target !== undefined ? document.elementTarget = evt.target : null;

    const bikename = bikeSelected !== null ? bikeSelected.alt : evt;
    const bikeClass = bikeSelected !== null ? bikeSelected.className : 'bikeImg';
    const allBikes = document.getElementsByClassName('bikeImg');

    for(var i=0,leni=allBikes.length; i<leni; i++){
      var tempBike = allBikes[i];
      tempBike.children[0].style.opacity = 1;
    }

    if(bikeSelected !== null){
      bikeSelected.style.opacity = 0.2;

      //Check if periods are available inside
      //the bikebooking table
      this.checkPeriodsInBooking();

      //Check if periods are available for this selected bike
      //inside the Period table
      this.checkPeriodsAvailable();

      this.setState({
        isBikeAvailable: true
      })
    };

    Auth.setBikeName(bikename);

  }

  checkPeriodsInBooking() {

    if(!this.state.isBookingPeriodChecked){

      const self = this;

      // create an AJAX request
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/auth/checkbookedperiod');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          // success

          //TODO: Set the state of the periods available

          self.setState({
            bookingPeriodData: xhr.response
          });

        } else {
          // failure

          console.log("ERROR", xhr.response);

        }
      });

      xhr.send();

      if(!this._mounted){
        this.setState({
          isPeriodChecked: true,
          bookingPeriodData: xhr.response
        });
      }
    }else{
      console.log("BOOKING ALREADY CHECKED...!!!");
    }
  }

  checkPeriodsAvailable() {

    if(!this.state.isPeriodChecked){

      console.log("CHEKING WHICH PERIODS ARE AVAILABLE...!!!");

      const self = this;

      // create an AJAX request
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/auth/checkperiod');
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

          //TODO: Set the state of the periods available

            console.log("xh.response : ", response)

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

      if(!this._mounted){
        this.setState({
          isPeriodChecked: true,
          periodData: response
        });
      }
    }else{
      console.log("ALREADY CHECKED...!!!");
    }
  }

  handleSelectedOption(period, evt){
    var arrPeriod = period;
    var myBikePeriod = '';

    for(var i=0,leni=arrPeriod.length; i<leni; i++){
      var tempID = arrPeriod[i].id;
      if(tempID === evt.target.id.split("option")[1]){
        myBikePeriod = document.getElementById(evt.target.id).nextSibling.innerHTML;
      }
    }

    if(typeof evt === "string"){
      this.setState({
        optionSelected: evt,
        booking: {
          bikeperiod: myBikePeriod
        }
      }, (index, value) =>{
        //Excute something you want here after setState
      });
      Auth.setPeriod(myBikePeriod);
    }else{
      if (evt.target.nodeName === "INPUT"){
        var spanValue = evt.target.parentNode.children[1].value;
        var inputRadioBtn = evt.target.parentNode.children[0].value;

        this.setState({
          optionSelected: evt.target.value,
          booking: {
            bikeperiod: myBikePeriod
          }
        }, (index, value) =>{
          //Excute something you want here after setState
        });
        Auth.setPeriod(myBikePeriod);
      }
    }
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {

    this._mounted = true;

    var bikeName = '';
    var bikePeriod = '';
    var userEmail = '';
    var messages = '';
    var messageChanged = false;
    var periodsAvailable = [];
    var selectedPeriod = '';

    if(Auth.isUserAuthenticated()){
      userEmail = Auth.getUserEmail();
      bikeName = Auth.getBikeName();
    }

    bikePeriod = Auth.getPeriod();

    this.handleBikeSelection(bikeName);

    //TODO: Get all the periods available

    this.setState({
      periodsAvailable: null,
      booking: {
        name: bikeName,
        bikeperiod: bikePeriod,
        user: userEmail,
        messages: '',
        messageChanged: true
      }
    });
  }

  /**
   * Render the component.
   * handleBackBtn={this.handleBackBtn}
   */
  render() {
    return (
      <BookingFormAll

        lastPeriodClicked={this.state.lastPeriodClicked}
        btnPeriodClicked={this.state.btnPeriodClicked}
        periodBtnState={this.state.periodBtnState}
        isPeriodChecked={this.state.isPeriodChecked}
        periodData={this.state.periodData}
        bookingPeriodData={this.state.bookingPeriodData}
        handleBikeSelection={this.handleBikeSelection}
        bikeActive={this.state.bikeActive}
        isBikeAvailable={this.state.isBikeAvailable}
        value={this.state.value}
        onSubmit={this.processForm}
        handleTimeChange={this.handleTimeChange}
        handleDateChange={this.handleDateChange}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        booking={this.state.booking}
        handleUserConfirmation={this.handleUserConfirmation}
        optionSelected={this.state.optionSelected}
        handleSetPeriod={this.handleSetPeriod}
        periodsAvailable={this.state.periodsAvailable}
        checkPeriodsInBooking={this.checkPeriodsInBooking}
        isBookingPeriodChecked={this.state.isBookingPeriodChecked}
        messageChanged={this.state.messageChanged }
        messages={this.state.messages}
       />
    );
  }
}

export default BookingPage;

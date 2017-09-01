import React from 'react';
import Auth from '../modules/Auth';
import BookingFormAll from '../components/BookingFormAll.jsx';
import PopUpConfirmation from 'react-popconfirm';

// Set initial state
let state = {
  periodData: [],
  bikeActive: false,
  isBikeAvailable: false,
  periodsAvailable: [],
  arrayBikes: {},
  messageChanged: false,
  messages: '',
  value: 2,
  errors: {},
  successMessage: '',
  booking: {
    name: '',
    bikeperiod: '',
    user: ''
  },
  optionSelected: ''
};

class BookingPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    const storedMessage = localStorage.getItem('successMessage');

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // Retrieve the last state
    this.state = state;

    this.handleBikeSelection = this.handleBikeSelection.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.processForm = this.processForm.bind(this);
    this.handleUserConfirmation = this.handleUserConfirmation.bind(this);
    this.handleSetPeriod = this.handleSetPeriod.bind(this);
    this.handleSelectedOption = this.handleSelectedOption.bind(this);
    this.checkPeriodsAvailable = this.checkPeriodsAvailable.bind(this);

  }

  componentWillUnmount() {
      // Remember state for the next mount
      state = this.state;
      //console.log("STATE from <componentWillUnmount :",  state);
  }

  handleUserConfirmation(){
    //console.log('Auth.isUserAuthenticated', Auth.isUserAuthenticated());
  }

  handleChange(event, index, value) {
       this.setState({value})
  }

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    /*
    // create a string for an HTTP body message
    const user = encodeURIComponent(this.state.booking.user);
    const bikeperiod = encodeURIComponent(this.state.booking.bikeperiod);
    const bikename = encodeURIComponent(this.state.booking.name);
    */

    const userid = localStorage.getItem('useremail');
    const periodid = localStorage.getItem('bikeperiod');
    const bikeid = localStorage.getItem('bike');

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

        self.setState({
          messages: xhr.response.message,
          messageChanged: xhr.response.success

        });

        // change the component-container state
        this.setState({
          errors: {}
        });

        //console.log("This State Message : ", this.state);
        //console.log("This XHR Response Message : ", xhr.response);

        // change the current URL to /message
        //this.props.router.replace('/booking');

        // change the current URL to /message
        //this.props.router.replace('/message');

        // change the current URL to /
        //this.context.router.replace('/');

        // save the token
        Auth.authenticateUser(xhr.response.token);

      } else {
        // failure

        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

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
        xhr.send(formData); // Send data to DB
        handleBackToBooking(true);
      },
      (result) => {
        // `cancel` callback
        //console.log('cancel called');
      }
    );

    //xhr.send(formData);
  }

  handleBikeSelection(evt) {

    let bikeSelected = evt.target !== undefined ? document.elementTarget = evt.target : null;

    const bikename = bikeSelected !== null ? bikeSelected.name : evt;
    const bikeClass = bikeSelected !== null ? bikeSelected.className : 'bikeImg';
    const allBikes = document.getElementsByClassName(bikeClass);

    for(var i=0,leni=allBikes.length; i<leni; i++){
      var tempBike = allBikes[i];
      tempBike.style.opacity = 1;
      if(tempBike.name === bikename){
        bikeSelected = tempBike;
      }
    }

    if(bikeSelected !== null){
      bikeSelected.style.opacity = 0.2;

      //TODO: Check if periods are available for this selected bike
      var periodsAvailable = this.checkPeriodsAvailable();
      //console.log("periodsAvailable : ", periodsAvailable);
      console.log("handleBikeSelection periodsAvailable:", periodsAvailable);

      this.setState({
        isBikeAvailable: true
      })
    };

    Auth.setBikeName(bikename);

    /*###*/
    /*this.setState({
      bikeActive: this.state.bikeActive !== true ? true : false
    });

    const bikename = event.target !== null ? event.target.name : event;
    const bikeClass = event.target !== undefined ? event.target.className : 'bikeImg';
    const allBikes = document.getElementsByClassName(bikeClass);

    Auth.setBikeName(bikename);

    for(var i=0,leni=allBikes.length; i<leni; i++){
      var tempBike = allBikes[i];
      tempBike.style.opacity = 1;
      if(tempBike.name === bikename){
        tempBike.style.opacity = 0.2;
      }
    }*/
    /*###*/
  }

  checkPeriodsAvailable() {
    console.log("CHEKING WHICH PERIODS ARE AVAILABLE...!!!");

    var periodData = []; //Which has to have all the Periods Objects {}

    // prevent default action. in this case, action is the form submission event

    const self = this;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/checkperiod');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success
        console.log("checkPeriodsAvailable xhr.response", xhr.response);
        //TODO: Set the state of the periods available
        self.setState({
          periodData: null,
        });

        // change the component-container state
        // this.setState({
        //   errors: {},
        // });
        //this.props.router.replace('/');
      } else {
        // failure

        console.log("ERROR", xhr.response);

        // change the component state
        // const errors = xhr.response.errors ? xhr.response.errors : {};
        // errors.summary = xhr.response.message;
        //
        // this.setState({
        //   errors
        // });
      }
    });
    xhr.send();

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

  handleSetPeriod(evt){
    if (evt.target.nodeName === "SPAN"){
      var inputRadioBtn = evt.target.parentNode.children[0].value;
      var spanValue = evt.target.value;

      Auth.setPeriod(spanValue);

      this.handleSelectedOption(inputRadioBtn, spanValue);
    }
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    var bikeName = '';
    var bikePeriod = '';
    var userEmail = '';
    var messages = '';
    var messageChanged = false;
    var periodsAvailable = [];

    //console.log("Auth.isUserAuthenticated()", Auth.isUserAuthenticated());

    if(Auth.isUserAuthenticated()){
      userEmail = Auth.getUserEmail();
      bikeName = Auth.getBikeName();
    }

    bikePeriod = Auth.getPeriod();

    this.handleBikeSelection(bikeName);

    //TODO: Get all the periods available


    this.setState({
      periodsAvailable: [],
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
   */
  render() {
    return (
      <BookingFormAll
        periodData={this.state.periodData}
        handleBikeSelection={this.handleBikeSelection}
        bikeActive={this.state.bikeActive}
        isBikeAvailable={this.state.isBikeAvailable}
        messageChanged={this.state.messageChanged }
        messages={this.state.messages}
        handleBackToBooking={this.handleBackToBooking}
        value={this.state.value}
        onSubmit={this.processForm}
        handleTimeChange={this.handleTimeChange}
        handleDateChange={this.handleDateChange}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        booking={this.state.booking}
        handleUserConfirmation={this.handleUserConfirmation}
        handleSelectedOption={this.handleSelectedOption}
        optionSelected={this.state.optionSelected}
        handleSetPeriod={this.handleSetPeriod}
        periodsAvailable={this.state.periodsAvailable}
       />
    );
  }
}

export default BookingPage;

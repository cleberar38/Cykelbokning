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
  optionSelected: '',
  isPeriodChecked: false,
  isBookingPeriodChecked: false,
  btnPeriodClicked: false,
  lastPeriodClicked: null
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
    this.handleSetPeriod = this.handleSetPeriod.bind(this);
    this.checkPeriodsAvailable = this.checkPeriodsAvailable.bind(this);
    this.checkPeriodsInBooking = this.checkPeriodsInBooking.bind(this);
    this.handleBackBtn = this.handleBackBtn.bind(this);
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

        



      },
      (result) => {
        // `cancel` callback
        console.log('cancel called');
      }
    );
  }

  handleBackBtn() {
    this.setState({
      messages: '',
      messageChanged: false
    });
  }

  handleSetPeriod(evt, value){

    //let periodSelected = evt !== undefined && evt !== null ? document.elementTarget = evt.target : null;

    //const periodName = periodSelected !== null && periodSelected !== undefined ? periodSelected.name : evt;

    console.log("periodSelected evt : ", evt);
    console.log("handleSetPeriod value : ", value);

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

      console.log("WHICH PERIODS ARE AVAILABLE INSIDE BOOKING...???");

      const self = this;

      // create an AJAX request
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/auth/checkbookedperiod');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          // success

          console.log("PeriodsAvailable in Booking xhr.response", xhr.response);

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

          console.log("checkPeriodsAvailable xhr.response", xhr.response);

          //TODO: Set the state of the periods available

          self.setState({
            periodData: xhr.response
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
          periodData: xhr.response
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

    console.log("bikePeriod: ", bikePeriod);
    console.log("this.state.handleSetPeriod: ", this.state.lastPeriodClicked);

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
   */
  render() {
    return (
      <BookingFormAll
        handleBackBtn={this.handleBackBtn}
        lastPeriodClicked={this.state.lastPeriodClicked}
        btnPeriodClicked={this.state.btnPeriodClicked}
        periodBtnState={this.state.periodBtnState}
        isPeriodChecked={this.state.isPeriodChecked}
        periodData={this.state.periodData}
        bookingPeriodData={this.state.bookingPeriodData}
        handleBikeSelection={this.handleBikeSelection}
        bikeActive={this.state.bikeActive}
        isBikeAvailable={this.state.isBikeAvailable}
        messageChanged={this.state.messageChanged }
        messages={this.state.messages}
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
       />
    );
  }
}

export default BookingPage;

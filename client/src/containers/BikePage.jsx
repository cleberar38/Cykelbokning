import React from 'react';
import Auth from '../modules/Auth';
import Bike from '../components/Bike.jsx';

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
  }

  addBike(event){
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const biketype = encodeURIComponent(this.state.bike.biketype); //req.biketype,
    const name = encodeURIComponent(this.state.bike.name); //req.name,
    const imgurl = encodeURIComponent(this.state.bike.imgurl); //req.imgurl,
    const amountavailable = encodeURIComponent(this.state.bike.amountavailable); //req.amountavailable

    const formData = `biketype=${biketype}&name=${name}&imgurl=${imgurl}&amountavailable=${amountavailable}`;

    const self = this;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/addbike');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success
        //console.log("this.state.period", this.state.period);
        //TODO: Set the state of the periods available
        self.setState({
          bike: self.state.bike,
          messageChanged: true,
          messages: xhr.response.message
        });

        //console.log("addPeriod xhr.response: ", xhr.response);

        // change the component-container state
        this.setState({
          errors: {},
        });
        //this.props.router.replace('/');

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

  /**
   * Render the component.
   */
  render() {
    return (
      <Bike
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

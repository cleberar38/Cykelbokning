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
  },
  message: '',
  messages: '',
  errors: {},
  messageChanged: false
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
    const periodname = encodeURIComponent(this.state.period.periodname);
    const datefrom = encodeURIComponent(this.state.period.datefrom);
    const dateto = encodeURIComponent(this.state.period.dateto);
    const periodid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const formData = `periodid=${periodid}&periodname=${periodname}&datefrom=${datefrom}&dateto=${dateto}`;

    console.log(formData);
    const self = this;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/addperiod');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success
        console.log("this.state.period", this.state.period);
        //TODO: Set the state of the periods available
        self.setState({
          period: self.state.period,
          messageChanged: true,
          messages: xhr.response.message
        });

        console.log("addPeriod xhr.response: ", xhr.response);

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


  /**
   * Render the component.
   */
  render() {
    return (
      <PeriodForm
        handleBackToBooking={this.props.handleBackToBooking}
        messageChanged={this.state.messageChanged}
        period={this.state.period}
        message={this.state.message}
        messages={this.state.messages}
        addPeriod={this.addPeriod}
        onSubmit={this.addPeriod}
        errors={this.state.errors}
        onChange={this.onChange}
       />

    );
  }
};

export default PeriodPage;

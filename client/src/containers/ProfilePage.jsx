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
  name: ''

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

          console.log("xhr.response.done : ", xhr.response.done);

          this.setState({
            messageChanged: true,
            messages: 'Avbokningar är helt klart! '
          })

      } else {
        // failure

        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

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

        // change the component-container state
        this.setState({
          profileresult:  xhr.response.result
        }, () =>
          console.log("this.state.profileresult : ", this.state)
        );

        //console.log("Response from AUTH profile : ", xhr.response.result )

      } else {
        // failure

        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

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

      />
    );
  }
}

export default ProfilePage;

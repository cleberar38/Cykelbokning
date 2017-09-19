import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import LoginForm from '../components/LoginForm.jsx';

let state = {
  isVerified: false,
  messageChanged: false,
  messages: '',
  errors: {},
  successMessage: '',
  user: {
    email: '',
    password: '',
    name: ''
  }
};

class LoginPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    //successMessage = '';

    // set the initial component state
    this.state = state;

    if (storedMessage) {
      this.setState({
        successMessage: storedMessage
      });

      localStorage.removeItem('successMessage');
    }

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    

  }

  componentDidMount() {
    console.log("LoginPage props : ", this.props);
    console.log("LoginPage props : ", this.state);
    
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    let self = this;

    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success


        // change the component-container state
        this.setState({
          errors: {},
          //isVerified: xhr.response.isVerified
        });

        console.log("hr.response.isVerified : ", xhr.response.isVerified);

        //if(xhr.response.isVerified === false){
          //this.setState({
            //messageChanged: true,
            //messages: "YOU MUST VERIFY YOUR SUBSCRIPTION."
          //});
        //}
        //if(xhr.response.isVerified){
//          this.setState({
            //messageChanged: false,
            //messages: '',
            //isVerified: true
          //});
        //}

        // save the token
        Auth.authenticateUser(xhr.response.token);
        Auth.setUserName(xhr.response.user.name);
        Auth.setVerifyUser(xhr.response.isVerified);

        console.log("xhr.response.user", xhr.response.user);


        //console.log("processForm LoginPage Type of User : ", xhr.response);

        if(xhr.response.user.usertype === "admin"){
          Auth.authenticateAdminUser("admin");
        }

          // change the current URL to /
          this.context.router.replace('/');



      } else {
        // failure

        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors,
          user:{
            name: xhr.response.user !== undefined ? xhr.response.user.name : ''
          }
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
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });

    Auth.setUserEmail(user.email);
    Auth.setUserName(user.name);

  }

  /**
   * Render the component.
   */
  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
        messageChanged={this.state.messageChanged}
        messages={this.state.messages}
        isVerified={this.state.isVerified}
      />
    );
  }

}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginPage;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import strings  from './lang_config.jsx';
import default_lang from './default_lang.jsx';
import MessagesToUserPage from '../containers/MessagesToUserPage.jsx';
import ProfilePage from '../containers/ProfilePage.jsx';
import FlatButton from 'material-ui/FlatButton';
import Auth from '../modules/Auth';

strings.setLanguage(default_lang.lang);

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user,
  messageChanged,
  messages,
  isVerified,
  bikename,
  nextAvailablePeriodDate,
  period,
  profileresult,
  removeBooking,
  name,
  handleSubmit
}) => (
  <div>
     {Auth.isUserAuthenticated ? (
     <div>
      {messageChanged ? (
        <MessagesToUserPage  messageChanged={ messageChanged } messages={ messages } isVerified={ isVerified } />
      ) : (
      <Card zDepth={5} className="container cardbottom">
        <form action="/" onSubmit={ onSubmit }>

          {successMessage && <p className="success-message">{successMessage}</p>}
          {errors.summary && <p className="error-message">{errors.summary}</p>}

          <div className="field-line">
            <TextField
              floatingLabelText={strings.email}
              name="email"
              errorText={errors.email}
              onChange={onChange}
              value={user.email}
            />
          </div>

          <div className="field-line">
            <TextField
              floatingLabelText={strings.password}
              type="password"
              name="password"
              onChange={onChange}
              errorText={errors.password}
              value={user.password}
            />
          </div>

          <div className="button-line">
            <RaisedButton type="submit" label={strings.login} primary={false} backgroundColor="#ae0b05" className="loginBtn" onSubmit={handleSubmit} />
          </div>

          <CardText><h3>{strings.douhaveaccount}</h3>  <Link to="/signup" style={{ color: "#ae0b05" }}> {strings.signup} </Link></CardText>

        </form>
      </Card>

      )}

     </div>

     ) : <ProfilePage removeBooking={ removeBooking } bikename={ bikename } name={ name } nextAvailablePeriodDate={ nextAvailablePeriodDate } period={ period } profileresult={ profileresult } /> }


  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  messageChanged: PropTypes.bool.isRequired,
  messages: PropTypes.string.isRequired,
  isVerified: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default LoginForm;

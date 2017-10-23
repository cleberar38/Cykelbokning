import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import strings  from './lang_config.jsx';
import default_lang from './default_lang.jsx';
import ConfirmationPage from '../containers/ConfirmationPage.jsx';
import MessagesToUserPage from '../containers/MessagesToUserPage.jsx';

strings.setLanguage(default_lang.lang);

const ResetPassword = ({
  onSubmit,
  onChange,
  errors,
  user,
  messageChanged,
  messages,
  handleConfirmation

}) => (
  <div>
  {messageChanged ? (
  <MessagesToUserPage  messageChanged={ messageChanged } messages={ messages } />
  ) : (
  <Card zDepth={5} className="container cardbottomReg">
    <form action="" onSubmit={onSubmit}>
      <h2 className="card-heading">{strings.signup}</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

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

      <div className="field-line">
        <TextField
          floatingLabelText={strings.password}
          type="password"
          name="passwordconfirm"
          onChange={onChange}
          errorText={errors.passwordconfirm}
          value={user.passwordconfirm}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label={strings.resetpassword} primary={false} backgroundColor="#ae0b05" className="registerBtn" />
      </div>

      <CardText>{strings.douhaveaccount} <Link to={'/login'}>{strings.login}</Link></CardText>
    </form>
  </Card>
  )}
</div>
);

ResetPassword.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired

};

export default ResetPassword;

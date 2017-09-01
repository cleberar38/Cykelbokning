import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';

import strings  from './lang_config.jsx';
import default_lang from './default_lang.jsx';

strings.setLanguage(default_lang.lang);

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <div>
  <Card zDepth={5} className="container cardbottomReg">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">{strings.signup}</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText={strings.name}
          name="name"
          errorText={errors.name}
          onChange={onChange}
          value={user.name}
        />
      </div>

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
          floatingLabelText={strings.username}
          type="username"
          name="username"
          errorText={errors.username}
          onChange={onChange}
          value={user.username}
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

      <div className="field-line">
        <TextField
          floatingLabelText={strings.address}
          name="address"
          errorText={errors.address}
          onChange={onChange}
          value={user.address}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText={strings.city}
          name="city"
          errorText={errors.city}
          onChange={onChange}
          value={user.city}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText={strings.phone}
          name="phone"
          errorText={errors.phone}
          onChange={onChange}
          value={user.phone}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label={strings.createaccount} primary={false} backgroundColor="#0096D5" />
      </div>

      <CardText>{strings.douhaveaccount} <Link to={'/login'}>{strings.login}</Link></CardText>
    </form>
  </Card>

</div>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;

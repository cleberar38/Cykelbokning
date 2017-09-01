import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import * as Colors from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Subheader from 'material-ui/Subheader';
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Link, IndexLink } from 'react-router';
import strings  from './lang_config.jsx';
import default_lang from './default_lang.jsx';
import Auth from '../modules/Auth';
import BikePage from '../containers/BikePage.jsx';
import MessagesToUserPage from '../containers/MessagesToUserPage.jsx';
import TextField from 'material-ui/TextField';
import {Button} from 'react-bootstrap';

strings.setLanguage(default_lang.lang);

const PeriodForm = ({
  period,
  message,
  messages,
  addPeriod,
  onSubmit,
  errors,
  onChange,
  messageChanged,
  isAdminUserAuthenticated
}) => (
  <div>
    {messageChanged ? (
    <MessagesToUserPage messageChanged={ messageChanged } messages={ messages } />
    ) : (
    <div>
      {Auth.isAdminUserAuthenticated() ? (
      <Card zDepth={5} className="container cardbottomReg">
        <form action="/" onSubmit={onSubmit}>
          <h2 className="card-heading">{strings.addperiod}</h2>

          {errors.summary && <p className="error-message">{errors.summary}</p>}

          <div className="field-line">
            <TextField
              floatingLabelText={strings.periodname}
              name="periodname"
              errorText={errors.periodname}
              onChange={onChange}
              value={period.periodname}
            />
          </div>

          <div className="field-line">
            <TextField
              floatingLabelText={strings.datefrom}
              name="datefrom"
              errorText={errors.datefrom}
              onChange={onChange}
              value={period.datefrom}
            />
          </div>

          <div className="field-line">
            <TextField
              floatingLabelText={strings.dateto}
              name="dateto"
              errorText={errors.dateto}
              onChange={onChange}
              value={period.dateto}
            />
          </div>
 
          {Auth.isAdminUserAuthenticated() ? (
          <div className="button-line center-container cardbottomFot">

              <RaisedButton onClick={onSubmit} type="submit" label={strings.sendBtn} primary={false} backgroundColor="#0096D5" />

          </div>
          ) : (
            <div className="center-container">
              <Link to="/login" style={{color: 'white'}}><FlatButton style={{color: 'white', backgroundColor: 'rgba(0, 150, 213, 0.7)'}} label={strings.login} /></Link>
            </div>
          )}

          <CardText>{strings.removeperiod} <Link to={'/removeperiod'}>{strings.removeperiod}</Link></CardText>
        </form>
      </Card>
      ) : (
        <MessagesToUserPage messageChanged={ messageChanged } messages="Kontakta Admin" />
      )}
    </div>

    )}
  </div>
);

PeriodForm.propTypes = {
  period: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  addPeriod: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PeriodForm;

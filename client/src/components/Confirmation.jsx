import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';
import AppBar from 'material-ui/AppBar';
import strings  from './lang_config.jsx';
import default_lang from './default_lang.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import {Button} from 'react-bootstrap';

strings.setLanguage(default_lang.lang);

const Confirmation = ({
  messages,
  messageChanged,
  handleConfirmation
}) => (
  <div  style={{height: '100%'}}>
    <div>
      <Card className="container">
        <CardTitle title={ strings.accountregistered } subtitle="">
        </CardTitle>
        <Link to="/login" onClick={() => handleConfirmation()} style={{ color: "white" }}><Button bsStyle="primary" className={"msgbtn "}>{ strings.confirmlogin }</Button></Link>
      </Card>
    </div>
  </div>
);

Confirmation.propTypes = {

};

export default Confirmation;

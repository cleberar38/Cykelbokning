import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';
import AppBar from 'material-ui/AppBar';
import strings  from './lang_config.jsx';
import default_lang from './default_lang.jsx';
import RaisedButton from 'material-ui/RaisedButton';

strings.setLanguage(default_lang.lang);

const MessageToUSer = ({
  messages,
  messageChanged,
  handleBackToBooking
}) => (
  <div  style={{height: '100%'}}>
    <div>
      <Card className="container">
        <CardTitle title="SBF-bokningsystem" subtitle={ strings.doneBooking }>
          <h1 className="display-2">{ strings.thankMsg }</h1>
          <h4 className="display-2">{ messages }</h4>
        </CardTitle>
        <IndexLink style={{color: 'black'}}><RaisedButton  onClick={ () => handleBackToBooking(false) } label="Tillbaka till bokning" primary /></IndexLink>
      </Card>
    </div>
  </div>
);

MessageToUSer.propTypes = {

};

export default MessageToUSer;

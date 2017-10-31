import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';
import AppBar from 'material-ui/AppBar';
import strings from './lang_config.jsx';
import default_lang from './default_lang.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import { Button } from 'react-bootstrap';

strings.setLanguage(default_lang.lang);

const BookingMsgFail = ({
    errors,
    hasError,
    messages
}) => (
        <div style={{ height: '100%' }}>
            <div>
                <Card className="container">
                    <CardTitle title="" subtitle="">
                      <div className="display-2">
                        <div>
                        {hasError ?

                            <div>
                              <h4 className="display-2">{errors.summary}</h4>
                              <h5 className="display-2 color-red">{errors.periodid}</h5>
                              <h5 className="display-2 color-red">{errors.bikeid}</h5>
                              <h5 className="display-2 color-red">{errors.pickuptime}</h5>
                              <h5 className="display-2 color-red">{errors.pickupdate}</h5>
                              <h5 className="display-2 color-red">{errors.terms}</h5>
                            </div>

                            :

                            <div className="display-2">
                                {messages}
                            </div>
                        }
                        </div>
                      </div>
                    </CardTitle>
                    <RaisedButton href="/" label={strings.goback} primary={false} backgroundColor="#ae0b05" className="msgbtn" />
                </Card>
            </div>
        </div>
    );

BookingMsgFail.propTypes = {

};

export default BookingMsgFail;

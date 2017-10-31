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

const BookingMsg = ({
    errors,
    pickuptime,
    pickupdate,
    hasError,
    messages
}) => (
        <div style={{ height: '100%' }}>
            <div>
                <Card className="container">

                    <CardTitle title="" subtitle="">

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
                                <h2>Tack för din bokning.</h2>
                                <h5>Du hämtar lånecykeln <strong>{pickupdate}</strong> kl. <strong>{pickuptime}</strong> på stadsbyggnadsförvaltningen Järnvägsgatan 22, Helsingborg.</h5>
                                <h4>Du kan se din bokning under ”Mina bokningar”.</h4>
                            </div>
                        }
                        </div>
                    </CardTitle>
                    <RaisedButton href="/" label={strings.goback} primary={false} backgroundColor="#ae0b05" className="msgbtn" />
                </Card>
            </div>
        </div>
    );

BookingMsg.propTypes = {
};

export default BookingMsg;

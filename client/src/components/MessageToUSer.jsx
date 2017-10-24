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

const MessageToUSer = ({
    messages,
    messageChanged,
    errors,
    handleBackBtn
}) => (
        <div style={{ height: '100%' }}>
            <div>
                <Card className="container">

                    <CardTitle title="" subtitle="">

                        {errors !== undefined || errors !== null && Object !== null || Object !== undefined && Object.keys(errors).length === 0 && errors.constructor === Object ?

                            (<h4 className="display-2">{messages}</h4>)
                            :
                            (<h4 className="display-2">{errors.summary}</h4>)

                        }

                    </CardTitle>
                    <RaisedButton href="/" label={strings.goback} primary={false} backgroundColor="#ae0b05" className="msgbtn" />
                </Card>
            </div>
        </div>
    );

MessageToUSer.propTypes = {

};

export default MessageToUSer;

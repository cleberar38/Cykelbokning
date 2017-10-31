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
import FlatButton from 'material-ui/FlatButton';

strings.setLanguage(default_lang.lang);

const RemoveBikeMsg = ({
    messages,
    errors,
}) => (
        <div style={{ height: '100%' }}>
            <div>
                <Card className="container">
                    <CardTitle title="" subtitle="">

                        {errors !== undefined || errors !== null && Object !== null || Object !== undefined && Object.keys(errors).length === 0 && errors.constructor === Object ?

                            (<h3 className="display-2">{messages}</h3>)
                            :
                            (<h3 className="display-2">{errors.summary}</h3>)

                        }

                    </CardTitle>
                    <div className="center-container">
                        <FlatButton href="/" style={{ color: 'white', backgroundColor: 'rgba(174, 11, 5, 0.8)' }} label={strings.goback} />
                    </div>
                </Card>
            </div>
        </div>
    );

RemoveBikeMsg.propTypes = {

};

export default RemoveBikeMsg;

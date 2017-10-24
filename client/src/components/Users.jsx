import React from 'react';
import PropTypes from 'prop-types';
import MobileTearSheet from '../MobileTearSheet.jsx';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import default_lang from './default_lang.jsx';
import Auth from '../modules/Auth';
import strings from './lang_config.jsx';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import ProfileMessagesPage from '../containers/ProfileMessagesPage.jsx';
import { Pager, Button, ListGroup, ListGroupItem, Media, Alert } from 'react-bootstrap';

strings.setLanguage(default_lang.lang);

const Users = ({
    profileresult,
    preRemoveBooking,
    removeBooking,
    messages,
    messageChanged,
    handleBackBtn,
    isNotPreDeleted,
    handleAlertDismiss,
    alertVisible,
    handleAlertShow

  }) => (
    <div>
        {messageChanged ? (
            <ProfileMessagesPage messageChanged={messageChanged} messages={messages} handleBackBtn={handleBackBtn} />
        ) : (

            <div>
                <Subheader>Användare</Subheader>
                <ListGroup>
                    {profileresult !== null ? profileresult.map((profile) => (
                        <ListGroupItem key={profile._id} header={profile.name}>
                            {Auth.isAdminUserAuthenticated() && localStorage.getItem("usertype") === "admin" ? (
                                <span>
                                    <span style={{ color: darkBlack }}><strong>E-post: </strong>{profile.email} </span><br />
                                    <span style={{ color: darkBlack }}><strong>Telefon: </strong>{profile.phone} </span><br />
                                    <span style={{ color: darkBlack }}><strong>Adress: </strong>{profile.address} </span><br />
                                    <span style={{ color: darkBlack }}><strong>Kommun: </strong>{profile.city} </span><br />
                                </span>
                            ) :  null}
                            {alertVisible ? (
                                <Alert bsStyle="danger" onDismiss={handleAlertDismiss}>
                                  <span>Är du säker?</span><br />
                                  <span>
                                    <Link to="/"><Button key={profile.email} bsStyle="danger">Ta bort</Button></Link>
                                    <span> eller </span>
                                    <Button onClick={handleAlertDismiss}>Avbryt</Button>
                                  </span>
                                </Alert>

                            ) : (
                                <Pager><Pager.Item next href="#" onClick={handleAlertShow}>Ta bort</Pager.Item></Pager>
                            )}
                        </ListGroupItem>
                    )) : null }
                </ListGroup>
            </div>
        )}
    </div>
);

Users.propTypes = {
    preRemoveBooking: PropTypes.func.isRequired,
    removeBooking: PropTypes.func.isRequired,
    messages: PropTypes.string.isRequired,
    messageChanged: PropTypes.bool.isRequired,
    handleBackBtn: PropTypes.func,
    isNotPreDeleted: PropTypes.bool.isRequired
};

export default Users;

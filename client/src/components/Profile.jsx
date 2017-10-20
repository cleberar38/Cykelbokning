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
import { FormControl, ControlLabel, FormGroup, Pager, Button, ListGroup, ListGroupItem, Media, Alert } from 'react-bootstrap';

strings.setLanguage(default_lang.lang);

const Profile = ({
    bikename,
    nextAvailablePeriodDate,
    period,
    profileresult,
    preRemoveBooking,
    removeBooking,
    name,
    messages,
    messageChanged,
    handleBackBtn,
    isNotPreDeleted,
    handleAlertDismiss,
    alertVisible,
    handleAlertShow,
    saveComment

  }) => (
    <div>
        {messageChanged ? (
            <ProfileMessagesPage messageChanged={messageChanged} messages={messages} handleBackBtn={handleBackBtn} />
        ) : (

            <div>
                <Subheader>Mina bokningar</Subheader>

                <ListGroup>
                    {profileresult !== null ? profileresult.map((profile) => (
                        <ListGroupItem key={profile._id} header={profile.name}>
                            {Auth.isAdminUserAuthenticated() && localStorage.getItem("usertype") === "admin" ? (
                                <span>
                                    <span style={{ color: darkBlack }}><strong>E-post: </strong>{profile.userid} </span><br />
                                    <span style={{ color: darkBlack }}><strong>Telefon: </strong>{profile.phone} </span><br />
                                    <span style={{ color: darkBlack }}><strong>Adress: </strong>{profile.address} </span><br />
                                    <span style={{ color: darkBlack }}><strong>Kommun: </strong>{profile.city} </span><br />
                                    <span style={{ color: darkBlack }}><strong>Cykel: </strong>{profile.bikeid} </span><br />
                                    <span style={{ color: darkBlack }}><strong>Period: </strong>{profile.periodid} </span><br />
                                    <span style={{ color: darkBlack }}><strong>Bokat datum: </strong>{profile.bookeddate}</span><br />
                                    <span style={{ color: darkBlack }}><a href="https://cykelbiblioteket.helsingborg.se/vara-cyklar/" target="_blank">{strings.meromcykel}</a></span><br />
                                    <span style={{ color: darkBlack }}><strong>Kommentar: </strong>{profile.admincomment}</span>
                                    <FormGroup controlId="formControlsTextarea">
                                        <ControlLabel>{strings.adminnote}</ControlLabel>
                                        <FormControl id={profile.bikebookingid} className="adminnewcomment" componentClass="textarea" name="adminnewcomment" placeholder="Kommentar" />
                                        <span>
                                          <Link to="/"><Button key={profile.bikebookingid} bsStyle="danger"  onClick={(evt) => saveComment(evt, profile.bikebookingid)}>Spara kommentar</Button></Link>
                                        </span>
                                    </FormGroup>
                                </span>
                            ) : (
                            <div>
                                    {Auth.isUserAuthenticated() && localStorage.getItem("usertype") === "user" ? (
                                <span>
                                    <span style={{ color: darkBlack }}><strong>Cykel: </strong>{profile.bikeid} </span><br />
                                    <span style={{ color: darkBlack }}><strong>Bokat datum: </strong>{profile.bookeddate}</span><br />
                                    <span style={{ color: darkBlack }}><a href="https://cykelbiblioteket.helsingborg.se/vara-cyklar/" target="_blank">{strings.meromcykel}</a></span>
                                </span>
                                ) : null
                                    }
                                </div>
                            )}
                            {alertVisible ? (
                                <Alert bsStyle="danger" onDismiss={handleAlertDismiss}>
                                  <h4>Är du säker?</h4><br />
                                  <span>
                                    <Link to="/profilemsg"><Button key={profile.bikebookingid} bsStyle="danger" onClick={(evt) => removeBooking(evt, profile.bikebookingid)}>Avboka</Button></Link>
                                    <span> eller </span>
                                    <Button onClick={handleAlertDismiss}>Avbryt</Button>
                                  </span>
                                </Alert>

                            ) : (
                                <Pager><Pager.Item next href="#" onClick={handleAlertShow}>Avboka</Pager.Item></Pager>
                            )}
                        </ListGroupItem>
                    )) : null }
                </ListGroup>
            </div>
        )}
    </div>
);

Profile.propTypes = {
    bikename: PropTypes.string.isRequired,
    nextAvailablePeriodDate: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    preRemoveBooking: PropTypes.func.isRequired,
    removeBooking: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    messages: PropTypes.string.isRequired,
    messageChanged: PropTypes.bool.isRequired,
    handleBackBtn: PropTypes.func,
    isNotPreDeleted: PropTypes.bool.isRequired
};

export default Profile;

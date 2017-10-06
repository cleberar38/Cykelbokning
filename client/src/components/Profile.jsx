import React from 'react';
import MobileTearSheet from '../MobileTearSheet.jsx';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import default_lang from './default_lang.jsx';
import Auth from '../modules/Auth';
import strings from './lang_config.jsx';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import ProfileMessagesPage from '../containers/ProfileMessagesPage.jsx';

strings.setLanguage(default_lang.lang);

const Profile = ({
    bikename,
    nextAvailablePeriodDate,
    period,
    profileresult,
    removeBooking,
    name,
    messages,
    messageChanged,
    handleBackBtn

  }) => (
        <div>
            <div className="center-container">
                <Link to="/" style={{ color: 'white' }}>
                    <FlatButton style={{ color: 'white', backgroundColor: 'rgba(174, 11, 5, 0.8)' }} label={strings.goback} />
                </Link>
            </div>
            {messageChanged ? (
                <ProfileMessagesPage messageChanged={messageChanged} messages={messages} handleBackBtn={handleBackBtn} />
            ) : (
                    <MobileTearSheet>
                        <List>
                            <Subheader>Mina bokningar</Subheader>
                            {profileresult !== null ? profileresult.map((profile) => (
                                <div key={profile._id}>
                                    <ListItem
                                        leftAvatar={<Avatar src="https://image.flaticon.com/icons/svg/125/125855.svg" />}
                                        rightIconButton={(
                                            <IconMenu iconButtonElement={(
                                                <Link to="/profilemsg"><FlatButton style={{ color: 'white', backgroundColor: 'rgba(174, 11, 5, 0.8)' }} key={profile.bikebookingid} label={strings.unbook} onClick={(evt) => removeBooking(evt, profile.bikebookingid)} name={profile.bikebookingid} secondary={true} style={{ "margin": "12px" }} /></Link>
                                            )}>
                                                <MenuItem>{strings.unbooked}</MenuItem>
                                            </IconMenu>
                                        )}
                                        primaryText={profile.periodid}
                                        secondaryText={
                                            <div className={Auth.isAdminUserAuthenticated() ? "admprofile" : "userprofile"}>
                                                {Auth.isAdminUserAuthenticated() ? (
                                                    <div>
                                                        <span style={{ color: darkBlack }}>{profile.name} </span><br />
                                                        <span style={{ color: darkBlack }}>{profile.phone} </span><br />
                                                        <span style={{ color: darkBlack }}>{profile.address} </span><br />
                                                        <span style={{ color: darkBlack }}>{profile.city} </span><br />
                                                        <span style={{ color: darkBlack }}>{profile.bikeid} </span><br /><span><span>Bokat datum: </span>{profile.bookeddate}</span><br />
                                                        <span><a href="https://cykelbiblioteket.helsingborg.se/vara-cyklar/" target="_blank">{strings.meromcykel}</a></span>
                                                    </div>
                                                )
                                                    : (
                                                        <div>
                                                            <span style={{ color: darkBlack }}>{profile.bikeid} </span><br /><span><span>Bokat datum: </span>{profile.bookeddate}</span><br />
                                                            <span><a href="https://cykelbiblioteket.helsingborg.se/vara-cyklar/" target="_blank">{strings.meromcykel}</a></span>
                                                        </div>
                                                    )}
                                            </div>
                                        }
                                        secondaryTextLines={2} />
                                    <Divider inset={true} />
                                </div>
                            )) : null}
                        </List>
                    </MobileTearSheet>
                )}
            <div className="button-line">

            </div>
        </div>
    );

Profile.propTypes = {
    bikename: PropTypes.string.isRequired,
    nextAvailablePeriodDate: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    removeBooking: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    messages: PropTypes.string.isRequired,
    messageChanged: PropTypes.bool.isRequired,
    handleBackBtn: PropTypes.func
};

export default Profile;
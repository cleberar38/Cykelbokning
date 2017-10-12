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
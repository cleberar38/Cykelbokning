import React from 'react';
import MobileTearSheet from '../MobileTearSheet.jsx';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import default_lang from './default_lang.jsx';
import Auth from '../modules/Auth';
import strings  from './lang_config.jsx';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import MessagesToUserPage from '../containers/MessagesToUserPage.jsx';


strings.setLanguage(default_lang.lang);

const Profile = ({
  bikename,
  nextAvailablePeriodDate,
  period,
  profileresult,
  removeBooking,
  name,
  messageChanged,
  messages,
  handleBackBtn
  }) => (
  <div>
    {messageChanged ? (
      <MessagesToUserPage  messageChanged={ messageChanged } messages={ messages } handleBackBtn={ handleBackBtn } />
    ) : (
    <MobileTearSheet>
      <List>
        <Subheader>Cykelhanteringssida</Subheader>
          { profileresult !== null ? profileresult.map((profile) => (
            <div>
              <ListItem
                leftAvatar={<Avatar src={ require('../imgs/cykelprofile.png') } />}
                rightIconButton={(
                  <IconMenu iconButtonElement={(
                    <Link to="/message"><RaisedButton key={ profile.bikebookingid } label={ strings.unbook } onClick={ (evt) => removeBooking(evt, profile.bikebookingid) } name={ profile.bikebookingid } secondary={true} style={{"margin":"12px"}} /></Link>
                  )}>
                    <MenuItem>{ strings.unbooked }</MenuItem>
                  </IconMenu>
                )}
                primaryText={profile.periodid}
                secondaryText={
                  <p>
                    <span style={{color: darkBlack}}>{ strings.nextyearmsg } </span><span>{ profile.nextbookingdate }</span><br />
                      <span><a href="https://cykelbiblioteket.helsingborg.se/vara-cyklar/" target="_blank">{ strings.meromcykel }</a></span>
                  </p>
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
  profileresult: PropTypes.object.isRequired,
  removeBooking: PropTypes.func.isRequired,
  name: PropTypes.func.isRequired
};

export default Profile;

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

import default_lang from './default_lang.jsx';
import Auth from '../modules/Auth';
import strings  from './lang_config.jsx';
strings.setLanguage(default_lang.lang);

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="mer"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Updatera</MenuItem>
    <MenuItem>Editera</MenuItem>
    <MenuItem>Avboka</MenuItem>
  </IconMenu>
);

const ListExampleMessages = () => (
  <div>
    <MobileTearSheet>
      <List>
        <Subheader>Cykelhanteringssida</Subheader>
        <ListItem
          leftAvatar={<Avatar src="http://kartor.helsingborg.se/Cykelbokning/client/src/imgs/cykelprofile.png" />}
          rightIconButton={rightIconMenu}
          primaryText="Elcykel"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Brunch this weekend?</span><br />
              I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="http://kartor.helsingborg.se/Cykelbokning/client/src/imgs/cykelprofile.png" />}
          rightIconButton={rightIconMenu}
          primaryText="me, Vikcykelr"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Summer BBQ</span><br />
              Wish I could come, but I&apos;m out of town this weekend.
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="http://kartor.helsingborg.se/Cykelbokning/client/src/imgs/cykelprofile.png" />}
          rightIconButton={rightIconMenu}
          primaryText="Lastcykel"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Oui oui</span><br />
              Do you have any Paris recs? Have you ever been?
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="http://kartor.helsingborg.se/Cykelbokning/client/src/imgs/cykelprofile.png" />}
          rightIconButton={rightIconMenu}
          primaryText="Lastcykel"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Birthday gift</span><br />
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="http://kartor.helsingborg.se/Cykelbokning/client/src/imgs/cykelprofile.png" />}
          rightIconButton={rightIconMenu}
          primaryText="Lastcykel"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Recipe to try</span><br />
              We should eat this: grated squash. Corn and tomatillo tacos.
            </p>
          }
          secondaryTextLines={2}
        />
      </List>
    </MobileTearSheet>
  </div>
);

export default ListExampleMessages;

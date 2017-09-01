import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Auth from '../modules/Auth';
import strings  from './lang_config.jsx';
import default_lang from './default_lang.jsx';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

import ActionAndroid from 'material-ui/svg-icons/action/android';

strings.setLanguage(default_lang.lang);

const mainDiv = {
    innerHeight: window.innerHeight,
};

const styles = {
  title: {
    cursor: 'pointer',
  },
};

function handleResetForm(){

    const bikeClass = 'bikeImg';
    const allBikes = document.getElementsByClassName(bikeClass);

    const radiosBtns = document.getElementsByTagName("INPUT");

    for(var i=0,leni=allBikes.length; i<leni; i++){
      var tempBike = allBikes[i];
      tempBike.style.opacity = 1;
    }

    /*###*/
    /*this.setState({
      isBikeAvailable: false
    })*/
    /*###*/

    Auth.deauthenticateUser();

}

const Base = ({
  children
}) => (
  <div  style={{height: mainDiv.innerHeight}}>
    <div>
      <AppBar style={{backgroundColor: '#0096D5'}}
        showMenuIconButton={false}
        title={
        <div className="top-bar-left">
        <IndexLink to="/" style={{color: 'white'}}>SBF-Cykelbokning</IndexLink>
        </div>}>

        <Toolbar style={{backgroundColor: '#0096D5'}}>
          <ToolbarGroup style={{backgroundColor: '#0096D5'}}>
            <FontIcon className="muidocs-icon-custom-sort" />
            <ToolbarSeparator />
              <IconMenu style={{right: "10px"}}
                iconButtonElement={
                  <IconButton touch={true}>
                    <NavigationExpandMoreIcon />
                  </IconButton>
                }
              >
                <MenuItem>
                  <FlatButton label="Lägga till användare" primary={true} icon={<ActionAndroid />} labelPosition="before" />
                </MenuItem>
                <MenuItem>
                  <Link to="/createperiod" style={{color: 'white'}}><FlatButton label="Lägga till period" primary={true} /></Link>
                </MenuItem>
                <MenuItem>
                  <FlatButton label="Redigera period" primary={true} />
                </MenuItem>
              </IconMenu>
              <ToolbarSeparator />
          </ToolbarGroup>
        </Toolbar>


        {Auth.isUserAuthenticated() ? (
          <div className="top-bar-right">
            <span style={{color: 'white'}}><FlatButton style={{color: 'white'}} label={localStorage.getItem("name")} /></span>
            <Link to="/logout" onClick={ handleResetForm } style={{color: 'white'}}><FlatButton style={{color: 'white'}} label={strings.logout} /></Link>
          </div>
        ) : (
          <div className="top-bar-right">
            <Link to="/login" style={{color: 'white'}}><FlatButton style={{color: 'white'}} label={strings.login} /></Link>
            <Link to="/signup" style={{color: 'white'}}><FlatButton style={{color: 'white'}} label={strings.signup} /></Link>
          </div>
        )}
      </AppBar>
    </div>
    { /* child component will be rendered here */ }
    {children}
  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;

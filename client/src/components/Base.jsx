import React from 'react';
import PropTypes from 'prop-types';
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
import {Button, Panel} from 'react-bootstrap';

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

    for(var i=0,leni=allBikes.length; i<leni; i++){
      var tempBike = allBikes[i];
      tempBike.style.opacity = 1;
    }

    Auth.deauthenticateUser();
}

const Base = ({
  children
}) => (
  <Panel footer={<a href="https://cykelbiblioteket.helsingborg.se/" target="_blank"><FlatButton style={{color: 'white'}} backgroundColor="#ae0b05" label={strings.tillbakahuvsida} /></a>}>
  <div  style={{height: mainDiv.innerHeight}}>
    <div>
      <AppBar style={{backgroundColor: '#ae0b05'}}
        showMenuIconButton={false}
        title={
        <div className="top-bar-left">
        <IndexLink to="/" style={{color: 'white'}} className="main-title">{ strings.maintitle }</IndexLink>
        </div>}>

        <Toolbar style={{backgroundColor: '#ae0b05'}}>
          <ToolbarGroup style={{backgroundColor: '#ae0b05'}}>
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
                  <Link to="/addbike" style={{color: 'white'}}><FlatButton label="Lägga till ny cykel" primary={true} /></Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/createperiod" style={{color: 'white'}}><FlatButton label="Lägga till period" primary={true} /></Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/profil" style={{color: 'white'}}><FlatButton label={ strings.mybook } primary={true} /></Link>
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
          </div>
        )}
      </AppBar>
    </div>
    { /* child component will be rendered here */ }
    {children}
    <img style={{width: '100px', height: '112px', float: 'right'}} src='https://cykelbiblioteket.helsingborg.se/wp-content/themes/municipio/assets/dist/images/helsingborg.svg' />
  </div>
  </Panel>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;

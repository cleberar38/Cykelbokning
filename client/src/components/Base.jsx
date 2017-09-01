import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Auth from '../modules/Auth';
import strings  from './lang_config.jsx';
import default_lang from './default_lang.jsx';
import FlatButton from 'material-ui/FlatButton';

strings.setLanguage(default_lang.lang);

const mainDiv = {
    innerHeight: window.innerHeight,
};

const styles = {
  title: {
    cursor: 'pointer',
  },
};

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

        {Auth.isUserAuthenticated() ? (
          <div className="top-bar-right">
            <span style={{color: 'white'}}><FlatButton style={{color: 'white'}} label={localStorage.getItem("name")} /></span>
            <Link to="/logout" style={{color: 'white'}}><FlatButton style={{color: 'white'}} label={strings.logout} /></Link>
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

import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import * as Colors from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Subheader from 'material-ui/Subheader';
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Link, IndexLink } from 'react-router';
import strings  from './lang_config.jsx';
import default_lang from './default_lang.jsx';
import Auth from '../modules/Auth';
import BikePage from '../containers/BikePage.jsx';
import MessagesToUserPage from '../containers/MessagesToUserPage.jsx';
import ListExampleMessages from './Profile.jsx'
import {Button} from 'react-bootstrap';
import { Grid, Row, Col, Thumbnail, Panel, Jumbotron } from 'react-bootstrap';

strings.setLanguage(default_lang.lang);

const BookingFormAll = ({
  handleBikeSelection,
  periodBtnState,
  bikeActive,
  onSubmit,
  booking,
  value,
  getFormContent,
  optionSelected,
  handleSetPeriod,
  isBikeAvailable,
  periodsAvailable,
  periodData,
  bookingPeriodData,
  btnPeriodClicked,
  messageChanged,
  messages,
  handleBackBtn,
  errors
}) => (
  <div>
    <Jumbotron>
      {messageChanged ? (
      <MessagesToUserPage messageChanged={ messageChanged } messages={ messages } handleBackBtn={ handleBackBtn } errors={ errors } />
      ) : (
      <form action="/" onSubmit={onSubmit}>
        
        <BikePage handleBikeSelection={ handleBikeSelection } bikeActive={ bikeActive } />

        <div>
          <div className="center-container">
            {isBikeAvailable !== true ? null : (
            <div style={{"margin":"auto", "maxWidth":"960px"}}>
              <ul>
                { periodData !== null ? periodData.done.map((post) => (
                  <li key={post._id} style={{padding: 5}}>
                    <Button key={ post._id } bsStyle={ periodBtnState } className={ "periodBtn " } name={post.periodname} onClick={ (evt) => handleSetPeriod(evt, post.periodname) }>
                      {post.periodname}
                    </Button>
                  </li>
                )) : null}
              </ul>
            </div>
            )}
          </div>
        </div>

        {Auth.isUserAuthenticated() ? (
        <div className="button-line center-container cardbottomFot">
          <Link to="/message" ><Button type="submit" bsStyle="success" style={{color: 'white', backgroundColor: 'rgba(174, 11, 5, 0.8)'}} className="top-btn" onClick={onSubmit}>{strings.sendBtn}</Button></Link>
        </div>
        ) : (
        <div className="center-container">
          <Link to="/login" style={{color: 'white'}}><FlatButton style={{color: 'white', backgroundColor: 'rgba(174, 11, 5, 0.8)'}} label={strings.book} /></Link>
        </div>
        )}
  	   </form>
       )}
    </Jumbotron>
  </div>

);

BookingFormAll.propTypes = {
  handleBikeSelection: PropTypes.func.isRequired,
  bikeActive: PropTypes.bool.isRequired,
  messageChanged: PropTypes.bool.isRequired,
  messages: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  booking: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  handleSetPeriod: PropTypes.func.isRequired,
  optionSelected: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

export default BookingFormAll;

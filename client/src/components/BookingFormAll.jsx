import React, { PropTypes } from 'react';
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

const periodData = [
  { "id": "1", "content": "#1 - Period: 21/sep - 09/okt" },
  { "id": "2", "content": "#2 - Period: 12/okt - 30/okt" },
  { "id": "3", "content": "#3 - Period: 02/nov - 20/nov" },
  { "id": "4", "content": "#4 - Period: 23/nov - 11/dec" }
];


strings.setLanguage(default_lang.lang);

const tilesData = [
  {
    imgId: 'SD1',
    img: 'https://static.pexels.com/photos/100582/pexels-photo-100582.jpeg',
    title: 'ELLA, 3-VXL',
  },
  {
    imgId: 'SD2',
    img: 'https://static.pexels.com/photos/326678/pexels-photo-326678.jpeg',
    title: 'ELLY, 24-VXL',
  },
  {
    imgId: 'SD3',
    img: 'https://static.pexels.com/photos/255934/pexels-photo-255934.jpeg',
    title: 'ELDER, 10-VXL',
  },
  {
    imgId: 'SD4',
    img: 'https://static.pexels.com/photos/191042/pexels-photo-191042.jpeg',
    title: 'ELTA, ALFINE 11-VXL',
  },
];

const BookingFormAll = ({
  handleBikeSelection,
  bikeActive,
  handleBackToBooking,
  messageChanged,
  messages,
	onSubmit,
	booking,
  value,
  getFormContent,
  handleSelectedOption,
  optionSelected,
	handleSetPeriod,
  isBikeAvailable,
  periodsAvailable
}) => (
 <div>




  <ListExampleMessages />




    {messageChanged ? (
    <MessagesToUserPage handleBackToBooking={ handleBackToBooking } messageChanged={ messageChanged } messages={ messages } />
    ) : (
    <form action="/" onSubmit={onSubmit}>

      <BikePage handleBikeSelection={ handleBikeSelection } bikeActive={ bikeActive } />

      <div>
        <div className="center-container">
          {isBikeAvailable !== true ? (
          <Card className="period-container">
            <CardTitle title="SBF-bokningsystem" subtitle={ strings.hbgstadTile }>
              <h4 className="display-2">{ strings.chooseCykel }</h4>
              <IndexLink style={{color: 'black'}}><RaisedButton  label="Mer info." primary /></IndexLink>
            </CardTitle>
          </Card>
          ) : (
          <ul>
            {periodData.map((post) => (
              <li key={post.id} style={{padding: 5}}>
                <RaisedButton className={ "option" + post.id } primary={ true } onClick={ handleSetPeriod } label={post.content} >
                  <input id={ "option" + post.id } type="radio" value={ "option" + post.id } checked={ optionSelected === "option" + post.id } onChange={ (evt) => handleSelectedOption(periodData, evt) } />
                </RaisedButton>
              </li>
            ))}
          </ul>
          )}
        </div>
      </div>

      {Auth.isUserAuthenticated() ? (
      <div className="button-line center-container cardbottomFot">
        <Button type="submit" bsStyle="success" className="top-btn" onClick={onSubmit}>{strings.sendBtn}</Button>
      </div>
      ) : (
        <div className="center-container">
          <Link to="/login" style={{color: 'white'}}><FlatButton style={{color: 'white', backgroundColor: 'rgba(0, 150, 213, 0.7)'}} label={strings.login} /></Link>
        </div>
      )}
	   </form>
     )}
  </div>
);

BookingFormAll.propTypes = {
  handleBikeSelection: PropTypes.func.isRequired,
  bikeActive: PropTypes.bool.isRequired,
  messageChanged: PropTypes.bool.isRequired,
  messages: PropTypes.string.isRequired,
  handleBackToBooking: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  booking: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  handleSetPeriod: PropTypes.func.isRequired,
  handleSelectedOption: PropTypes.func.isRequired,
  optionSelected: PropTypes.string.isRequired
};

export default BookingFormAll;

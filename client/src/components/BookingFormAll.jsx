import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import * as Colors from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Subheader from 'material-ui/Subheader';
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Link, IndexLink } from 'react-router';
import strings from './lang_config.jsx';
import default_lang from './default_lang.jsx';
import Auth from '../modules/Auth';
//import BikePage from '../containers/BikePage.jsx';
import MessagesToUserPage from '../containers/MessagesToUserPage.jsx';
import ListExampleMessages from './Profile.jsx'
import { Button } from 'react-bootstrap';
import { FormControl, ControlLabel, FormGroup, Grid, Row, Col, Thumbnail, Panel, Jumbotron, Alert, Pager } from 'react-bootstrap';
import Checkbox from '../containers/CheckboxPage.jsx';
import PickupTimePage from '../containers/PickupTimePage.jsx';
import BookingMsgPage from '../containers/BookingMsgPage.jsx';
import BookingMsgFailPage from '../containers/BookingMsgFailPage.jsx';

strings.setLanguage(default_lang.lang);

const items = [
    //&aring;, &auml;, &ouml;, &Aring;, &Auml;, &Ouml;
    'Jag har läst låneavtalet',
];

const paneltitle = (
    <h3 style={{ "color": "white", "textAlign": "left" }}>{strings.chooseCykel}</h3>
);

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
    tilesData,
    periodData,
    bookingPeriodData,
    btnPeriodClicked,
    messageChanged,
    messages,
    handleBackBtn,
    errors,
    isBikeChecked,
    bike,
    addBike,
    btnPeriodBg,
    checked,
    createCheckbox,
    toggleCheckbox,
    label,
    pickuptime,
    pickupdate,
    showErrorMsg,
    hasError,
    isBooking,
    isBookingComplete,
    alertVisible,
    handleAlertDismiss,
    handleAlertShow,
    removeBike,
    removePeriod

}) => (
        <div>
            <Jumbotron>
                {messageChanged ? (

                  <div>
                    { isBookingComplete ? <BookingMsgPage  messages={messages} pickuptime={pickuptime} pickupdate={pickupdate} hasError={hasError} errors={errors} />
                      :
                      <BookingMsgFailPage messages={messages} messages={messages} hasError={hasError} errors={errors} />
                    }
                  </div>
                ) : (
                        <form action="/" onSubmit={onSubmit}>

                          <div className="w3-row-padding" style={{"background":"#fff", "margin": "auto", "border": "1px solid rgb(255, 0, 0)", "maxWidth": "960px", "height": "100%"}}>
                            <div className="topnav">
                              <a href="#">{paneltitle}</a>
                            </div>
                            {tilesData !== null ? tilesData.done.map((tile) => (
                              <div key={tile._id} className="w3-col l3 m6 w3-margin-bottom">
                                <div className="w3-display-container">
                                  <img className={"bikeImg"} alt={tile.bikename} src={tile.imgurl} style={{"width":"100%"}} onClick={handleBikeSelection} name={tile.bikename} />
                                  <div className="w3-display-topleft w3-black w3-padding">{tile.bikename}</div>
                                </div>
                              </div>
                            )) : null }
                          </div>


                            <div>
                                <div className="center-container">
                                    {isBikeAvailable !== true ? null : (
                                        <div style={{ "margin": "auto", "maxWidth": "960px" }}>
                                            <ul>
                                                {periodData !== null ? periodData.period.map((post) => (
                                                    <li key={post._id} style={{ padding: 5 }}>
                                                        <button className="periodbtns periodBtn" key={post._id} name={post.periodname} onClick={(evt, props) => handleSetPeriod(evt, post.periodname)}>{post.periodname}</button>


                                                        <div>
                                                          {Auth.isAdminUserAuthenticated() && localStorage.getItem("usertype") === "admin"  ?
                                                            <div>
                                                              {alertVisible ? (
                                                                  <Alert bsStyle="danger" onDismiss={handleAlertDismiss}>
                                                                    <h4>Är du säker?</h4><br />
                                                                    <span>
                                                                      <Link to="/removeperiodmsg"><Button key={post._id} bsStyle="danger" onClick={(evt) => removePeriod(evt, post._id)}>Ta bort</Button></Link>
                                                                      <span> eller </span>
                                                                      <Button onClick={handleAlertDismiss}>Avbryt</Button>
                                                                    </span>
                                                                  </Alert>

                                                              ) : (
                                                                  <Pager><Pager.Item next href="#" onClick={handleAlertShow}>Ta bort</Pager.Item></Pager>
                                                              )}
                                                            </div>
                                                            : null
                                                          }
                                                        </div>


                                                    </li>
                                                )) : null}
                                            </ul>

                                            {Auth.isAdminUserAuthenticated() && Auth.getUserType() === "admin" ? (
                                                <FormGroup controlId="formControlsTextarea">
                                                    <ControlLabel>{strings.adminnote}</ControlLabel>
                                                    <FormControl className="admincomment" componentClass="textarea" placeholder="Kommentar" />
                                                </FormGroup>
                                            ) : null}
                                            <div style={{ "margin": "auto", "maxWidth": "960px" }}>
                                              <PickupTimePage />
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>

                            {Auth.isUserAuthenticated() ? (
                                <div>

                                    <div className="center-container">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                {items.map(createCheckbox)}
                                            </div>
                                        </div>
                                    </div>
                                        <div className="button-line center-container cardbottomFot">
                                            <FlatButton to="/message" onClick={onSubmit} className="top-btn" style={{ color: 'white' }} backgroundColor="#ae0b05" label={strings.book} />
                                        </div>
                                </div>
                            ) : (
                                    <div className="center-container">
                                        <Link to="/login" style={{ color: 'white' }}>
                                            <FlatButton style={{ color: 'white', backgroundColor: 'rgba(174, 11, 5, 0.8)' }} label={strings.book} />
                                        </Link>
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
    errors: PropTypes.object.isRequired,
    handleBackBtn: PropTypes.func,
    removePeriod: PropTypes.func

};

export default BookingFormAll;

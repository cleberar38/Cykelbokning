import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import * as Colors from 'material-ui/styles/colors';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Subheader from 'material-ui/Subheader';
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

import Auth from '../modules/Auth';
import strings  from './lang_config.jsx';
import default_lang from './default_lang.jsx';

strings.setLanguage(default_lang.lang);

const days = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"];
const months = ["December", "Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November"];

const d = new Date();
const dateObj = new Date();
const month = dateObj.getUTCMonth() + 1;
const day = dateObj.getUTCDate();
const year = dateObj.getUTCFullYear();
const week = dateObj.getUTCDay();
const hours = dateObj.getHours();
const minutes = dateObj.getUTCMinutes();

const newdate = year + "/" + months[month] + "/" + day + "/" + days[week] + "/" + hours + ":" + minutes ;

const tilesData = [
  {
    imgId: 'SD1',
    img: 'https://static.pexels.com/photos/100582/pexels-photo-100582.jpeg',
    title: 'ELIN, 7-VXL',
    featured: true,
  },
  {
    imgId: 'SD2',
    img: 'https://static.pexels.com/photos/326678/pexels-photo-326678.jpeg',
    title: 'ELLA, 3-VXL',
  },
  {
    imgId: 'SD3',
    img: 'https://static.pexels.com/photos/255934/pexels-photo-255934.jpeg',
    title: 'ELLY, 24-VXL',
  },
  {
    imgId: 'SD4',
    img: 'https://static.pexels.com/photos/191042/pexels-photo-191042.jpeg',
    title: 'ELDER, 10-VXL',
  },
];

const HomePageForm = ({
	onSubmit,
	onChange,
	handleChange,
	handleUserConfirmation,
	booking,
	value
	}) => (
	<div>
    <Card>


    </Card>
  </div>
	);

	HomePageForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	handleUserConfirmation: PropTypes.func.isRequired,
	booking: PropTypes.object.isRequired,
	value: PropTypes.number.isRequired
};

export default HomePageForm;

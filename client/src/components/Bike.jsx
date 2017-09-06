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

const Bike = ({
  messageChanged,
  isBikeChecked,
  messages,
  bike,
  bikeActive,
  handleBikeSelection
}) => (

  <div className="root gridlist container">
    <GridList className="height gridlist-content" cellHeight={180}z>
      {tilesData.map((tile) => (
        <GridTile key={tile.imgId} title={tile.title}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
          <img key={tile.imgId} className={ "bikeImg" } onClick={ handleBikeSelection } name={tile.imgId} src={tile.img} />
        </GridTile>
      ))}
    </GridList>
  </div>

);

export default Bike;

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

strings.setLanguage(default_lang.lang);

const periodData = [
  { "id": "1", "content": "#1 - Period: 21/sep - 09/okt" },
  { "id": "2", "content": "#2 - Period: 12/okt - 30/okt" },
  { "id": "3", "content": "#3 - Period: 02/nov - 20/nov" },
  { "id": "4", "content": "#4 - Period: 23/nov - 11/dec" }
];

const ListItemForm = ({
  handleSelectedOption,
  optionSelected,
	handleSetPeriod,
  period,
  active
}) => (
  <div>
    <div className="center-container">
      <ul>
        {periodData.map((post) => (
          <li key={post.id} style={{padding: 5}}>
            <RaisedButton className={ "option" + post.id } primary="primary" onClick={ handleSetPeriod } label={post.content} >
              <input type="radio" value={ "option" + post.id } checked={ optionSelected === "option" + post.id } onChange={ handleSelectedOption } />
            </RaisedButton>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

ListItemForm.propTypes = {
  handleSetPeriod: PropTypes.func.isRequired,
  handleSelectedOption: PropTypes.func.isRequired,
  period: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  optionSelected: PropTypes.string.isRequired
};

export default ListItemForm;

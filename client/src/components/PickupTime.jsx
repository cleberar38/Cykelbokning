import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import strings  from './lang_config.jsx';
import default_lang from './default_lang.jsx';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Auth from '../modules/Auth';

strings.setLanguage(default_lang.lang);

const PickupTime = ({
  onChange,
  errors,
  value
}) => (
    <div>
        <SelectField
          floatingLabelText="Väljia tid för hämtning"
          value={value}
          onChange={(event, index, value ) => onChange(event, index, value)}
          autoWidth={true}
          id="biketidselection"
          children={value}
        >
          <MenuItem className="menuitems" value={0} primaryText="Cykelupphämtningstid" />
          <MenuItem className="menuitems" value={1} primaryText="12.00-12.30" />
          <MenuItem className="menuitems" value={2} primaryText="12.30-13.00 " />
          <MenuItem className="menuitems" value={3} primaryText="13.00-13.30" />
          <MenuItem className="menuitems" value={4} primaryText="13.30-14.00" />
          <MenuItem className="menuitems" value={5} primaryText="14.00-14.30" />
          <MenuItem className="menuitems" value={6} primaryText="14.30-15.00" />
          <MenuItem className="menuitems" value={7} primaryText="15.00-15.30" />
          <MenuItem className="menuitems" value={8} primaryText="15.30-16.00" />
          <MenuItem className="menuitems" value={9} primaryText="16.00-16.30" />
          <MenuItem className="menuitems" value={10} primaryText="16.30-17.00" />
          <MenuItem className="menuitems" value={11} primaryText="17.00-17.30" />
          <MenuItem className="menuitems" value={12} primaryText="17.30-18.00" />
        </SelectField>
    </div>
);

PickupTime.propTypes = {
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default PickupTime;

import React from 'react';
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
import { Grid, Row, Col, Thumbnail, Panel } from 'react-bootstrap';
import Responsive from 'react-responsive';

strings.setLanguage(default_lang.lang);

const tilesData = [
    {
        imgId: 'SD1',
        img: 'https://cykelbiblioteket.helsingborg.se/wp-content/uploads/sites/95/2017/09/cykelbibl_elcykel_1_1920x1080.jpg',
        title: 'Elcykel',
    },
    {
        imgId: 'SD2',
        img: 'https://cykelbiblioteket.helsingborg.se/wp-content/uploads/sites/95/2017/09/cykelbibl_vikcykel_1920x1080.jpg',
        title: 'Vikcykel',
    },
    {
        imgId: 'SD3',
        img: 'https://cykelbiblioteket.helsingborg.se/wp-content/uploads/sites/95/2017/09/cykelbibl_gron_lastcykel_1920x1080.jpg',
        title: 'Lastcykel grön',
    },
    {
        imgId: 'SD4',
        img: 'https://cykelbiblioteket.helsingborg.se/wp-content/uploads/sites/95/2017/09/cykelbibl_svart_lastcykel_1920x1080.jpg',
        title: 'Lastcykel svart',
    },
    {
        imgId: 'SD5',
        img: 'https://cykelbiblioteket.helsingborg.se/wp-content/uploads/sites/95/2017/09/cykelbibl_tvahjuliglastcykel_1920x1080.jpg',
        title: 'Tvåhjulig lastcykel',
    },
];

const paneltitle = (
    <h3 style={{ "color": "white", "textAlign": "left" }}>{strings.chooseCykel}</h3>
);

const Bike = ({
  messageChanged,
    isBikeChecked,
    messages,
    bike,
    bikeActive,
    handleBikeSelection,
    addBike
}) => (

        <div>
            <Grid className="container-grid">
                <Row style={{ "margin": "auto", "maxWidth": "960px" }}>
                    <Panel header={paneltitle} bsStyle="danger">
                        {tilesData.map((tile) => (
                            <Col key={tile.imgId} md={4} style={{ 'marginTop': '20px' }}>
                                <Thumbnail className={"bikeImg"} href="#" alt={tile.imgId} src={tile.img} onClick={handleBikeSelection} name={tile.imgId} />
                                <GridTile className="grid-title" style={{ "backgroundColor": "white", "marginTop": "-20px" }} title={tile.title}>
                                    <img style={{ 'width': '100%', 'height': '50px' }} />
                                </GridTile>
                            </Col>
                        ))}
                    </Panel>
                </Row>
            </Grid>
        </div>

    );

export default Bike;
import React from 'react';
import PropTypes from 'prop-types';
import default_lang from './default_lang.jsx';
import Auth from '../modules/Auth';
import strings from './lang_config.jsx';
import { Row, Col } from 'react-bootstrap';

strings.setLanguage(default_lang.lang);

const SortFilter = ({
  filterresult,
  getBookings,
  sortTable

  }) => (
    <div>
      <table style={{"border": "1px solid black", "width": "100%"}} id="myTable">
        <thead>
          <Row className="tablehead" style={{"border": "1px solid black", "margin":"0px", "padding":"5px"}}>
            <Col md={3} onClick={() => sortTable(0)}><strong>Cykel</strong></Col>
            <Col md={3} onClick={() => sortTable(1)}><strong>Period</strong></Col>
            <Col md={3} onClick={() => sortTable(2)}><strong>Användare</strong></Col>
            <Col md={3} onClick={() => sortTable(3)}><strong>Bokat datum</strong></Col>
          </Row>
        </thead>
        <tbody>
        {filterresult !== null ? filterresult.map((sorts, index) => (

          <Row key={Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)} style={{"border": "1px solid black", "margin":"0px", "padding":"5px"}} >

            <Col md={3}>{sorts.bikeid}</Col>
            <Col md={3}>{sorts.periodid}</Col>
            <Col md={3}>{sorts.name}</Col>
            <Col md={3}>{sorts.bookeddate.split("T")[0]}</Col>
          </Row>

        )) : null}
        </tbody>
      </table>
    </div>
);

SortFilter.propTypes = {

};

export default SortFilter;

import "babel-polyfill";
import React from 'react';
import Auth from '../modules/Auth';
import BookingMsgFail from '../components/BookingMsgFail.jsx';

// Set initial state
let state = {

};

class BookingMsgFailPage extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        // Retrieve the last state
        this.state = state;
    }

    /**
     * Render the component.
     */
    render() {
        return (
            <BookingMsgFail
                hasError={this.props.hasError}
                errors={this.props.errors}
                messages={this.props.messages}
            />
        );
    }
}

export default BookingMsgFailPage;

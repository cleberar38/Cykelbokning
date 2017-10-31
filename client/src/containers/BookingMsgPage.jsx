import "babel-polyfill";
import React from 'react';
import Auth from '../modules/Auth';
import BookingMsg from '../components/BookingMsg.jsx';

// Set initial state
let state = {

};

class BookingMsgPage extends React.Component {

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
            <BookingMsg
                hasError={this.props.hasError}
                errors={this.props.errors}
                pickupdate={this.props.pickupdate}
                pickuptime={this.props.pickuptime}
                messages={this.props.messages}
            />
        );
    }
}

export default BookingMsgPage;

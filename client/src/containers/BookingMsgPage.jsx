import "babel-polyfill";
import React from 'react';
import Auth from '../modules/Auth';
import BookingMsg from '../components/BookingMsg.jsx';

// Set initial state
let state = {
    messageChanged: false,
    messages: '',
};

class BookingMsgPage extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        // Retrieve the last state
        this.state = state;

        this.handleBackBtn.bind(this);

    }

    handleBackBtn() {
        this.setState({
            messageChanged: false,
            messages: ''
        });
    }

    /**
     * Render the component.
     */
    render() {
        return (
            <BookingMsg
                messageChanged={this.props.messageChanged}
                messages={this.props.messages}
                errors={this.props.errors}
                handleBackBtn={this.state.handleBackBtn}
                pickupdate={this.props.pickupdate}
                pickuptime={this.props.pickuptime}
            />


        );
    }
}

export default BookingMsgPage;

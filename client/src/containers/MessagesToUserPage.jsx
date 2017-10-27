import "babel-polyfill";
import React from 'react';
import Auth from '../modules/Auth';
import MessageToUSer from '../components/MessageToUSer.jsx';

// Set initial state
let state = {
    messagesTouser: '',
    messageChanged: false,
    hasError: null
};

let self = this;

class MessageToUSerPage extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        // Retrieve the last state
        this.state = state;
    }

    componentDidMount() {
        this.setState({
            messagesToUser: this.props.messagesToUser,
            messageChanged: this.props.messageChanged,
            pickupdate: this.props.pickupdate,
            pickuptime: this.props.pickuptime,
            hasError: this.props.hasError
        });
    }

    /**
     * Render the component.
     */
    render() {
        return (
            <MessageToUSer
                messageChanged={this.state.messageChanged}
                messagesToUser={this.state.messagesTouser}
                errors={this.props.errors}
                hasError={this.state.hasError}
                handleBackBtn={this.props.handleBackBtn}
                pickupdate={this.state.pickupdate}
                pickuptime={this.state.pickuptime}
                showErrorMsg={this.props.showErrorMsg}
            />
        );
    }
}

export default MessageToUSerPage;

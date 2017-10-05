import "babel-polyfill";
import React from 'react';
import Auth from '../modules/Auth';
import MessageToUSer from '../components/MessageToUSer.jsx';

// Set initial state
let state = {

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



    /**
     * Render the component.
     */
    render() {
        return (
            <MessageToUSer
                messageChanged={this.props.messageChanged}
                messages={this.props.messages}
                errors={this.props.errors}
                handleBackBtn={this.props.handleBackBtn}
            />
        );
    }
}

export default MessageToUSerPage;
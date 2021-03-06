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

    componentDidMount() {

    }

    /**
     * Render the component.
     */
    render() {
        return (
            <MessageToUSer
                messagesToUser={this.props.messages}
                errors={this.props.errors}
                hasError={this.props.hasError}
            />
        );
    }
}

export default MessageToUSerPage;

import "babel-polyfill";
import React from 'react';
import Auth from '../modules/Auth';
import ProfileMessages from '../components/ProfileMessages.jsx';

// Set initial state
let state = {
    messageChanged: false,
    messages: '',
    errors: {}
};

class ProfileMessagesPage extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        // Retrieve the last state
        this.state = state;

        this.handleBackBtn.bind(this);

    }

    componentWillMount() {
        this.setState({
            messageChanged: true,
            messages: 'Cykeln har avbokats',
            errors: {}
        });
    }

    componentDidMount() {

        window.scrollTo(0, 0);

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
            <ProfileMessages
                messageChanged={this.state.messageChanged}
                messages={this.state.messages}
                errors={this.state.errors}
                handleBackBtn={this.state.handleBackBtn}
            />
        );
    }
}

export default ProfileMessagesPage;
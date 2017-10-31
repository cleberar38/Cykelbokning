import "babel-polyfill";
import React from 'react';
import Auth from '../modules/Auth';
import ProfileMessages from '../components/ProfileMessages.jsx';

// Set initial state
let state = {
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
    }

    componentWillMount() {
        this.setState({
            messages: 'Cykeln har avbokats',
            errors: {}
        });
    }

    /**
     * Render the component.
     */
    render() {
        return (
            <ProfileMessages
                messages={this.state.messages}
                errors={this.state.errors}
            />
        );
    }
}

export default ProfileMessagesPage;

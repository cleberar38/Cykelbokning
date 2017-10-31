import "babel-polyfill";
import React from 'react';
import Auth from '../modules/Auth';
import RemoveBikeMsg from '../components/RemoveBikeMsg.jsx';

// Set initial state
let state = {
    messages: '',
    errors: {}
};

class RemoveBikeMsgPage extends React.Component {
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
            messages: 'Cykeln tas bort.',
            errors: {}
        });
    }

    /**
     * Render the component.
     */
    render() {
        return (
            <RemoveBikeMsg
                messages={this.state.messages}
                errors={this.state.errors}
            />
        );
    }
}

export default RemoveBikeMsgPage;

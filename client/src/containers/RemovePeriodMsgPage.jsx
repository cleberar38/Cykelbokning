import "babel-polyfill";
import React from 'react';
import Auth from '../modules/Auth';
import RemovePeriodMsg from '../components/RemovePeriodMsg.jsx';

// Set initial state
let state = {
    messages: '',
    errors: {}
};

class RemovePeriodMsgPage extends React.Component {
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
            messages: 'Period tas bort.',
            errors: {}
        });
    }

    /**
     * Render the component.
     */
    render() {
        return (
            <RemovePeriodMsg
                messages={this.state.messages}
                errors={this.state.errors}
            />
        );
    }
}

export default RemovePeriodMsgPage;

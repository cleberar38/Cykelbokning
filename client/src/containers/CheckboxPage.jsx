import React, { Component, PropTypes } from 'react';

let state = {
    isChecked: false,
}

class Checkbox extends Component {

    /**
    * Class constructor.
    */
    constructor(props) {
        super(props);

        // Retrieve the last state
        this.state = state;

        this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    }

    componentDidMount() {

        window.scrollTo(0, 0);

    }

    toggleCheckboxChange() {
        const { handleCheckboxChange, label } = this.props;

        this.setState(({ isChecked }) => (
            {
                isChecked: !isChecked,
            }
        ));

        handleCheckboxChange(label);
    }

    render() {
        const { label } = this.props;
        const { isChecked } = this.state;

        return (
            <div className="checkbox">
                <label>
                    <input
                        type="checkbox"
                        value={label}
                        checked={isChecked}
                        onChange={this.toggleCheckboxChange}

                    />

                    <a href="https://cykelbiblioteket.helsingborg.se/cykelbibliotekets-laneavtal/" target="_blank"> {label} </a>
                </label>
            </div>
        );
    }
}

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired
};

export default Checkbox;

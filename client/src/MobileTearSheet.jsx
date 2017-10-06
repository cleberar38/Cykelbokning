let React = require('react');


let MobileTearSheet = React.createClass({

    propTypes: {
        height: React.PropTypes.number
    },

    getDefaultProps() {
        return {
            height: 500
        };
    },

    render() {

        let styles = {
            root: {
                float: 'left',
                marginBottom: 24,
                marginRight: 24,
                width: '100%'

            },

            container: {
                border: 'solid 1px #d9d9d9',
                borderBottom: 'none',
                height: '100%',
                overflow: 'hidden'
            },

            bottomTear: {
                display: 'block',
                position: 'relative',
                marginTop: -10,
                width: '100%'
            }
        };

        return (
            <div style={styles.root}>
                <div style={styles.container}>
                    {this.props.children}
                </div>
            </div>
        );
    }

});

module.exports = MobileTearSheet;
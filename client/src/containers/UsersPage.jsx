import "babel-polyfill";
import React from 'react';
import Auth from '../modules/Auth';
import Users from '../components/Users.jsx';
import PropTypes from 'prop-types';

// Set initial state
let state = {
    profileresult: null,
    messageChanged: false,
    messages: '',
    isNotPreDeleted: true,
    alertVisible: false
};

class UsersPage extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        // Retrieve the last state
        this.state = state;

        this.getUsers = this.getUsers.bind(this);
        this.preRemoveBooking = this.preRemoveBooking.bind(this);
        this.removeBooking = this.removeBooking.bind(this);
        this.handleBackBtn = this.handleBackBtn.bind(this);
        this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
        this.handleAlertShow = this.handleAlertShow.bind(this);
    }

    componentWillMount() {
        
        this.getUsers();
    }

    handleBackBtn() {
        this.setState({
            messages: '',
            messageChanged: false
        });
    }

    handleAlertDismiss() {
        this.setState({alertVisible: false});
    }

    handleAlertShow() {
        this.setState({alertVisible: true});
    }

    preRemoveBooking(evt, bikebookingid) {
        this.setState({
            isNotPreDeleted: !this.state.isNotPreDeleted
        });
    }

    removeBooking(evt, bikebookingid) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        const formData = `bikebookingid=${bikebookingid}`;

        const self = this;

        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/auth/unbookbike');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                // success

                let response = null;

                // Opera 8.0+
                var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

                // Firefox 1.0+
                var isFirefox = typeof InstallTrigger !== 'undefined';

                // Safari 3.0+ "[object HTMLElementConstructor]" 
                var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

                // Internet Explorer 6-11
                var isIE = /*@cc_on!@*/false || !!document.documentMode;

                // Edge 20+
                var isEdge = !isIE && !!window.StyleMedia;

                // Chrome 1+
                var isChrome = !!window.chrome && !!window.chrome.webstore;

                // Blink engine detection
                var isBlink = (isChrome || isOpera) && !!window.CSS;

                //IE problem! We have to parse the response since in IE everything became string!
                if (isIE) { response = JSON.parse(xhr.response); } else {
                    response = xhr.response;
                }

                this.setState({
                    isNotPreDeleted: true
                });

            } else {
                // failure

                let response = null;

                // Opera 8.0+
                var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

                // Firefox 1.0+
                var isFirefox = typeof InstallTrigger !== 'undefined';

                // Safari 3.0+ "[object HTMLElementConstructor]" 
                var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

                // Internet Explorer 6-11
                var isIE = /*@cc_on!@*/false || !!document.documentMode;

                // Edge 20+
                var isEdge = !isIE && !!window.StyleMedia;

                // Chrome 1+
                var isChrome = !!window.chrome && !!window.chrome.webstore;

                // Blink engine detection
                var isBlink = (isChrome || isOpera) && !!window.CSS;

                //IE problem! We have to parse the response since in IE everything became string!
                if (isIE) { response = JSON.parse(xhr.response); } else {
                    response = xhr.response;
                }

                // change the component state
                const errors = response.errors ? response.errors : {};
                errors.summary = response.message;

                console.log("ERROR : ", errors);

                this.setState({
                    errors
                });
            }
        });

        xhr.send(formData);

    }

    getUsers() { //In this case the userid is the email address
        
        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/auth/users');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                // success

                let response = null;

                // Opera 8.0+
                var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

                // Firefox 1.0+
                var isFirefox = typeof InstallTrigger !== 'undefined';

                // Safari 3.0+ "[object HTMLElementConstructor]" 
                var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

                // Internet Explorer 6-11
                var isIE = /*@cc_on!@*/false || !!document.documentMode;

                // Edge 20+
                var isEdge = !isIE && !!window.StyleMedia;

                // Chrome 1+
                var isChrome = !!window.chrome && !!window.chrome.webstore;

                // Blink engine detection
                var isBlink = (isChrome || isOpera) && !!window.CSS;

                //IE problem! We have to parse the response since in IE everything became string!
                if (isIE) { response = JSON.parse(xhr.response); } else {
                    response = xhr.response;
                }


                if (Auth.isAdminUserAuthenticated() && localStorage.getItem("usertype") === "admin") {

                    for (var i = 0, leni = response.result.users.length; i < leni; i++) {
                        for (var j = 0, lenj = response.result.users.length; j < lenj; j++) {

                            if (response.result.users[i].email === response.result.users[j].email) {
                                response.result.users[i].name = response.result.users[j].name;
                                response.result.users[i].phone = response.result.users[j].phone;
                                response.result.users[i].address = response.result.users[j].address;
                                response.result.users[i].city = response.result.users[j].city;
                            }
                        }
                    }

                    // change the component-container state
                    this.setState({
                        profileresult: response.result.users
                    });   

                } 

            } else {
                // failure

                let response = null;

                // Opera 8.0+
                var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

                // Firefox 1.0+
                var isFirefox = typeof InstallTrigger !== 'undefined';

                // Safari 3.0+ "[object HTMLElementConstructor]" 
                var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

                // Internet Explorer 6-11
                var isIE = /*@cc_on!@*/false || !!document.documentMode;

                // Edge 20+
                var isEdge = !isIE && !!window.StyleMedia;

                // Chrome 1+
                var isChrome = !!window.chrome && !!window.chrome.webstore;

                // Blink engine detection
                var isBlink = (isChrome || isOpera) && !!window.CSS;

                //IE problem! We have to parse the response since in IE everything became string!
                if (isIE) { response = JSON.parse(xhr.response); } else {
                    response = xhr.response;
                }

                // change the component state
                const errors = response.errors ? response.errors : {};
                errors.summary = response.message;

                console.log("ERROR : ", errors);

                this.setState({
                    errors
                });
            }
        });

        if (Auth.isAdminUserAuthenticated() && localStorage.getItem("usertype") === "admin") {
            xhr.send();
        } 
    }

    /**
     * Render the component.
     */
    render() {
        return (
            <Users

                profileresult={this.state.profileresult}
                preRemoveBooking={this.preRemoveBooking}
                removeBooking={this.removeBooking}
                messageChanged={this.state.messageChanged}
                messages={this.state.messages}
                handleBackBtn={this.handleBackBtn}
                isNotPreDeleted={this.state.isNotPreDeleted}
                alertVisible={this.state.alertVisible}
                handleAlertDismiss={this.handleAlertDismiss}
                handleAlertShow={this.handleAlertShow}

            />
        );
    }
}

export default UsersPage;
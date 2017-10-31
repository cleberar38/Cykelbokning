import React from 'react';
import Auth from '../modules/Auth';
import BookingFormAll from '../components/BookingFormAll.jsx';
import PopUpConfirmation from 'react-popconfirm';
import Checkbox from './CheckboxPage.jsx';

// Set initial state
let state = {
    periodData: null,
    tilesData: null,
    bookingPeriodData: null,
    periodBtnState: "primary",
    bikeActive: false,
    isBikeAvailable: false,
    periodsAvailable: [],
    arrayBikes: {},
    value: 2,
    errors: {},
    successMessage: '',
    booking: {
        name: '',
        bikeperiod: '',
        user: ''
    },
    optionSelected: '',
    isPeriodChecked: false,
    isBikeChecked: false,
    isBookingPeriodChecked: false,
    btnPeriodClicked: false,
    messageChanged: false,
    messages: '',
    lastPeriodClicked: null,
    btnPeriodBg: "#ae0b05",
    pickuptime: '',
    pickupdate: '',
    terms: false,
    showErrorMsg: false,
    hasError: false,
    isBooking: false,
    termsCheckboxIsSelected: false,
    isBookingComplete: false,
    alertVisible: false
};


class BookingPage extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        const storedMessage = localStorage.getItem('successMessage');

        // Retrieve the last state
        this.state = state;

        if (storedMessage) {
            this.state.successMessage = storedMessage;
            localStorage.removeItem('successMessage');
        }

        this.handleBikeSelection = this.handleBikeSelection.bind(this);
        this.handleSetPeriod = this.handleSetPeriod.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.processForm = this.processForm.bind(this);
        this.checkPeriodsAvailable = this.checkPeriodsAvailable.bind(this);
        this.getBikesOnDB = this.getBikesOnDB.bind(this);
        this.checkPeriodsInBooking = this.checkPeriodsInBooking.bind(this);
        this.handleBackBtn = this.handleBackBtn.bind(this);
        this.createCheckbox = this.createCheckbox.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        this.removeBike = this.removeBike.bind(this);
        this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
        this.handleAlertShow = this.handleAlertShow.bind(this);
    }

    componentWillMount() {
        this.checkPeriodsAvailable();
        this.getBikesOnDB();
        Auth.setPeriod('');
        Auth.setBikeName('');
        Auth.setPickupDate('');
        Auth.setPickupTime('');
        this.selectedCheckboxes = new Set();
    }

    handleAlertDismiss() {
        this.setState({alertVisible: false});
    }

    handleAlertShow() {
        this.setState({alertVisible: true});
    }

    toggleCheckbox(label) {

        if (this.selectedCheckboxes.has(label)) {
            this.selectedCheckboxes.delete(label);
        } else {
            this.selectedCheckboxes.add(label);
        }
    }

    createCheckbox(label) {

        return <Checkbox
            label={label}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}

        />;
    }

    /**
     * This method will be executed after initial rendering.
     */
    componentDidMount() {

        window.scrollTo(0, 0);

        this._mounted = true;

        var bikeName = '';
        var bikePeriod = '';
        var userEmail = '';
        var messages = '';
        var messageChanged = false;
        var periodsAvailable = [];
        var selectedPeriod = '';

        if (Auth.isUserAuthenticated()) {
            userEmail = Auth.getUserEmail();
            bikeName = Auth.getBikeName();
        }

        bikePeriod = Auth.getPeriod();

        bikeName = Auth.getBikeName();

        this.handleBikeSelection(bikeName);

        this.handleSetPeriod();


        //TODO: Get all the periods available

        this.setState({
            periodsAvailable: null,
            booking: {
                name: bikeName,
                bikeperiod: bikePeriod,
                user: userEmail,
                messages: '',
                messageChanged: true
            }
        });
    }

    handleBackBtn() {
        this.setState({
            messageChanged: false,
            messages: ''
        });
    }

    componentWillUnmount() {
        /*
          Check if the component is mounted
          before set states
        */
        if (!this._mounted) {
            this.setState({
                isPeriodChecked: false,
                isBikeChecked: false,
            });

            this.checkPeriodsAvailable();
            this.getBikesOnDB();
        }

        let self = this;

        this._mounted = false;

        this.setState({
            lastPeriodClicked: self.state.lastPeriodClicked,
            termsCheckboxIsSelected: false
        });
    }

    handleChange(event, index, value) {
        this.setState({ value })
    }

    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        let terms = false;

        for (const checkbox of this.selectedCheckboxes) {
            terms =  true;
            this.setState({
                terms: terms
            });
        }

        const userid = localStorage.getItem('useremail');
        const periodid = localStorage.getItem('bikeperiod');
        const bikeid = localStorage.getItem('bike');
        const admincomment = document.getElementsByClassName('admincomment')[0];
        const pickuptime = localStorage.getItem('pickuptime');
        const pickupdate = localStorage.getItem('pickupdate');
        const usertype = Auth.getUserType();
        const value = admincomment !== undefined ? admincomment.value : "";

        const formData = `userid=${userid}&periodid=${periodid}&bikeid=${bikeid}&admincomment=${value}&usertype=${usertype}&pickuptime=${pickuptime}&pickupdate=${pickupdate}&terms=${terms}`;

        const self = this;

        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/auth/bikebooking');
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

                console.log("Message To the User : ", response.message);

                // change the component-container state
                this.setState({
                    messages: response.message,
                    messageChanged: response.success,
                    pickuptime: localStorage.getItem('pickuptime'),
                    pickupdate: localStorage.getItem('pickupdate'),
                    hasError: false,
                    isBookingComplete: response.isBookingComplete
                });

                console.log("This STATE : ", this.state);

                // save the token
                Auth.authenticateUser(response.token);

                Auth.setPeriod('');
                Auth.setBikeName('');
                Auth.setPickupTime('');
                Auth.setPickupDate('');

                //Does not work
                //this.props.router.replace("/message");

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



                this.setState({
                    messages: errors.summary,
                    messageChanged: true,
                    showErrorMsg: true,
                    errors,
                    hasError: true,
                    isBookingComplete: response.isBookingComplete
                });


            }
        });

        //Uncomment to send DATA to the DB
        xhr.send(formData);

    }

    handleSetPeriod(evt, value) {

        evt !== undefined ? evt.preventDefault() : null;

        var bg = document.getElementsByClassName("periodBtn");

        for (var j = 0, lenj = bg.length; j < lenj; j++) {
            if (bg[j].name === value) {
                if (bg[j].classList.length > 2) {
                    bg[j].classList.add("disabled");
                    return;
                } else {
                    for (var i = 0, leni = bg.length; i < leni; i++) {
                        if (bg[i].classList.length > 2) {
                            bg[i].classList.add("disabled");
                        } else {
                            bg[i].style.backgroundColor = '';
                        }
                    }

                    if (evt !== undefined && evt !== "null" && evt !== null) {
                        evt.target.style.backgroundColor = "rgba(68, 157, 68, .80)";
                    }

                    Auth.setPeriod(value);
                }
            }
        }
    }

    handleBikeSelection(evt) {

        let bikeSelected = evt !== null && evt.target !== undefined ? document.elementTarget = evt.target : null;

        const bikename = bikeSelected !== null ? bikeSelected.alt : evt;
        const bikeClass = bikeSelected !== null ? bikeSelected.className : 'bikeImg';
        const allBikes = document.getElementsByClassName('bikeImg');

        for (var i = 0, leni = allBikes.length; i < leni; i++) {
            var tempBike = allBikes[i];
            tempBike.children[0].style.opacity = 1;
        }

        if (bikeSelected !== null) {
            bikeSelected.style.opacity = 0.2;

            Auth.setBikeName(bikename);

            //Check if periods are available inside
            //the bikebooking table
            this.checkPeriodsInBooking();

            //Check if periods are available for this selected bike
            //inside the Period table
            this.checkPeriodsAvailable();

            this.setState({
                isBikeAvailable: true
            })
        } else {

            var bikes = document.getElementsByTagName("img");

            for (var i = 0, leni = bikes.length; i < leni; i++) {
                var tempBike = bikes[i];
                if (evt !== undefined && tempBike.alt === evt) {
                    tempBike.style.opacity = 0.2;
                }
            }
        }
    }

    checkPeriodsInBooking() {

        if (!this.state.isBookingPeriodChecked) {

            const self = this;

            // create an AJAX request
            const xhr = new XMLHttpRequest();
            xhr.open('post', '/auth/checkbookedperiod');
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

                    //TODO: Set the state of the periods available

                    self.setState({
                        bookingPeriodData: response
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

                    console.log("ERROR", response);

                }
            });

            xhr.send();

            if (!this._mounted) {
                this.setState({
                    isPeriodChecked: true,
                    bookingPeriodData: response
                });
            }
        }
    }

    checkPeriodsAvailable() {

        const self = this;

        const periodid = localStorage.getItem('bikeperiod');
        const bikeid = localStorage.getItem('bike');

        const formData = `periodid=${periodid}&bikeid=${bikeid}`;

        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/auth/checkperiod');
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

                self.setState({
                    periodData: response

                });

                /**************************************
                *
                *THIS PART IS TO DISABLE THE PERIOD BUTTONS
                *
                ***************************************/
                var periodBtn = document.getElementsByClassName("periodBtn");

                var invalidEntries = 0;

                function isString(obj) {
                    return obj !== undefined;
                }

                function filterByID(item) {

                    if (isString(item.periodid)) {

                        return true;
                    }
                    invalidEntries++;
                    return false;
                }

                var arrByID = response.bikebookning.filter(filterByID);


                for (var i = 0, leni = response.period.length; i < leni; i++) {

                    var tempperiod = response.period[i];
                    var total = 0;

                    if (periodBtn.length !== 0) {
                        periodBtn[i].classList.remove("disabled");
                        periodBtn[i].style.backgroundColor = "";
                    }

                    for (var j = 0, lenj = arrByID.length; j < lenj; j++) {

                        var tempbooking = arrByID[j];

                        if (tempbooking.periodid === tempperiod.periodname) {
                            total++;
                        }
                    }

                    if (response.bikeAmount.length !== 0) {
                        if (total === response.bikeAmount[0].amount) {
                            if(periodBtn[i] !== undefined){
                                periodBtn[i].classList.add("disabled");
                                periodBtn[i].style.backgroundColor = "rgba(20,25,22,0.35)";
                            }
                        }
                    }
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

                console.log("ERROR", response);

            }
        });

        xhr.send(formData);

        if (!this._mounted) {
            this.setState({
                isPeriodChecked: true
            });
        }
    }

    getBikesOnDB() {

        if (!this.state.isBikeChecked) {

            const self = this;

            // create an AJAX request
            const xhr = new XMLHttpRequest();
            xhr.open('post', '/auth/getbikes');
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

                    self.setState({
                        tilesData: response
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

                    console.log("ERROR", response);

                }
            });

            xhr.send();

            if (!this._mounted) {
                this.setState({
                    isBikeChecked: true,
                    //periodData: response
                });
            }
        }
    }

    handleSelectedOption(period, evt) {
        var arrPeriod = period;
        var myBikePeriod = '';

        for (var i = 0, leni = arrPeriod.length; i < leni; i++) {
            var tempID = arrPeriod[i].id;
            if (tempID === evt.target.id.split("option")[1]) {
                myBikePeriod = document.getElementById(evt.target.id).nextSibling.innerHTML;
            }
        }

        if (typeof evt === "string") {
            this.setState({
                optionSelected: evt,
                booking: {
                    bikeperiod: myBikePeriod
                }
            }, (index, value) => {
                //Excute something you want here after setState
            });
            Auth.setPeriod(myBikePeriod);
        } else {
            if (evt.target.nodeName === "INPUT") {
                var spanValue = evt.target.parentNode.children[1].value;
                var inputRadioBtn = evt.target.parentNode.children[0].value;

                this.setState({
                    optionSelected: evt.target.value,
                    booking: {
                        bikeperiod: myBikePeriod
                    }
                }, (index, value) => {
                    //Excute something you want here after setState
                });
                Auth.setPeriod(myBikePeriod);
            }
        }
    }

    removeBike(evt, bikebookingid) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        console.log("bikebookingid :", bikebookingid);

        const formData = `_id=${bikebookingid}`;

        const self = this;

        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/auth/removebike');
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

    /**
     * Render the component.
     * handleBackBtn={this.handleBackBtn}
     */
    render() {
        return (
            <BookingFormAll
                btnPeriodBg={this.state.btnPeriodBg}
                periodID={this.props.periodID}
                lastPeriodClicked={this.state.lastPeriodClicked}
                btnPeriodClicked={this.state.btnPeriodClicked}
                periodBtnState={this.state.periodBtnState}
                isPeriodChecked={this.state.isPeriodChecked}
                isBikeChecked={this.state.isBikeChecked}
                periodData={this.state.periodData}
                tilesData={this.state.tilesData}
                bookingPeriodData={this.state.bookingPeriodData}
                handleBikeSelection={this.handleBikeSelection}
                bikeActive={this.state.bikeActive}
                isBikeAvailable={this.state.isBikeAvailable}
                value={this.state.value}
                onSubmit={this.processForm}
                handleTimeChange={this.handleTimeChange}
                handleDateChange={this.handleDateChange}
                errors={this.state.errors}
                hasError={this.state.hasError}
                isBooking={this.state.isBooking}
                successMessage={this.state.successMessage}
                booking={this.state.booking}
                handleUserConfirmation={this.handleUserConfirmation}
                optionSelected={this.state.optionSelected}
                handleSetPeriod={this.handleSetPeriod}
                periodsAvailable={this.state.periodsAvailable}
                checkPeriodsInBooking={this.checkPeriodsInBooking}
                isBookingPeriodChecked={this.state.isBookingPeriodChecked}
                messageChanged={this.state.messageChanged}
                messages={this.state.messages}
                handleBackBtn={this.handleBackBtn}
                createCheckbox={this.createCheckbox}
                toggleCheckbox={this.toggleCheckbox}
                pickuptime={this.state.pickuptime}
                pickupdate={this.state.pickupdate}
                isBookingComplete={this.state.isBookingComplete}
                removeBike={this.removeBike}
                handleAlertDismiss={this.handleAlertDismiss}
                handleAlertShow={this.handleAlertShow}
                alertVisible={this.state.alertVisible}
            />
        );
    }
}

export default BookingPage;

import React from 'react';
import Auth from '../modules/Auth';
import SortFilter from '../components/SortFilter.jsx';
import PropTypes from 'prop-types';

// Set initial state
let state = {
    filterresult: null,
};

class SortFilterPage extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        // Retrieve the last state
        this.state = state;

        this.getBookings = this.getBookings.bind(this);
        this.sortTable = this.sortTable.bind(this);
    }

    componentDidMount() {
      this.getBookings();
    }

    getBookings() { //In this case the userid is the email address

        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/auth/adminprofile');
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


                console.log("Sort Filter Page getBookings response : ", response.result);


                if (Auth.isAdminUserAuthenticated() && localStorage.getItem("usertype") === "admin") {

                    for (var i = 0, leni = response.result.booking.length; i < leni; i++) {
                        for (var j = 0, lenj = response.result.user.length; j < lenj; j++) {

                            if (response.result.booking[i].userid === response.result.user[j].email) {
                                response.result.booking[i].name = response.result.user[j].name;
                                response.result.booking[i].phone = response.result.user[j].phone;
                                response.result.booking[i].address = response.result.user[j].address;
                                response.result.booking[i].city = response.result.user[j].city;
                            }
                        }
                    }

                    console.log("response.result.booking : ", response.result.booking);

                    // change the component-container state
                    this.setState({
                        filterresult: response.result.booking
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

    sortTable(n) {
      var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
      table = document.getElementById("myTable");
      switching = true;
      //Set the sorting direction to ascending:
      dir = "asc";
      /*Make a loop that will continue until
      no switching has been done:*/
      while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByClassName("row");
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
          //start by saying there should be no switching:
          shouldSwitch = false;
          /*Get the two elements you want to compare,
          one from current row and one from the next:*/
          x = rows[i].getElementsByClassName("col-md-3")[n];
          y = rows[i + 1].getElementsByClassName("col-md-3")[n];
          /*check if the two rows should switch place,
          based on the direction, asc or desc:*/
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch= true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch= true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          /*If a switch has been marked, make the switch
          and mark that a switch has been done:*/
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          //Each time a switch is done, increase this count by 1:
          switchcount ++;
        } else {
          /*If no switching has been done AND the direction is "asc",
          set the direction to "desc" and run the while loop again.*/
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    }

    /**
     * Render the component.
     */
    render() {
        return (
            <SortFilter
                filterresult={this.state.filterresult}
                getBookings={this.getBookings}
                sortTable={this.sortTable}

            />
        );
    }
}

export default SortFilterPage;

class Auth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateAdminUser(token) {
    localStorage.setItem('usertype', token);
  }

  static isAdminUserAuthenticated() {
    return localStorage.getItem('usertype') !== null;
  }

  /**
   * Deauthenticate a AdminUser. Remove a token from Local Storage.
   * Remove all from localStorage
   *
   */
  static deauthenticateAdminUser() {
    localStorage.removeItem('usertype');
    localStorage.clear();
  }

  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   * Remove all from localStorage
   *
   */
  static deauthenticateUser() {
    localStorage.removeItem('token');
    localStorage.clear();
  }
  
  static setVerifyUser(isverified) {
    localStorage.setItem('isverified', isverified);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserVerified() {
    return localStorage.getItem('isverified') !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   * Remove all from localStorage
   *
   */
  static deverifyUser() {
    localStorage.removeItem('isverified');
    localStorage.clear();
  }

  /**
   * @returns {string}
   */
  static getToken() {
    return localStorage.getItem('token');
  }

  static setPeriod(evt) {
    localStorage.setItem('bikeperiod', evt);
  }

  static getPeriod() {
    return localStorage.getItem('bikeperiod');
  }

  static setBikeName(evt) {
    localStorage.setItem('bike', evt);
  }

  static getBikeName() {
    return localStorage.getItem('bike');
  }

  static setUserEmail(evt) {
    localStorage.setItem('useremail', evt);
  }

  static getUserEmail() {
    return localStorage.getItem('useremail');
  }

  static setUserName(username) {
    localStorage.setItem('name', username);
  }

  static getUserName() {
    return localStorage.getItem('name');
  }

}

export default Auth;

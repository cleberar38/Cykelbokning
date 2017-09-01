import Base from './components/Base.jsx';
import HomePageForm from './components/HomePageForm.jsx';
import BookingPage from './containers/BookingPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import Auth from './modules/Auth';
import HomePage from './containers/HomePage.jsx';
import MessagesToUserPage from './containers/MessagesToUserPage.jsx';
import PeriodPage from './containers/PeriodPage.jsx';

const routes = {
  // Base component (wrapper for the whole application).
  component: Base,
  childRoutes: [
    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, BookingPage);
        } else {
          callback(null, BookingPage);
        }
      }
    },

    {
      path: '/booking',
      component: BookingPage
    },

    {
      path: '/login',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, BookingPage);
        } else {
          callback(null, LoginPage);
        }
      }
    },

    {
      path: '/signup',
      component: SignUpPage
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();
        localStorage.clear();

        // change the current URL to /
        replace('/');
      }
    },

    {
      path: '/booking',
      component: BookingPage
    },

    {
      path: '/message',
      component: MessagesToUserPage
    },

    {
      path: '/createperiod',
      getComponent: (location, callback) => {
        if (Auth.isAdminUserAuthenticated()) {
          callback(null, PeriodPage);
        } else {
          callback(null, PeriodPage);
        }
      }
    }

  ]
};

export default routes;

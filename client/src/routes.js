import Base from './components/Base.jsx';
import HomePageForm from './components/HomePageForm.jsx';
import BookingPage from './containers/BookingPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import Auth from './modules/Auth';
import HomePage from './containers/HomePage.jsx';
import MessagesToUserPage from './containers/MessagesToUserPage.jsx';
import PeriodPage from './containers/PeriodPage.jsx';
import ConfirmationPage from './containers/ConfirmationPage.jsx';
import ProfilePage from './containers/ProfilePage.jsx';
import AddBikePage from './containers/AddBikePage.jsx';
import ProfileMessagesPage from './containers/ProfileMessagesPage.jsx';
import UsersPage from './containers/UsersPage.jsx';
import SortFilterPage from './containers/SortFilterPage.jsx';
import ForgotPasswordPage from './containers/ForgotPasswordPage.jsx';


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
            if (Auth.isUserVerified) {
                callback(null, BookingPage);
            } else {
                callback(null, ConfirmationPage);
            }
        }else {
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
        path: '/profilemsg',
        component: ProfileMessagesPage
    },

    {
      path: '/confirmation',
      component: ConfirmationPage
    },

    {
      path: '/addbike',
      getComponent: (location, callback) => {
        if (Auth.isAdminUserAuthenticated()) {
          callback(null, AddBikePage);
        } else {
          callback(null, AddBikePage);
        }
      }
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
    },

    {
        path: '/users',
        getComponent: (location, callback) => {
            if (Auth.isAdminUserAuthenticated()) {
                callback(null, UsersPage);
            } else {
                callback(null, BookingPage);
            }
        }
    },

    {
        path: '/sort',
        getComponent: (location, callback) => {
            if (Auth.isAdminUserAuthenticated()) {
                callback(null, SortFilterPage);
            } else {
                callback(null, BookingPage);
            }
        }
    },

    {
      path: '/profil',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, ProfilePage);
        } else {
          callback(null, LoginPage);
        }
      }
    },
    {
      path: '/forgot',
      component: ForgotPasswordPage
    }

  ]
};

export default routes;

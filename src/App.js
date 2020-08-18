import React from "react";
import "./App.css";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Index from "./components/layout/Index";
import Signup from "./components/authentication/form/Signup";
import Login from "./components/authentication/form/Login";
import UserDashboard from "./components/dashboard/layout/UserDashboard";
import jwt_decode from "jwt-decode";
import setToken from "./securityUtils/setToken";
import { SET_CURRENT_USER } from "./actions/Types";
import { logout } from "./actions/SecurityActions";
import SecureRoute from "./securityUtils/SecureRoute";
import ViewPost from "./components/dashboard/post/ViewPost";
import Comment from "./components/dashboard/comment/Comment";
import LoadingIndicator from "./components/utils/LoadingIndicator";
import About from "./components/info/About";
import Password from "./components/dashboard/setting/Password";
import EditDetails from "./components/dashboard/setting/EditDetails";
import Contact from "./components/info/Contact";
import { NotificationContainer } from "react-notifications";
import SearchBar from "./components/layout/SearchBar";
import ForgotPassword from "./components/authentication/form/ForgotPassword";
import ResetPassword from "./components/authentication/form/ResetPassword";
import Followers from "./components/dashboard/user/Followers";
import Following from "./components/dashboard/user/Following";

const userDetails = JSON.parse(localStorage.getItem("userDetails"));
if (userDetails != null) {
  setToken(userDetails.token);
  const decodedToken = jwt_decode(userDetails.token);

  store.dispatch({
    type: SET_CURRENT_USER,
    payload: userDetails,
  });

  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div>
            <Nav />
            <LoadingIndicator />
            <NotificationContainer />
            <SearchBar />
            <Switch>
              {
                // Public Routes
              }
              <Route exact path="/" component={Index} />
              <Route exact path="/account/sign_up" component={Signup} />
              <Route exact path="/account/login" component={Login} />
              <Route
                exact
                path="/account/password/forgot"
                component={ForgotPassword}
              />
              <Route
                exact
                path="/account/password/reset"
                component={ResetPassword}
              />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact" component={Contact} />
              {
                // Private Routes
              }
              <SecureRoute exact path="/" component={Index} />
              <SecureRoute exact path="/:username" component={UserDashboard} />
              <SecureRoute
                exact
                path="/:username/followers"
                component={Followers}
              />
              <SecureRoute
                exact
                path="/:username/following"
                component={Following}
              />
              <SecureRoute exact path="/post/:postId" component={ViewPost} />
              <SecureRoute
                exact
                path="/post/:postId/comments"
                component={Comment}
              />
              <SecureRoute
                exact
                path="/account/edit_details"
                component={EditDetails}
              />
              <SecureRoute
                exact
                path="/account/password"
                component={Password}
              />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;

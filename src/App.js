import React from 'react';
import './App.css';
import Nav from './components/Layout/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Index from './components/Layout/Index';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import UserDashboard from './components/User/UserDashboard';
import jwt_decode from 'jwt-decode';
import setToken from './securityUtils/setToken';
import { SET_CURRENT_USER } from './actions/Types';
import { logout } from './actions/SecurityActions';
import SecureRoute from './securityUtils/SecureRoute';
import ViewPost from './components/Post/ViewPost';
import Comment from './components/Comment/Comment';

const userDetails = JSON.parse(localStorage.getItem("userDetails"))
if (userDetails != null) {
  setToken(userDetails.token)
  const decodedToken = jwt_decode(userDetails.token)

  store.dispatch({
    type:SET_CURRENT_USER,
    payload:userDetails
  })

  const currentTime =  Date.now() / 1000  
  if (decodedToken.exp < currentTime) {
    store.dispatch(logout())
    window.location.href = "/"
  }

}

function App() {  
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Nav />
          {
            // Public Routes
          }
          <Route exact path="/" component={Index} />
          <Route exact path="/account/sign_up" component={Signup} />
          <Route exact path="/account/login" component={Login} />

          {
            // Private Routes
          }  
          <Switch>
            <SecureRoute exact path="/:username" component={UserDashboard} />
            <SecureRoute exact path="/post/:postId" component={ViewPost} />
            <SecureRoute exact path="/post/:postId/comments" component={Comment} />
          </Switch>        
        </div>
      </Router>
    </Provider>    
  );
}

export default App;

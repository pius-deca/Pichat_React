import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../actions/SecurityActions';
import { connect } from 'react-redux';

class Nav extends Component{  
  render(){ 
    const logout= () => {      
      this.props.logout()
      window.location.href ="/"
    } 

    const{ validToken, user } = this.props.security  
  
    const guestUser = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/account/sign_up">
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/account/login">
              Login
            </Link>
          </li>
        </ul>
      </div>  
    )

    const userIsAuthenticated = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item"> 
            <Link className="nav-link" to={`/${user.username}`}>
              <i className="fa fa-user-circle mr-1" />@{user.username}
            </Link> 
          </li>
          <div className="dropdown">
            <span className="btn " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Setting
            </span>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <Link className="dropdown-item" to="/bio">
                Bio
              </Link>
              <Link className="dropdown-item" to="/logout" onClick={logout}>
                Logout
              </Link>
            </div>
          </div>
        </ul>
      </div>  
    )
    
    let headerLinks;
    let brandRoute;
    if (validToken && user) {
      headerLinks = userIsAuthenticated
      if (user.isActive) {
        brandRoute = "/"
      }else{        
        brandRoute = `/${user.username}`
      }
    }else {
      headerLinks = guestUser
    }

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-secondary mb-4">
        <div className="container">
          <Link className="navbar-brand" to={brandRoute}>
            PiChat
          </Link>
          { headerLinks }                                
        </div>
      </nav>            
    )
  }
}

Nav.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
  security: state.security
})

export default connect(
  mapStateToProps, 
  {logout}
  )(Nav); 
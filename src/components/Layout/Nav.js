import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../../actions/SecurityActions";
import { connect } from "react-redux";

class Nav extends Component {
  render() {
    const { validToken, user } = this.props.security;
    const { isActive } = this.props.user;

    const signout = () => {
      this.props.logout();
      window.location.href = "/";
    };

    const profileClick = () => {
      window.location.href = `/${user.username}`;
    };

    const signup = () => {
      window.location.href = "/account/sign_up";
    };

    const login = () => {
      window.location.href = "/account/login";
    };

    const dropdownUser = (
      <div>
        <Link className="dropdown-item" to="/account/edit_details">
          Edit account details
        </Link>
        <Link className="dropdown-item" to="/account/password">
          Password
        </Link>
        <Link className="dropdown-item" to="/logout" onClick={signout}>
          Log out
        </Link>
      </div>
    );

    const guestUser = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/account/sign_up" onClick={signup}>
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/account/login" onClick={login}>
              Login
            </Link>
          </li>
        </ul>
      </div>
    );

    const userIsAuthenticated = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link
              className="nav-link"
              to={`/${user.username}`}
              onClick={profileClick}
            >
              <i className="fa fa-user-circle mr-1" />@{user.username}
            </Link>
          </li>
          <div className="dropdown nav-item">
            <span
              className="nav-link"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-cog"></i> Settings
            </span>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {dropdownUser}
            </div>
          </div>
        </ul>
      </div>
    );

    let headerLinks;
    let brandRoute;
    if (validToken && user) {
      headerLinks = userIsAuthenticated;
      if (isActive) {
        brandRoute = "/";
      } else {
        brandRoute = `/${user.username}`;
      }
    } else {
      headerLinks = guestUser;
      brandRoute = "/";
    }

    const brandClick = () => {
      if (isActive) {
        brandRoute = "/";
      } else {
        brandRoute = `/${user.username}`;
      }
    };

    return (
      <nav className="navbar navbar-expand-md navbar-dark black">
        <div className="container">
          <Link className="navbar-brand" to={brandRoute} onClick={brandClick}>
            PiChat
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
            aria-controls="mobile-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {headerLinks}
        </div>
      </nav>
    );
  }
}

Nav.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
  user: state.user,
});

export default connect(mapStateToProps, { logout })(Nav);

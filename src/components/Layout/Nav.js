import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../../actions/SecurityActions";
import { connect } from "react-redux";
import brand from "../../images/logo_size.jpg";

class Nav extends Component {
  render() {
    const { validToken, user } = this.props.security;
    const { isActive } = this.props.user;

    const signout = (e) => {
      this.props.logout(e.target.name);
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
        <Link
          className="dropdown-item black-text font-weight-bold"
          to="/account/edit_details"
        >
          Edit account details
        </Link>
        <div className="dropdown-divider"></div>
        <Link
          className="dropdown-item black-text font-weight-bold"
          to="/account/password"
        >
          Password
        </Link>
        <div className="dropdown-divider"></div>
        <Link
          className="dropdown-item black-text font-weight-bold"
          to="/logout"
          onClick={signout}
          name={user.username}
        >
          Log out
        </Link>
      </div>
    );

    const guestUser = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link
              className="nav-link black-text font-weight-bold"
              to="/account/sign_up"
              onClick={signup}
            >
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link black-text font-weight-bold"
              to="/account/login"
              onClick={login}
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    );

    const notify = (e) => {};

    const userIsAuthenticated = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link
              className="nav-link black-text font-weight-bold"
              to={`/${user.username}`}
              onClick={profileClick}
            >
              <i className="fa fa-user-circle mr-1" />@{user.username}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link black-text font-weight-bold"
              to="/notifications"
              onClick={notify}
            >
              <i className="fa fa-bell mr-1" aria-hidden="true" />
              Notification
              <span className="blue notify-icon ml-1 px-2 py-1">0</span>
            </Link>
          </li>
          <div className="dropdown nav-item">
            <span
              className="nav-link black-text font-weight-bold"
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
      <nav className="navbar navbar-expand-md navbar-light bg-light p-0">
        <div className="container">
          <Link
            className="navbar-brand m-0 p-0"
            to={brandRoute}
            onClick={brandClick}
          >
            <div className="nav-layered">
              <img src={brand} width="100" height="80" />
            </div>
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

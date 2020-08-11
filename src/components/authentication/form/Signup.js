import React, { Component } from "react";
import { Link } from "react-router-dom";
import { createNewUser } from "../../../actions/SecurityActions";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { trackPromise } from "react-promise-tracker";

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    };
    trackPromise(this.props.createNewUser(newUser, this.props.history));
  }

  render() {
    const { errors } = this.props.security;

    const login = () => {
      window.location.href = "/account/login";
    };

    // const error = (
    //   <div className="alert alert-warning text-center" role="alert">{errors.message}</div>
    // )

    // const isError = errors.message ? error : ""

    return (
      <div className="signup">
        <div className="container">
          <div className="row py-5 px-3">
            <div className="col-lg-6 col-md-9 col-sm-12 m-auto card p-5">
              <h4 className="text-center black-text">
                Sign up to see photos and videos from people all over the world.
              </h4>
              {errors && (
                <p className="text-center m-0  mt-2 p-2 red-text">
                  {errors.exception}
                </p>
              )}
              <form onSubmit={this.onSubmit}>
                <div className="md-form">
                  <i className="fa fa-user prefix grey-text py-2"></i>
                  <input
                    autoComplete="off"
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.firstName,
                    })}
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.onChange}
                    placeholder="First Name"
                  />
                  {errors && (
                    <div className="invalid-feedback text-left pl-5">
                      {errors.firstName}
                    </div>
                  )}
                </div>
                <div className="md-form">
                  <i className="fa fa-user prefix grey-text py-2"></i>
                  <input
                    autoComplete="off"
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.lastName,
                    })}
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.onChange}
                    placeholder="Last Name"
                  />
                  {errors && (
                    <div className="invalid-feedback text-left pl-5">
                      {errors.lastName}
                    </div>
                  )}
                </div>
                <div className="md-form">
                  <i className="fa fa-envelope prefix grey-text py-2"></i>
                  <input
                    autoComplete="on"
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email,
                    })}
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    placeholder="Email address"
                  />
                  {errors && (
                    <div className="invalid-feedback text-left pl-5">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="md-form">
                  <i className="fa fa-user prefix grey-text py-2"></i>
                  <input
                    autoComplete="off"
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.username,
                    })}
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                    placeholder="Username"
                  />
                  {errors && (
                    <div className="invalid-feedback text-left pl-5">
                      {errors.username}
                    </div>
                  )}
                </div>
                <div className="md-form">
                  <i className="fa fa-lock prefix grey-text py-2"></i>
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password,
                    })}
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    placeholder="Password"
                  />
                  {errors && (
                    <div className="invalid-feedback text-left pl-5">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="">
                  <div className="row d-flex justify-content-center">
                    <div className="col-lg-6">
                      <input
                        type="submit"
                        value="Create Account"
                        className="btn btn-lg btn-success btn-block p-2"
                      />
                    </div>
                  </div>
                  <div className="text-center pt-3">
                    <p>
                      Have an account?
                      <Link
                        to="/account/login"
                        className="blue-text ml-1"
                        onClick={login}
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, { createNewUser })(Signup);

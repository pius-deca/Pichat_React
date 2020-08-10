import React, { Component } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../../actions/SecurityActions";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { trackPromise } from "react-promise-tracker";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      identifier: "",
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
    const LoginRequest = {
      identifier: this.state.identifier,
      password: this.state.password,
    };
    trackPromise(this.props.loginUser(LoginRequest, this.props.history));
    this.setState({
      [e.target.name]: "",
    });
  }

  render() {
    const { errors } = this.props.security;

    const signup = () => {
      window.location.href = "/account/sign_up";
    };

    const forgot = () => {
      window.location.href = "/account/password/forgot";
    };

    return (
      <div className="login">
        <div className="container">
          <div className="row py-5 px-3">
            <div className="col-md-9 col-sm-12 m-auto card p-4">
              <h3 className="text-center black-text">Login here</h3>
              {errors && (
                <p className="text-center m-0  mt-2 p-2 red-text">
                  {errors.exception}
                </p>
              )}
              <div className="d-flex align-self-end">
                <Link
                  to="/account/password/forgot"
                  className="blue-text m-0"
                  onClick={forgot}
                >
                  forgot password?
                </Link>
              </div>
              <form onSubmit={this.onSubmit}>
                <div className="md-form">
                  <i className="fa fa-envelope prefix grey-text py-2"></i>
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.identifier,
                    })}
                    name="identifier"
                    value={this.state.identifier}
                    onChange={this.onChange}
                    placeholder="Email or Username"
                  />
                  {errors && (
                    <div className="invalid-feedback text-left pl-5">
                      {errors.identifier}
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
                <div className="row d-flex justify-content-between pt-2">
                  <div className="col-md-4 col-lg-4">
                    <input
                      type="submit"
                      value="log in"
                      className="btn btn-lg btn-success btn-block p-3"
                    />
                  </div>
                  <div className="col-md-8 pt-3">
                    <p>
                      Don't have an account?
                      <Link
                        to="/account/sign_up"
                        className="blue-text ml-1"
                        onClick={signup}
                      >
                        Sign up
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, { loginUser })(Login);

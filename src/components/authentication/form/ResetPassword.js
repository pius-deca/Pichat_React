import React, { Component } from "react";
import { resetPass } from "../../../actions/SecurityActions";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { trackPromise } from "react-promise-tracker";
import { createNotification } from "../../utils/Notifications";
import queryString from "query-string";

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      confirmPassword: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getTokenFromQuery() {
    const params = queryString.parse(this.props.location.search);
    const token = params.token;
    return token;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const token = this.getTokenFromQuery();
    const ResetPasswordRequest = {
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    trackPromise(this.props.resetPass(ResetPasswordRequest, token));
    this.setState({
      password: "",
      confirmPassword: "",
    });
  }

  componentWillUpdate(nextProps) {
    const { message } = nextProps.message;
    if (message) {
      createNotification("success", message);
    }
  }

  render() {
    const { errors } = this.props.security;

    return (
      <div className="login">
        <div className="container">
          <div className="row py-5 px-3">
            <div className="col-lg-6 col-md-9 col-sm-12 m-auto card p-4">
              <h3 className="diaplay-4 text-center black-text">
                Reset Password
              </h3>
              <p className="diaplay-4 text-center black-text pt-3 m-0">
                Enter your new password and confirm the password
              </p>
              <br />
              <form onSubmit={this.onSubmit}>
                <div className="md-form">
                  <i className="fa fa-envelope prefix grey-text py-2"></i>
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors,
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
                <div className="md-form">
                  <i className="fa fa-envelope prefix grey-text py-2"></i>
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors,
                    })}
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                    placeholder="Confirm Password"
                  />
                  {errors && (
                    <div className="invalid-feedback text-left pl-5">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
                <div className="row d-flex justify-content-center pt-2">
                  <div className="col-lg-6">
                    <input
                      type="submit"
                      value="Reset Password"
                      className="btn btn-lg btn-block btn-success p-2"
                    />
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

ResetPassword.propTypes = {
  resetPass: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  message: state.message,
  security: state.security,
});

export default connect(mapStateToProps, { resetPass })(ResetPassword);

import React, { Component } from "react";
import { forgotPass } from "../../../actions/SecurityActions";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { trackPromise } from "react-promise-tracker";
import { createNotification } from "../../utils/Notifications";

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      identifier: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const forgotPasswordRequest = {
      identifier: this.state.identifier,
    };
    trackPromise(this.props.forgotPass(forgotPasswordRequest));
    this.setState({
      identifier: "",
    });
  }

  componentWillReceiveProps(nextProps) {
    const { message } = nextProps.message;
    if (message) {
      createNotification("success", message);
      this.props.message.message = "";
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
                Forgot Password?
              </h3>
              <p className="diaplay-4 text-center black-text pt-3 m-0">
                Enter your username or email and we'll send you a link to get
                back into your account.
              </p>
              {errors && (
                <p className="text-center m-0 mt-2 p-2 red-text">
                  {errors.exception}
                </p>
              )}
              <form onSubmit={this.onSubmit}>
                <div className="md-form">
                  <i className="fa fa-envelope prefix black-text py-2"></i>
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
                <div className="row d-flex justify-content-center pt-2">
                  <div className="col-lg-6">
                    <input
                      type="submit"
                      value="Send Password Reset Link"
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

ForgotPassword.propTypes = {
  forgotPass: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  message: state.message,
  security: state.security,
});

export default connect(mapStateToProps, { forgotPass })(ForgotPassword);

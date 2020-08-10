import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchUser, changePassword } from "../../../actions/UserActions";
import { trackPromise } from "react-promise-tracker";
import { createNotification } from "../../utils/Notifications";

class Password extends Component {
  constructor() {
    super();

    this.state = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillUpdate(nextProps) {
    const { message } = nextProps.message;
    if (message) {
      createNotification("success", message);
      this.setState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      this.props.message.message = "";
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const request = {
      currentPassword: this.state.currentPassword,
      newPassword: this.state.newPassword,
      confirmPassword: this.state.confirmPassword,
    };
    trackPromise(this.props.changePassword(request));
    this.setState({ [e.target.name]: "" });
  }

  render() {
    const { user } = this.props.security;
    const { errors } = this.props.errors;

    const error = (
      <div>
        {errors.exception && (
          <div className="alert alert-warning text-center mt-5" role="alert">
            {errors.exception}
          </div>
        )}
      </div>
    );

    const isError = errors ? error : "";

    const back = (e) => {
      e.preventDefault();
      window.location.href = `/${user.username}`;
    };

    const userAccount = (
      <div className="">
        <form className="md-form" onSubmit={this.onSubmit}>
          <div className="row justify-content-between m-0">
            <button className="btn btn-outline-danger" onClick={back}>
              <strong>Back</strong>
            </button>
            <span className="pt-3">
              <strong>Change Password</strong>
            </span>
            <input
              type="submit"
              value="Save"
              className="btn btn-outline-success"
            />
          </div>
          {isError}
          <div className="row py-5">
            <div className="col-md-8 card m-auto">
              <div className="py-3">
                <div className="md-form">
                  <label className="font-weight-bold">Password</label>
                  <br />
                  <br />
                  <div>
                    <i className="fa fa-lock prefix grey-text mt-5"></i>
                    <input
                      autoComplete="off"
                      type="password"
                      className={classnames(
                        "form-control form-control-lg p-0",
                        {
                          "is-invalid": errors.currentPassword,
                        }
                      )}
                      placeholder="Current Password"
                      onChange={this.onChange}
                      value={this.state.currentPassword}
                      name="currentPassword"
                    />
                    {errors && (
                      <div className="invalid-feedback text-left pl-5">
                        {errors.currentPassword}
                      </div>
                    )}
                  </div>
                </div>
                <div className="md-form">
                  <label className="font-weight-bold">New Password</label>
                  <br />
                  <br />
                  <div>
                    <i className="fa fa-lock prefix grey-text mt-5"></i>
                    <input
                      autoComplete="off"
                      type="password"
                      className={classnames(
                        "form-control form-control-lg p-0",
                        {
                          "is-invalid": errors.newPassword,
                        }
                      )}
                      placeholder="New Password"
                      onChange={this.onChange}
                      value={this.state.newPassword}
                      name="newPassword"
                    />
                    {errors && (
                      <div className="invalid-feedback text-left pl-5">
                        {errors.newPassword}
                      </div>
                    )}
                  </div>
                </div>
                <div className="md-form">
                  <label className="font-weight-bold">Confirm Password</label>
                  <br />
                  <br />
                  <div>
                    <i className="fa fa-lock prefix grey-text mt-5"></i>
                    <input
                      autoComplete="off"
                      type="password"
                      className={classnames(
                        "form-control form-control-lg p-0",
                        {
                          "is-invalid": errors.confirmPassword,
                        }
                      )}
                      placeholder="Confirm Password"
                      onChange={this.onChange}
                      value={this.state.confirmPassword}
                      name="confirmPassword"
                    />
                    {errors && (
                      <div className="invalid-feedback text-left pl-5">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );

    return <div className="container">{userAccount}</div>;
  }
}

Password.propTypes = {
  searchUser: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  security: state.security,
  errors: state.errors,
  message: state.message,
});

export default connect(mapStateToProps, { searchUser, changePassword })(
  Password
);

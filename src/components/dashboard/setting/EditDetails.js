import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  isUserActive,
  searchUser,
  addBio,
  userBio,
  updateAccountDetails,
  getProfilePic,
  uploadProfilePic,
  removeProfilePic,
} from "../../../actions/UserActions";
import { trackPromise } from "react-promise-tracker";
import { createNotification } from "../../utils/Notifications";
import CountryField from "./form/fields/CountryField";
import GenderField from "./form/fields/GenderField";
import IntlTelInput from "react-intl-tel-input";

class EditDetails extends Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      dob: "",
      description: "About me",
      phone: "",
      gender: "",
      country: "",
    };

    this.onChange = this.onChange.bind(this);
    this.account = this.account.bind(this);
    this.personnalInfo = this.personnalInfo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { searchedUser, bio } = nextProps.user;
    const { firstName, lastName, email, username } = searchedUser;
    this.setState({
      firstName,
      lastName,
      email,
      username,
    });

    const { dob, description, phone, gender, country } = bio;
    const date = dob !== undefined && dob.split("T")[0];
    this.setState({
      dob: date,
      description,
      phone,
      gender,
      country,
    });
    const { message } = nextProps.message;
    if (message) {
      createNotification("success", message);
      this.props.message.message = "";
    }
  }

  componentDidMount() {
    const { username } = this.props.security.user;
    this.props.isUserActive();
    this.props.searchUser(username);
    this.props.userBio();
    this.props.getProfilePic();
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  account(e) {
    e.preventDefault();
    const request = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      username: this.state.username,
    };
    trackPromise(this.props.updateAccountDetails(request, this.props.history));
  }

  personnalInfo(e) {
    e.preventDefault();
    const request = {
      dob: this.state.dob,
      description: this.state.description,
      phone: this.state.phone,
      gender: this.state.gender,
      country: this.state.country,
    };

    console.log(request);
    trackPromise(this.props.addBio(request));
  }

  render() {
    const { user } = this.props.security;
    const { searchedUser } = this.props.user;
    const { errors } = this.props.errors;

    const uploadPic = (e) => {
      const request = e.target.files[0];
      const formData = new FormData();
      formData.append("file", request);
      trackPromise(this.props.uploadProfilePic(formData));
      // this.setState({ loading: false });
    };

    const removePic = (e) => {
      const pic = searchedUser.profilePic.profilePic;
      e.preventDefault();
      trackPromise(this.props.removeProfilePic(pic));
    };

    const uploadProfile = (
      <div className="file-field pt-3">
        <input
          type="file"
          name="profilePic"
          id="file"
          className="inputfile"
          accept="image/*"
          onChange={uploadPic}
        />
        <button className="btn btn-primary">
          <label htmlFor="file" className="m-0">
            Upload profile
          </label>
        </button>
      </div>
    );

    const changProfile = (
      <div className="pt-3">
        <input
          type="file"
          name="profilePic"
          id="file"
          className="inputfile"
          accept="image/*"
          onChange={uploadPic}
        />
        <button className="btn btn-primary">
          <label htmlFor="file" className="m-0">
            Change profile
          </label>
        </button>
      </div>
    );

    const customPlaceholder = (
      selectedCountryPlaceholder,
      selectedCountryData
    ) => {
      return "e.g. " + selectedCountryPlaceholder;
    };

    const removeProfile = (
      <div className="pt-3">
        <button className="btn btn-danger" onClick={removePic}>
          Remove profile
        </button>
      </div>
    );

    const changeOrRemove = (
      <div className="d-flex justify-content-center">
        {changProfile}
        {removeProfile}
      </div>
    );

    const defaultPic =
      "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg";

    const src = (pic) => {
      if (pic != null) {
        return pic.url;
      }
      return defaultPic;
    };

    const displayProfile =
      searchedUser.profilePic === null ? uploadProfile : changeOrRemove;

    const userAccount = (
      <div className="">
        <div className="row justify-content-between m-0">
          <button
            className="btn btn-outline-danger"
            onClick={() => (window.location.href = `/${user.username}`)}
          >
            <strong>Back</strong>
          </button>
          <span className="pt-3">
            <strong>Edit Account</strong>
          </span>
        </div>
        <div className="mx-auto py-4">
          <div className="avatar text-center">
            <img
              src={src(searchedUser.profilePic)}
              alt="avatar"
              className="rounded-circle z-depth-1-half avatar-pic"
            />
            {displayProfile}
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 m-auto card">
            <form className="md-form" onSubmit={this.account}>
              <div>
                <h4 className="text-center">Account Information</h4>
              </div>
              <div className="md-form">
                <label className="font-weight-bold">First name</label>
                <br />
                <br />
                <div>
                  <i className="fa fa-user prefix grey-text mt-5"></i>
                  <input
                    autoComplete="off"
                    type="text"
                    className={classnames("form-control form-control-lg p-0", {
                      "is-invalid": "",
                    })}
                    placeholder="First Name"
                    value={this.state.firstName}
                    onChange={this.onChange}
                    name="firstName"
                    id="formFirstname"
                  />
                </div>
              </div>
              <div className="md-form">
                <label className="font-weight-bold">Last name</label>
                <br />
                <br />
                <div>
                  <i className="fa fa-user prefix grey-text mt-5"></i>
                  <input
                    autoComplete="off"
                    type="text"
                    className={classnames("form-control form-control-lg p-0", {
                      "is-invalid": "",
                    })}
                    placeholder="Last Name"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.onChange}
                    id="formLastname"
                  />
                </div>
              </div>
              <div className="md-form">
                <label className="font-weight-bold">Email</label>
                <br />
                <br />
                <div>
                  <i className="fa fa-envelope prefix grey-text mt-5"></i>
                  <input
                    autoComplete="on"
                    type="text"
                    className={classnames("form-control form-control-lg p-0", {
                      "is-invalid": "",
                    })}
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    id="formEmail"
                  />
                </div>
              </div>
              <div className="md-form">
                <label className="font-weight-bold">Username</label>
                <br />
                <br />
                <div>
                  <i className="fa fa-user prefix grey-text mt-5"></i>
                  <input
                    autoComplete="off"
                    type="text"
                    className={classnames("form-control form-control-lg p-0", {
                      "is-invalid": "",
                    })}
                    placeholder="Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                    id="formUsername"
                  />
                </div>
              </div>
              <div className="row d-flex justify-content-center pt-2">
                <div className="col-md-4 col-lg-4">
                  <input
                    type="submit"
                    className="btn btn-block btn-success p-3"
                  />
                </div>
              </div>
            </form>
            <form className="md-form" onSubmit={this.personnalInfo}>
              <div>
                <h4 className="text-center">Personnal Information</h4>
              </div>
              {errors && (
                <p className="m-0 mt-2 red-text text-center">{errors}</p>
              )}
              <div className="md-form">
                <label className="font-weight-bold">About</label>
                <br />
                <br />
                <div>
                  <i className="fa fa-pencil-square-o prefix grey-text mt-5"></i>
                  <div className="ml-5">
                    <textarea
                      autoComplete="off"
                      type="text"
                      className="md-textarea form-control form-control-lg p-0"
                      name="description"
                      value={this.state.description || ""}
                      onChange={this.onChange}
                      cols="20"
                      rows="3"
                      id="formDes"
                    />
                  </div>
                </div>
              </div>
              <div className="md-form">
                <label className="font-weight-bold">
                  Date of birth(mm/dd/yyyy)
                </label>
                <br />
                <br />
                <div>
                  <i className="fa fa-calendar prefix grey-text mt-5"></i>
                  <div className="form-group ml-5">
                    <input
                      type="date"
                      className="form-control form-control-lg p-0"
                      name="dob"
                      value={this.state.dob || ""}
                      onChange={this.onChange}
                      id="formDob"
                    />
                  </div>
                </div>
              </div>
              <div className="md-form">
                <label className="font-weight-bold">Gender</label>
                <br />
                <br />
                <GenderField
                  name="gender"
                  value={this.state.gender || ""}
                  onChange={this.onChange}
                />
              </div>
              <div className="md-form">
                <label className="font-weight-bold">Country</label>
                <br />
                <br />
                <CountryField
                  name="country"
                  value={this.state.country || ""}
                  onChange={this.onChange}
                />
              </div>
              <div className="md-form">
                <label className="font-weight-bold">Phone Number</label>
                <br />
                <br />
                <div>
                  <i className="fa fa-mobile prefix grey-text mt-5"></i>
                  <div className="ml-5 input-group">
                    <IntlTelInput
                      containerClassName="intl-tel-input"
                      inputClassName="form-control"
                      id="phone"
                      fieldName="phone"
                      value={this.state.phone || ""}
                      preferredCountries={["ng", "us"]}
                      useMobileFullscreenDropdown="true"
                      customPlaceholder={customPlaceholder}
                    />
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-center pt-2">
                <div className="col-md-4 col-lg-4">
                  <input
                    type="submit"
                    className="btn btn-block btn-success p-3"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );

    return <div className="container">{userAccount}</div>;
  }
}

EditDetails.propTypes = {
  isUserActive: PropTypes.func.isRequired,
  searchUser: PropTypes.func.isRequired,
  addBio: PropTypes.func.isRequired,
  userBio: PropTypes.func.isRequired,
  getProfilePic: PropTypes.func.isRequired,
  updateAccountDetails: PropTypes.func.isRequired,
  uploadProfilePic: PropTypes.func.isRequired,
  removeProfilePic: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  security: state.security,
  message: state.message,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  isUserActive,
  searchUser,
  addBio,
  userBio,
  updateAccountDetails,
  getProfilePic,
  uploadProfilePic,
  removeProfilePic,
})(EditDetails);

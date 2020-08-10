import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Landing extends Component {
  render() {
    const { message } = this.props.message;
    const msg = (
      <div
        className="alert alert-success text-center"
        role="alert"
      >{`${message} Please login in with your new account information.`}</div>
    );

    const display = message ? msg : "";

    return (
      <div className="landing pt-5">
        {display}
        <div
          id="carousel-example-1z"
          className="carousel slide carousel-fade"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carousel-example-1z"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carousel-example-1z" data-slide-to="1"></li>
            <li data-target="#carousel-example-1z" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner" role="listbox">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src="https://mdbootstrap.com/img/Photos/Slides/img%20(141).jpg"
                alt="first slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://mdbootstrap.com/img/Photos/Slides/img%20(136).jpg"
                alt="Second slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://mdbootstrap.com/img/Photos/Slides/img%20(137).jpg"
                alt="Third slide"
              />
            </div>
            <a
              className="carousel-control-prev"
              href="#carousel-example-1z"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carousel-example-1z"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div className="light-overlay landing-inner">
          <div>
            <p className="lead text-center py-3 m-0">
              Create your account to join this wonderful platform to post
              pictures and videos.
            </p>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-3 col-lg-3 py-2">
              <Link
                to="/account/sign_up"
                className="btn btn-lg btn-block btn-primary p-3"
              >
                Sign Up
              </Link>
            </div>
            <div className="col-md-3 col-lg-3 py-2">
              <Link
                to="/account/login"
                className="btn btn-lg btn-block btn-secondary p-3"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  message: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  message: state.message,
});

export default connect(mapStateToProps, null)(Landing);

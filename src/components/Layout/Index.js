import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Landing from "../authentication/layout/Landing";
import Home from "../dashboard/layout/Home";

class Index extends Component {
  render() {
    const { validToken } = this.props.security;
    const display = validToken ? <Home /> : <Landing />;

    return <div className="container">{display}</div>;
  }
}

Index.propTypes = {
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps)(Index);

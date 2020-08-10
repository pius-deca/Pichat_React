import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { listOfFollowers } from "../../../actions/FollowActions";

class Followers extends React.Component {
  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.listOfFollowers(username);
  }
  render() {
    return (
      <div className="container">
        <div className="shadow rounded p-3">followers</div>
      </div>
    );
  }
}

Followers.propTypes = {
  listOfFollowers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  listOfFollowers,
})(Followers);

import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { listOfFollowing } from "../../../actions/FollowActions";

class Following extends React.Component {
  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.listOfFollowing(username);
  }
  render() {
    return (
      <div className="container">
        <div className="shadow rounded p-3">followers</div>
      </div>
    );
  }
}

Following.propTypes = {
  listOfFollowing: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  listOfFollowing,
})(Following);

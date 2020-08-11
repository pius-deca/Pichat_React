import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { listOfFollowing } from "../../../actions/FollowActions";

class Following extends React.Component {
  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.listOfFollowing(username);
  }
  render() {
    const { following } = this.props.follow;
    console.log(following);

    const allFollowing = (
      <div>
        {following.map((follower) => (
          <div
            className="d-flex justify-content-between post-user-link p-3"
            key={follower.id}
          >
            <div className="link-wrapper">
              <Link
                to={`/${follower.following}`}
                onClick={() =>
                  (window.location.href = `/${follower.following}`)
                }
                className="link py-2"
              >
                <img src="" alt="hi" className="mr-3" />
                <p>{follower.following}</p>
              </Link>
            </div>
          </div>
        ))}
        <div className="dropdown-divider m-0"></div>
      </div>
    );

    const display = following.length < 1 ? "No account followed" : allFollowing;

    return (
      <div className="container py-4">
        <div className="shadow rounded p-3">{display}</div>
      </div>
    );
  }
}

Following.propTypes = {
  follow: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  follow: state.follow,
});

export default connect(mapStateToProps, {
  listOfFollowing,
})(Following);

import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { listOfFollowers } from "../../../actions/FollowActions";
import { isUserActive } from "../../../actions/UserActions";

class Followers extends React.Component {
  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.listOfFollowers(username);
    this.props.isUserActive();
  }

  render() {
    const { followers } = this.props.follow;
    const { isActive } = this.props.user;
    console.log(followers);

    const follow = (e) => {
      e.preventDefault();
      console.log("request to follow sent...");
    };

    const unFollow = (e) => {
      console.log("request to unfollow sent...");
    };

    const followAccount = (
      <button
        className="btn btn-info"
        title="click to follow account"
        onClick={follow}
      >
        Follow
      </button>
    );

    const unFollowAccount = (
      <button
        className="btn btn-info"
        title="click to unfollow account"
        onClick={unFollow}
      >
        UnFollow
      </button>
    );

    // const canFollow = (followingBack) => {
    //   if (isActive) {
    //     if (followingBack.equalsIgnoreCase("true")) {
    //       return unFollowAccount;
    //     } else if (followingBack.equalsIgnoreCase("requested")) {
    //       return "Request sent to follow";
    //     } else if (followingBack.equalsIgnoreCase("false")) {
    //       return followAccount;
    //     }
    //   }
    // };

    const defaultPic =
      "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg";

    const src = (pic) => {
      if (pic != null) {
        return pic.url;
      }
      return defaultPic;
    };

    const allFollowers = (
      <div>
        <h5 className="p-3 m-0">Followers</h5>
        {followers.map((follower) => (
          <div
            className="d-flex justify-content-between post-user-link p-3"
            key={follower.id}
          >
            <div className="link-wrapper">
              <Link
                to={`/${follower.user.username}`}
                onClick={() =>
                  (window.location.href = `/${follower.user.username}`)
                }
                className="link py-2"
              >
                <img
                  src={src(follower.user.profilePic)}
                  alt="hi"
                  className="mr-3"
                />
                <p>{follower.user.username}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    );

    // const allFollowers = (
    //   <div>
    //     <div className="d-flex justify-content-between post-user-link p-3">
    //       <div className="link-wrapper">
    //         <Link to="#" className="link py-2">
    //           <img src="" alt="hi" className="mr-3" />
    //           <p>ebi</p>
    //         </Link>
    //       </div>
    //       <div>{canFollow()}</div>
    //     </div>
    //     <div className="dropdown-divider m-0"></div>
    //     <div className="d-flex justify-content-between post-user-link p-3">
    //       <div className="link-wrapper">
    //         <Link to="#" className="link py-2">
    //           <img src="" alt="hi" className="mr-3" />
    //           <p>ebi</p>
    //         </Link>
    //       </div>
    //       <div>{canFollow}</div>
    //     </div>
    //     <div className="dropdown-divider m-0"></div>
    //   </div>
    // );

    const display = followers.length < 1 ? "No followers" : allFollowers;

    return (
      <div className="container">
        <div className="white shadow rounded p-2">{display}</div>
      </div>
    );
  }
}

Followers.propTypes = {
  listOfFollowers: PropTypes.func.isRequired,
  isUserActive: PropTypes.func.isRequired,
  follow: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  follow: state.follow,
  user: state.user,
});

export default connect(mapStateToProps, {
  listOfFollowers,
  isUserActive,
})(Followers);

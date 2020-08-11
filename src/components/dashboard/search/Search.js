import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Search extends React.Component {
  render() {
    const { allSearchedUsers } = this.props;

    const defaultPic =
      "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg";

    const src = (pic) => {
      if (pic != null) {
        return pic.url;
      }
      return defaultPic;
    };

    return (
      <div>
        {allSearchedUsers.map((user) => (
          <div
            className="d-flex justify-content-between post-user-link p-3"
            key={user.id}
          >
            <div className="link-wrapper">
              <Link
                to={`/${user.username}`}
                onClick={() => (window.location.href = `/${user.username}`)}
                className="link py-2"
              >
                <img src={src(user.profilePic)} alt="hi" className="mr-3" />
                <p>{user.username}</p>
              </Link>
            </div>
          </div>
        ))}
        <div className="dropdown-divider m-0"></div>
      </div>
    );
  }
}

Search.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {})(Search);

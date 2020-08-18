import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { isUserActive } from "../../../actions/UserActions";

class Search extends React.Component {
  componentDidMount() {
    this.props.isUserActive();
  }

  render() {
    const { allSearchedUsers, state } = this.props;
    const { isActive } = this.props.user;

    const defaultPic =
      "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg";

    const src = (pic) => {
      if (pic != null) {
        return pic.url;
      }
      return defaultPic;
    };

    const notActive = (
      <div>
        <p className="red-text p-3 m-0">
          Activate your account to see searched users account
        </p>
      </div>
    );

    const active = (
      <div>
        {allSearchedUsers.map((user) => (
          <div key={user.id}>
            <h5 className="p-3 m-0">
              List of all users starting with
              <span className="font-weight-bold"> {`${state}`}</span>
            </h5>
            <div className="d-flex justify-content-between post-user-link p-3">
              <div className="link-wrapper">
                <Link
                  to={`/${user.username}`}
                  onClick={() => (window.location.href = `/${user.username}`)}
                  className="link py-2"
                >
                  <img src={src(user.profilePic)} alt="hi" className="mr-3" />
                  <p className="black-text">{user.username}</p>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );

    const searchIfActive = isActive ? active : notActive;

    return <div>{searchIfActive}</div>;
  }
}

Search.propTypes = {
  user: PropTypes.object.isRequired,
  isUserActive: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { isUserActive })(Search);

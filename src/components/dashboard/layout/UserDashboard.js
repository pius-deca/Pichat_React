import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  isUserActive,
  activateUser,
  getProfilePic,
} from "../../../actions/UserActions";
import { searchUser } from "../../../actions/UserActions";
import {
  uploadPost,
  getUserPosts,
  countPosts,
} from "../../../actions/PostActions";
import { countFollowing, countFollowers } from "../../../actions/FollowActions";
import { UserPost } from "../post/UserPost";
import { trackPromise } from "react-promise-tracker";
import { createNotification } from "../../utils/Notifications";

class UserDashboard extends Component {
  constructor() {
    super();
    this.state = {
      code: "",
      file: null,
      caption: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.activate = this.activate.bind(this);
    this.post = this.post.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onFileChange(e) {
    this.setState({
      file: e.target.files[0],
    });
  }

  activate(e) {
    e.preventDefault();
    const request = {
      code: this.state.code,
    };
    trackPromise(this.props.activateUser(request.code));
    this.setState({
      code: "",
    });
  }

  post(e) {
    e.preventDefault();
    const caption = this.state.caption;
    const file = this.state.file;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);
    trackPromise(this.props.uploadPost(formData));
  }

  componentWillUpdate(nextProps) {
    const { errors } = nextProps.errors;
    const { message } = nextProps.message;
    if (errors) {
      createNotification("error", errors);
      this.props.errors.errors = "";
    } else if (message) {
      createNotification("success", message);
      this.props.message.message = "";
    }
  }

  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.isUserActive();
    this.props.searchUser(username);
    this.props.getUserPosts(username);
    this.props.countPosts(username);
    this.props.countFollowing(username);
    this.props.countFollowers(username);
    this.props.getProfilePic();
  }

  render() {
    const { user } = this.props.security;
    const { searchedUser, userErrors } = this.props.user;
    const { countUserPosts, userPosts } = this.props.post;
    const { numOfFollowers, numOfFollowing } = this.props.follow;

    const numOfPosts =
      countUserPosts > 1 ? `${countUserPosts} posts` : `${countUserPosts} post`;
    const numFollowers =
      numOfFollowers > 1
        ? `${numOfFollowers} followers`
        : `${numOfFollowers} follower`;

    const notActive = (
      <div className="alert alert-warning text-center" role="alert">
        Account is not active
      </div>
    );

    let posts;
    posts = UserPost(userPosts);

    const activeBtn = (
      <div className="col-lg-4 col-md-3 pt-4">
        <input
          type="submit"
          value="Activate"
          className="btn btn-block btn-primary"
        />
      </div>
    );

    const notActiveBtn = (
      <div className="col-lg-4 col-md-3 pt-4">
        <input
          type="submit"
          value="Activate"
          className="btn btn-primary btn-block"
          disabled
        />
      </div>
    );

    const activateButton = this.state.code === "" ? notActiveBtn : activeBtn;

    const inActiveUser = (
      <div className="user-dashboard">
        {notActive}
        <form onSubmit={this.activate} className="row">
          <div className="md-form col-lg-8 col-md-9">
            <i className="fa fa-pen prefix grey-text"></i>
            <input
              autoComplete="off"
              type="text"
              className="form-control"
              name="code"
              value={this.state.code}
              onChange={this.onChange}
              placeholder="Enter activation code"
            />
          </div>
          {activateButton}
        </form>
      </div>
    );

    const makeAPost = (
      <form onSubmit={this.post}>
        <div className="file-field pt-3">
          <input
            type="file"
            name="file"
            accept="image/*, video/*"
            onChange={this.onFileChange}
          />
        </div>
        <div className="pt-3">
          <input
            autoComplete="off"
            type="text"
            name="caption"
            value={this.state.caption}
            onChange={this.onChange}
          />
        </div>
        <div className="d-flex justify-content-center p-3">
          <div>
            <input
              type="submit"
              value="post"
              className="btn btn-block btn-info"
            />
          </div>
        </div>
      </form>
    );

    const defaultPic =
      "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg";

    const src = (pic) => {
      if (pic != null) {
        return pic.url;
      }
      return defaultPic;
    };

    const activeUser = (
      <div>
        <div className="text-center">
          <div className="avatar mx-auto py-3">
            <img
              src={src(searchedUser.profilePic)}
              alt="avatar"
              className="rounded-circle z-depth-1-half avatar-pic"
            />
          </div>
          <h4 className="py-2">{user.username}</h4>
          <h4 className="py-2">
            {user.firstName} {user.lastName}
          </h4>
          <div className="py-2">
            <span className="pr-3">{numOfPosts}</span>
            <Link
              className="btn btn-info"
              to={`/${searchedUser.username}/followers`}
            >
              {numFollowers}
            </Link>
            <Link
              className="btn btn-info"
              to={`/${searchedUser.username}/following`}
            >
              {numOfFollowing} following
            </Link>
          </div>
        </div>
        <div>{makeAPost}</div>
        <div>{posts}</div>
      </div>
    );

    let active;
    if (user.username === searchedUser.username) {
      active = searchedUser.active ? activeUser : inActiveUser;
    }

    const userOfAccount = <div>{active}</div>;

    const notUserOfAccount = (
      <div>
        <div className="text-center">
          <div className="avatar mx-auto py-3">
            <img
              src={src(searchedUser.profilePic)}
              alt="avatar"
              className="rounded-circle z-depth-1-half avatar-pic"
            />
          </div>
          <h4>{searchedUser.username}</h4>
          <h4>
            {searchedUser.firstName} {searchedUser.lastName}
          </h4>
          <div className="">
            <span className="pr-3">{numOfPosts}</span>
            <Link
              className="btn btn-info"
              to={`/${searchedUser.username}/followers`}
            >
              {numFollowers}
            </Link>
            <Link
              className="btn btn-info"
              to={`/${searchedUser.username}/following`}
            >
              {numOfFollowing} following
            </Link>
          </div>
        </div>
        <div>{posts}</div>
      </div>
    );

    const userDoesNotExist = (
      <div className="alert alert-info text-center" role="alert">
        {userErrors}
      </div>
    );

    let isUser;
    if (user.username === searchedUser.username) {
      isUser = userOfAccount;
    } else if (userErrors) {
      isUser = userDoesNotExist;
    } else if (user.username !== searchedUser.username) {
      isUser = notUserOfAccount;
    }

    return <div className="container pt-4">{isUser}</div>;
  }
}

UserDashboard.propTypes = {
  security: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isUserActive: PropTypes.func.isRequired,
  searchUser: PropTypes.func.isRequired,
  activateUser: PropTypes.func.isRequired,
  getProfilePic: PropTypes.func.isRequired,
  uploadPost: PropTypes.func.isRequired,
  countPosts: PropTypes.func.isRequired,
  countFollowers: PropTypes.func.isRequired,
  countFollowing: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
  user: state.user,
  post: state.post,
  follow: state.follow,
  message: state.message,
});

export default connect(mapStateToProps, {
  isUserActive,
  activateUser,
  searchUser,
  getProfilePic,
  uploadPost,
  getUserPosts,
  countPosts,
  countFollowers,
  countFollowing,
})(UserDashboard);

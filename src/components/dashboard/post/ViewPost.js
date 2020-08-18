import React, { Component } from "react";
import { Link } from "react-router-dom";
import { countComments, commentPost } from "../../../actions/CommentActions";
import { getLikes, likePost } from "../../../actions/LikeActions";
import { getPost } from "../../../actions/PostActions";
import { isUserActive } from "../../../actions/UserActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

class ViewPost extends Component {
  constructor() {
    super();
    this.state = {
      comment: "",
      id: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { postId } = this.props.match.params;
    this.props.errors.errors = "";
    this.props.isUserActive();
    this.props.getLikes(postId);
    this.props.countComments(postId);
    this.props.getPost(postId);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ id: e.target.id });
  }

  onSubmit(e) {
    e.preventDefault();
    const commentRequest = {
      comment: this.state.comment,
      id: this.state.id,
    };
    this.props.commentPost(commentRequest, commentRequest.id);
  }

  render() {
    const { isActive } = this.props.user;
    const { likes } = this.props.like;
    const { numOfComments } = this.props.comment;
    const { post } = this.props.post;
    const { errors } = this.props.errors;

    const numOflikes =
      likes > 1 || likes === 0
        ? `${likes} likes`
        : likes === 1
        ? `${likes} likes`
        : "";

    let numComments;
    if (numOfComments > 1) {
      numComments = `view ${numOfComments} comments`;
    } else if (numOfComments === 1) {
      numComments = `view ${numOfComments} comment`;
    } else {
      numComments = "No comments";
    }

    const timePosted = moment(post.createdAt).fromNow();

    const like = (e) => {
      e.preventDefault();
      this.props.likePost(e.target.name);
    };

    const postAbsent = (
      <div className="alert alert-info text-center" role="alert">
        {errors}
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

    const activeBtn = (
      <div className="form-group p-0 m-0 col-lg-3 col-md-3 col-sm-3">
        <input
          type="submit"
          value="Comment"
          className="btn btn-block btn-primary"
        />
      </div>
    );

    const notActiveBtn = (
      <div className="form-group p-0 m-0 col-lg-3 col-md-3 col-sm-3">
        <input
          type="submit"
          value="Comment"
          className="btn btn-block btn-primary"
          disabled
        />
      </div>
    );

    const commentBtn = this.state.comment === "" ? notActiveBtn : activeBtn;

    const userActive = (
      <div className="row d-flex justify-content-center px-3">
        <div className="col-lg-6 col-md-9 post-item p-3 shadow rounded">
          {post.user && (
            <div className="link-wrapper mb-1">
              <Link to={`/${post.user.username}`} className="link py-2">
                <img
                  src={src(post.user.profilePic)}
                  alt="hi"
                  className="mr-2"
                />
                <p className="black-text font-weight-bold">
                  {post.user.username}
                </p>
              </Link>
            </div>
          )}
          <div className="my-2 img-display">
            <img
              src={post.url}
              alt="pic"
              onDoubleClick={like}
              name={post.post}
            />
          </div>
          <div className="d-flex justify-content-between py-1">
            <span className="">{numOflikes}</span>
            <span className="">{timePosted}</span>
          </div>
          <div className="py-1">{post.caption}</div>
          <Link className="py-1" to={`/post/${post.post}/comments`}>
            {numComments}
          </Link>
          <form onSubmit={this.onSubmit} className="row p-2">
            <div className="form-group p-0 col-lg-9 col-md-9 col-sm-9">
              <textarea
                className="form-control comment"
                placeholder="Add a comment"
                name="comment"
                value={this.state.comment}
                onChange={this.onChange}
                id={post.post}
              />
            </div>
            {commentBtn}
          </form>
        </div>
      </div>
    );

    let numCommentsForNotActive;
    if (numOfComments > 1) {
      numCommentsForNotActive = `${numOfComments} comments`;
    } else if (numOfComments === 1) {
      numCommentsForNotActive = `${numOfComments} comment`;
    } else {
      numCommentsForNotActive = "No comments";
    }

    const userNotActive = (
      <div>
        <div className="alert alert-warning text-center my-3" role="alert">
          Activate your account to like and comment on posts
        </div>
        <div className="row d-flex justify-content-center px-3">
          <div className="col-lg-6 col-md-9 post-item p-3 shadow rounded">
            {post.user && (
              <div className="link-wrapper mb-1">
                <Link to={`/${post.user.username}`} className="link py-2">
                  <img
                    src={src(post.user.profilePic)}
                    alt="hi"
                    className="mr-2"
                  />
                  <p className="black-text font-weight-bold">
                    {post.user.username}
                  </p>
                </Link>
              </div>
            )}
            <div className="my-2 img-display">
              <img src={post.url} alt="pic" width="100%" />
            </div>
            <div className="d-flex justify-content-between py-1">
              <span className="">{numOflikes}</span>
              <span className="">{timePosted}</span>
            </div>
            <div className="py-1">{post.caption}</div>
            <span>{numCommentsForNotActive}</span>
          </div>
        </div>
      </div>
    );

    const activeUser = isActive ? userActive : userNotActive;

    const isPostPresent = errors ? postAbsent : activeUser;

    return <div className="container">{isPostPresent}</div>;
  }
}

ViewPost.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  like: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  isUserActive: PropTypes.func.isRequired,
  getLikes: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  countComments: PropTypes.func.isRequired,
  commentPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors,
  like: state.like,
  comment: state.comment,
  post: state.post,
});

export default connect(mapStateToProps, {
  isUserActive,
  getLikes,
  likePost,
  countComments,
  commentPost,
  getPost,
})(ViewPost);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getComments, commentPost } from "../../../actions/CommentActions";
import { getPost } from "../../../actions/PostActions";
import { isUserActive } from "../../../actions/UserActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

class Comment extends Component {
  constructor() {
    super();
    this.state = {
      comment: "",
      id: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  componentDidMount() {
    const { postId } = this.props.match.params;
    this.props.getComments(postId);
    this.props.isUserActive();
    this.props.getPost(postId);
  }

  render() {
    const { allComments } = this.props.comment;
    const { errors } = this.props.errors;
    const { post } = this.props.post;

    const like = (e) => {
      e.preventDefault();
      this.props.likePost(e.target.name);
    };

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

    const displayErr = (
      <div className="alert alert-danger text-center my-5" role="alert">
        {errors}
      </div>
    );

    const emptyComments = (
      <div className="alert alert-info text-center my-5" role="alert">
        No Comments available
      </div>
    );

    const notEmptycomments = (
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
            <span>{post.caption}</span>
            <span className="">{moment(post.createdAt).fromNow()}</span>
          </div>
          <div className="my-2">
            <p className="p-2 m-0 font-weight-bold">Comment(s)</p>
            {allComments.payload.map((comment) => (
              <div
                className="user-comments shadow rounded p-2 mb-1"
                key={comment.id}
              >
                <div className="link-wrapper d-flex justify-content-between">
                  <Link to={`/${comment.user.username}`} className="link py-2">
                    <img
                      src={src(comment.user.profilePic)}
                      alt="hi"
                      className="mr-2"
                    />
                    <p className="black-text font-weight-bold">
                      {comment.user.username}
                    </p>
                  </Link>
                  <span className="mt-3">
                    {moment(comment.createdAt).fromNow()}
                  </span>
                </div>
                <p className="p-2 m-0">{comment.comment}</p>
              </div>
            ))}
          </div>
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

    const comments = errors
      ? displayErr
      : allComments.empty
      ? emptyComments
      : notEmptycomments;

    return <div className="container">{comments}</div>;
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getComments: PropTypes.func.isRequired,
  commentPost: PropTypes.func.isRequired,
  isUserActive: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors,
  comment: state.comment,
  post: state.post,
});

export default connect(mapStateToProps, {
  getComments,
  isUserActive,
  getPost,
  commentPost,
})(Comment);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { countComments, commentPost } from "../../../actions/CommentActions";
import { getLikes, likePost } from "../../../actions/LikeActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

class PostItem extends Component {
  constructor() {
    super();
    this.state = {
      comment: "",
      id: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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
    const { post } = this.props;

    const numOflikes =
      post.numOfLikes > 1
        ? `${post.numOfLikes} likes`
        : `${post.numOfLikes} like`;

    let numComments;
    if (post.numOfComments > 1) {
      numComments = `view ${post.numOfComments} comments`;
    } else if (post.numOfComments === 1) {
      numComments = `view ${post.numOfComments} comment`;
    } else {
      numComments = "No comments";
    }

    const like = (e) => {
      e.preventDefault();
      this.props.likePost(e.target.name);
    };

    const timePosted = moment(post.createdAt).fromNow();

    const defaultPic =
      "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg";

    const src = (pic) => {
      if (pic != null) {
        return pic.url;
      }
      return defaultPic;
    };

    return (
      <div className="post-item shadow rounded p-3">
        {post.user && (
          <div className="post-user-link mb-1">
            <Link to={`/${post.user.username}`} className="link py-2">
              <img src={src(post.user.profilePic)} alt="pic" className="mr-2" />
              <p>{post.user.username}</p>
            </Link>
          </div>
        )}
        <div className="my-2">
          <img
            src={post.url}
            alt="pic"
            width="100%"
            onDoubleClick={like}
            name={post.post}
          />
        </div>
        <div className="d-flex justify-content-between py-1">
          <span>{numOflikes}</span>
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
          <div className="form-group p-0 m-0 col-lg-3 col-md-3 col-sm-3">
            <input
              type="submit"
              value="Comment"
              className="btn btn-block btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

PostItem.propTypes = {
  comment: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  commentPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  comment: state.comment,
});

export default connect(mapStateToProps, {
  likePost,
  getLikes,
  countComments,
  commentPost,
})(PostItem);

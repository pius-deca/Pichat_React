import React, { Component } from "react";
import { getAllPosts } from "../../../actions/PostActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PostItem from "../post/PostItem";

class Home extends Component {
  componentDidMount() {
    this.props.getAllPosts();
  }

  render() {
    const { allPosts } = this.props.post;

    const emptyPosts = (
      <div className="alert alert-info text-center" role="alert">
        No Posts available
      </div>
    );

    const notEmptyPosts = (
      <div>
        {allPosts.payload.map((post) => (
          <div className="my-3" key={post.post}>
            <PostItem post={post} />
          </div>
        ))}
      </div>
    );

    const posts = allPosts.empty ? emptyPosts : notEmptyPosts;

    return <div className="container">{posts}</div>;
  }
}

Home.propTypes = {
  security: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getAllPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
  post: state.post,
});

export default connect(mapStateToProps, { getAllPosts })(Home);

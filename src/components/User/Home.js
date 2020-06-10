import React, {Component} from 'react';
import {getAllPosts} from '../../actions/PostActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostItem from '../Post/ViewPost';

class Home extends Component{ 

  componentDidMount(){
    this.props.getAllPosts();
  } 
  
  render(){ 
    const{ allPosts } = this.props.post   
    
    return (
      <div className="container">
        {allPosts.map(post =>(
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    )
  }
}

Home.propTypes = {
  security: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getAllPosts: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
  security: state.security,
  post: state.post
})

export default connect(
  mapStateToProps,
  {getAllPosts}
  )(Home);

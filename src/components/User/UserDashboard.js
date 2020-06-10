import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchUser } from '../../actions/UserActions';
import { getUserPosts } from '../../actions/PostActions';
import { countUserPosts } from '../../actions/PostActions';
import { countFollowing } from '../../actions/FollowActions';
import { countFollowers } from '../../actions/FollowActions';
import { UserPost } from './UserPost';

class UserDashboard extends Component {
  componentDidMount(){
    const { username } = this.props.match.params
    console.log(username);    
    this.props.searchUser(username)
    this.props.getUserPosts()
    this.props.countUserPosts()
    this.props.countFollowing()
    this.props.countFollowers()
  }

  render() {    
    const { username } = this.props.match.params
    const { user } = this.props.security 
    const { searchedUser } = this.props.user 
    const { countUserPosts, userPosts } = this.props.post 
    const { numOfFollowers, numOfFollowing } = this.props.follow 

    const numOfPosts = countUserPosts > 1 ? `${countUserPosts} posts` : `${countUserPosts} post`
    const numFollowers = numOfFollowers > 1 ? `${numOfFollowers} followers` : `${numOfFollowers} follower`

    let posts;
    posts = UserPost(userPosts)

    const inActiveUser = (
      <div >
        <div className="alert alert-warning text-center" role="alert">Account is not yet active </div>
      </div> 
    )
    const isActive = user.isActive ? "" : inActiveUser; 

    const userOfAccount = (
      <div>
        <div className="text-center">
          <h4>{user.username}</h4>        
          <span>{user.firstName} {user.lastName}</span> 
          <div className="">
            <span className="pr-3">{numOfPosts}</span> 
            <span className="px-3">{numFollowers}</span> 
            <span className="px-3">{numOfFollowing} following</span>         
          </div> 
        </div>
        <div>
          { posts }
        </div>     
      </div> 
    )

    const notUserOfAccount = (
      <div >
        not user
      </div> 
    )

    const doesNotExist = (
      <div >
        user does not exist
      </div> 
    )

    let isUser
    if(user.username === username){
      isUser = userOfAccount
    }
    else if(searchedUser.username === username){
      isUser = notUserOfAccount
    }
    else{
      isUser = doesNotExist
    }

    return (
      <div className="container">
        {isActive}
        {isUser}
      </div>
    )
  }
}

UserDashboard.propTypes = {
  security: PropTypes.object.isRequired,
  searchUser: PropTypes.func.isRequired,
  getUserPosts: PropTypes.func.isRequired,
  countUserPosts: PropTypes.func.isRequired,
  countFollowers: PropTypes.func.isRequired,
  countFollowing: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
  security: state.security,
  user: state.user,
  post: state.post,
  follow: state.follow
})

export default connect(
  mapStateToProps,
  {searchUser, getUserPosts, countUserPosts, countFollowers, countFollowing}
  )(UserDashboard);


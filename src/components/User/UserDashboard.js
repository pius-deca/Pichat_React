import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { activateUser } from '../../actions/UserActions';
import { searchUser } from '../../actions/UserActions';
import { getUserPosts, countUserPosts } from '../../actions/PostActions';
import { countFollowing, countFollowers } from '../../actions/FollowActions';
import { UserPost } from './UserPost';

class UserDashboard extends Component {
  constructor(){
    super()
    this.state ={
      "code":""
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e){
    e.preventDefault()
    const request ={
      code:this.state.code
    }    
    this.props.activateUser(request.code)
  } 

  componentDidMount(){
    const { username } = this.props.match.params 
    this.props.errors.errors=""
    this.props.searchUser(username)
    this.props.getUserPosts(username)
    this.props.countUserPosts(username)
    this.props.countFollowing(username)
    this.props.countFollowers(username)    
  }

  render() {    
    const { user } = this.props.security  
    const { searchedUser } = this.props.user 
    const { countUserPosts, userPosts } = this.props.post 
    const { numOfFollowers, numOfFollowing } = this.props.follow 
    const { errors } = this.props.errors

    const numOfPosts = countUserPosts > 1 ? `${countUserPosts} posts` : `${countUserPosts} post`
    const numFollowers = numOfFollowers > 1 ? `${numOfFollowers} followers` : `${numOfFollowers} follower`

    const error = (
      <div className="alert alert-warning text-center" role="alert">{errors}</div>
    )

    const noError = (
      <div className="alert alert-warning text-center" role="alert">Account is not active</div>
    )

    const isError = errors ? error : noError

    let posts;
    posts = UserPost(userPosts)

    const inActiveUser = (
      <div className="user-dashboard">
        {isError}
        <form onSubmit={this.onSubmit} className="row">
          <div className="form-group col-lg-8 col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="enter code"
              name="code"
              value={this.state.code}
              onChange={this.onChange}
            />
          </div>          
          <div className="form-group col-lg-4 col-md-4">
            <input 
              type="submit"
              value="Activate"
              className="btn btn-lg btn-block btn-primary"
            />
          </div>
        </form>
      </div> 
    )

    let active;
    if (user.username === searchedUser.username) {
      if (searchedUser.active) {
        active = ""
      }else{
        active = inActiveUser;
      }        
    }

    const userOfAccount = (
      <div>      
        {active}
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
      <div>      
        <div className="text-center">
          <h4>{searchedUser.username}</h4>        
          <span>{searchedUser.firstName} {searchedUser.lastName}</span> 
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

    const userDoesNotExist = (
      <div className="alert alert-info text-center" role="alert">
        {errors}
      </div>
    )

    let isUser 
    if(user.username === searchedUser.username){
      isUser = userOfAccount
    }
    else if(errors){
      isUser = userDoesNotExist
    }
    else if (user.username !== searchedUser.username) {
      isUser = notUserOfAccount;
    }

    return (
      <div className="container">
        {isUser}
      </div>
    )
  }
}

UserDashboard.propTypes = {
  security: PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired,  
  activateUser: PropTypes.func.isRequired,
  getUserPosts: PropTypes.func.isRequired,
  countUserPosts: PropTypes.func.isRequired,
  countFollowers: PropTypes.func.isRequired,
  countFollowing: PropTypes.func.isRequired,  
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
  security: state.security,
  errors:state.errors, 
  user: state.user,
  post: state.post,
  follow: state.follow
})

export default connect(
  mapStateToProps,
  {activateUser, searchUser, getUserPosts, countUserPosts, countFollowers, countFollowing}
  )(UserDashboard);


import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { countComments, commentPost } from '../../actions/CommentActions';
import { getLikes } from '../../actions/LikeActions';
import { getPost } from '../../actions/PostActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

class ViewPost extends Component{ 
  constructor(){
    super()
    this.state ={
      "comment":"",
      "id":""
    }
    
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  
  componentDidMount(){
    const { postId } = this.props.match.params
    this.props.errors.errors =""
    this.props.getLikes(postId);
    this.props.countComments(postId);
    this.props.getPost(postId);
  }  

  onChange(e){
    this.setState({[e.target.name]: e.target.value})
    this.setState({"id": e.target.id})
  }

  onSubmit(e){    
    e.preventDefault()
    const commentRequest = {
      comment:this.state.comment,
      id:this.state.id
    }
    this.props.commentPost(commentRequest, commentRequest.id)         
  }
  
  render(){ 
    const { likes } = this.props.like
    const { numOfComments } = this.props.comment
    const { post } = this.props.post
    const {errors} = this.props.errors
    
    const numOflikes = likes > 1 ? `${likes} likes` : `${likes} like`
        
    let numComments
    if (numOfComments > 1) {
      numComments = `view ${numOfComments} comments`
    }else if (numOfComments === 1) {
      numComments = `view ${numOfComments} comment`
    }else{
      numComments = ""
    }
    
    const timePosted = moment(post.createdAt).fromNow()

    const postAbsent =(
      <div className="alert alert-info text-center" role="alert">
        {errors}
      </div>
    )    

    const postPresent =(
      <div className="post-item px-5">      
        <span>{post.id}</span>                  
        <img src={post.url} alt="pic" /> 
        <div className="d-flex justify-content-between py-1">
          <span className="">{numOflikes}</span> 
          <span className="">{timePosted}</span>         
        </div>           
        <div className="py-1">Caption : {post.caption}</div>  
        <Link className="py-1" to={`/post/${post.post}/comments`}>{numComments}</Link>
        <form onSubmit={this.onSubmit} className="py-3">
          <div className="row m-0">
            <div className="form-group pr-0 w-75">
              <textarea
                className="form-control comment" 
                placeholder="Add a comment"
                name="comment"
                value={this.state.comment}
                onChange={this.onChange}
                id={post.post}
              />
            </div>            
            <div className="form-group px-0 w-25">
              <input 
                type="submit"
                value="Send"
                className="btn btn-lg btn-block btn-primary comment"
              />
            </div>
          </div>
        </form> 
      </div>
    )

    const isPostPresent = errors ? postAbsent : postPresent

    return (
      <div className="container">
        {isPostPresent}
      </div>
    )
  }
}

ViewPost.propTypes = {
  errors:PropTypes.object.isRequired,
  like: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getLikes: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  countComments: PropTypes.func.isRequired,
  commentPost: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
  errors:state.errors, 
  like:state.like,
  comment:state.comment,
  post:state.post
})

export default connect(
  mapStateToProps,
  {getLikes, countComments, commentPost, getPost}
  )(ViewPost);
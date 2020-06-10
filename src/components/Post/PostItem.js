import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { countComments, commentPost } from '../../actions/CommentActions';
import { getLikes } from '../../actions/LikeActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AllPostItem extends Component{ 
  constructor(){
    super()
    this.state ={
      "comment":"",
      "id":"",
      errors:{}
    }
    
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  
  componentDidMount(){
    this.props.getLikes("image08101");
    this.props.countComments("image08101");
  }  

  componentWillReceiveProps(nextProps){ 
    if(nextProps.errors){
      this.setState({ errors: nextProps.errors })
    }
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
    const { post } = this.props

    const numOflikes = likes > 1 ? `${likes} likes` : `${likes} like`
        
    let numComments
    if (numOfComments > 1) {
      numComments = `view ${numOfComments} comments`
    }else if (numOfComments === 1) {
      numComments = `view ${numOfComments} comment`
    }else{
      numComments = ""
    }
    
    let postTime = new Date(post.createdAt) / 1000
    console.log(postTime);
    let currentTime = new Date() / 1000
    console.log((currentTime-postTime) / 3600);
    let timeAgo = (currentTime-postTime) / 3600
    let ago = parseInt(timeAgo)     

    return (
      <div className="post-item py-3">
        <div className="">      
          <Link className="" to={post.user.username}>{post.user.username}</Link>                  
          <img src={post.url} alt="pic" /> 
          <div className="d-flex justify-content-between py-1">
            <span className="">{numOflikes}</span> 
            <span className="">{ago} hr ago</span>         
          </div>           
          <div className="py-1">Caption : {post.caption}</div>  
          <Link className="py-1" to="/">{numComments}</Link>
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
      </div>
    )
  }
}

AllPostItem.propTypes = {
  like: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  getLikes: PropTypes.func.isRequired,
  countComments: PropTypes.func.isRequired,
  commentPost: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
  like:state.like,
  comment:state.comment
})

export default connect(
  mapStateToProps,
  {getLikes, countComments, commentPost}
  )(AllPostItem);
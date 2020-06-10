import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Landing from '../Authentication/Landing';
import Home from '../User/Home';

class Index extends Component{  
  render(){ 
    const{ validToken, user } = this.props.security  
    const display = (validToken && user) ? <Home /> : <Landing />
    
    return (
      <div className="container">
        { display }                                 
      </div>           
    )
  }
}

Index.propTypes = {
  security: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
  security: state.security
})

export default connect(
  mapStateToProps
  )(Index); 
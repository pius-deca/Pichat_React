import React, { Component } from "react";
import { Link } from "react-router-dom";
import { loginUser } from '../../actions/SecurityActions';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';

class Login extends Component { 
  constructor(){
    super()
    this.state ={
        "identifier":"",
        "password": ""
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  
  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e){
    e.preventDefault()
    const LoginRequest ={
      identifier:this.state.identifier,
      password:this.state.password
    }
    this.props.loginUser(LoginRequest, this.props.history)
  } 

  render() {
    const { errors } = this.props.errors

    const signup = () => { 
      window.location.href = "/account/sign_up"
    }  
    
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h3 className="diaplay-4 text-center">Login here</h3>
              <br />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames ("form-control form-control-lg", {
                      "is-invalid": errors
                    })} 
                    placeholder="email or username"
                    name="identifier"
                    value={this.state.identifier}
                    onChange={this.onChange}
                  />
                  {errors && (
                    <div className="invalid-feedback text-left">{errors.data.identifier}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames ("form-control form-control-lg", {
                      "is-invalid": errors
                    })} 
                    placeholder="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />  
                  {errors && (
                    <div className="invalid-feedback text-left">{errors.data.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input 
                      type="submit"
                      className="btn btn-lg btn-block btn-primary mt-4"
                  />
                  <p className="mt-4 text-center">
                    Don't have an account <Link to="/account/sign_up" onClick={signup}> Sign up</Link> 
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>            
      </div>
    )
  }
}

Login.propTypes ={
  loginUser:PropTypes.func.isRequired,
  errors:PropTypes.object.isRequired,
  security:PropTypes.object.isRequired
}

const mapStateToProps = state =>({
  security:state.security,
  errors:state.errors
})

export default connect(
  mapStateToProps, 
  {loginUser}
  )(Login) 
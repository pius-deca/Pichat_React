import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { createNewUser } from '../../actions/SecurityActions';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';

class Signup extends Component {
  constructor(){
    super()

    this.state ={
      "firstName":"",
      "lastName":"",
      "email":"",
      "username":"",
      "password":""
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }
  
  onSubmit(e){
    e.preventDefault()
    const newUser = {
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      email:this.state.email,
      username:this.state.username,
      password:this.state.password,
    }
    this.props.createNewUser(newUser, this.props.history)
  }

  render() {
    const { errors } = this.props.errors 

    const login = () => { 
      window.location.href = "/account/login"
    }     

    return (
      <div className="signup">
        <div className="container">      
          <div className="row">
            <div className="col-md-8 m-auto">
              <h4 className="diaplay-4 text-center">Sign up to see photos 
              and videos from your friends.</h4>
              <br />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input 
                      type="text" 
                      className={classnames ("form-control form-control-lg", {
                        "is-invalid": errors
                      })} 
                      placeholder="firstname" 
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.onChange}
                  />
                  {errors && (
                    <div className="invalid-feedback text-left">{errors.data.firstName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input 
                      type="text"                      
                      className={classnames ("form-control form-control-lg", {
                        "is-invalid": errors
                      })} 
                      placeholder="lastname" 
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.onChange}
                  />
                  {errors && (
                    <div className="invalid-feedback text-left">{errors.data.lastName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input 
                      type="text" 
                      className={classnames ("form-control form-control-lg", {
                        "is-invalid": errors
                      })}   
                      placeholder="email" 
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    /> 
                    {errors && (
                      <div className="invalid-feedback text-left">{errors.data.email}</div>
                    )} 
                </div>
                <div className="form-group">
                  <input 
                      type="text" 
                      className={classnames ("form-control form-control-lg", {
                        "is-invalid": errors
                      })} 
                      placeholder="username" 
                      name="username"
                      value={this.state.username}
                      onChange={this.onChange}
                  />
                  {errors && (
                    <div className="invalid-feedback text-left">{errors.data.username}</div>
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
                    Have an account?<Link to="/account/login" onClick={login}> Log in </Link>               </p>
                </div>
              </form>
            </div>
          </div>
        </div>                
      </div>
    )
  }
}

Signup.propTypes ={
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security
})

export default connect(
  mapStateToProps, 
  { createNewUser }
  )(Signup)

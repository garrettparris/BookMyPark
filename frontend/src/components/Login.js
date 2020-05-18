import React, { Component } from "react";
import axios from 'axios';
import {
  Button,
  Modal,
} from "react-bootstrap";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAccessToken, setRefreshToken, login, setUserId, setUserName, setEmail, setFirstName } from '../actions'
import { GoogleLogin } from 'react-google-login';
class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      smShow: false,
      email: "",
      password: "",
      username: '',
      firstname: '',
      lastname: '',
      mode: "login",
      loginError: false,
      registerError: false,
      errors: [],
    };
  }
  responseGoogle = (response) => {
  }
  handleGoogleLoginSuccess = (response) => {
    console.log(response);
    let firstName = response['profileObj']['givenName']
    let lastName = response['profileObj']['familyName']
    let email = response['profileObj']['email']

    // this.props.dispatch(setUserId(res.data.id));
    this.props.dispatch(login(true));
    this.props.dispatch(setUserName(email));
    this.props.dispatch(setEmail(email));
    this.props.dispatch(setFirstName(firstName));
    this.props.onClose();

  }
  handleGoogleLoginFail = (response) => {
    console.log(response);

    this.errors = response.error
  }
  setMode = mode => {
    this.setState({
      mode
    });
  };

  renderForgot = () => {
    return (
      <div>
        <p>inside of forgot! :) </p>
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            this.setMode("login");
          }}
        >
          Back to login
        </a>
      </div>
    );
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  handleFirstNameChange = (e) => {
    this.setState({ firstname: e.target.value });
  }

  handleLastNameChange = (e) => {
    this.setState({ lastname: e.target.value });
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  }
  register = () => {
    axios({
      method: 'post',
      url: 'https://bookmypark.ca/api/register/',
      data: {
        username: this.state.username,
        password: this.state.password,
        password2: this.state.password,
        email: this.state.email,
        first_name: this.state.firstname,
        last_name: this.state.lastname,
      }

    }).then(res => {
      console.log(res.data);
      this.setState({ loginError: false });
      this.props.dispatch(setAccessToken(res.data.access));
      this.props.dispatch(setRefreshToken(res.data.refresh));
      this.props.dispatch(setUserId(res.data.id));
      this.props.dispatch(login(true));
      this.props.dispatch(setUserName(res.data.username));
      this.props.dispatch(setEmail(res.data.email));
      this.props.dispatch(setFirstName(res.data.first_name));
      this.props.onClose();
    }, (error) => {
      let errors = error.response.data
        this.setState({
          loginError: true,
          errors: errors
        });
    });
  }
  login = () => {
    axios({
      method: 'post',
      url: 'https://bookmypark.ca/api/token/',
      data: {
        username: this.state.email,
        password: this.state.password,
      }

    }).then(res => {
      console.log(res.data);
      this.setState({ loginError: false });
      this.props.dispatch(setAccessToken(res.data.access));
      this.props.dispatch(setRefreshToken(res.data.refresh));
      this.props.dispatch(setUserId(res.data.id));
      this.props.dispatch(setUserName(res.data.username));
      this.props.dispatch(setEmail(res.data.email));
      this.props.dispatch(setFirstName(res.data.first_name));
      this.props.dispatch(login(true));
      this.props.onClose();
      window.location.reload();

    }, (error) => {
        console.log(error.response.data['detail']);
      this.setState({ loginError: true });
    });
  }
  renderRegister = () => {
    return (
      <div>
        <div>
          <form className="form-horizontal form-loanable">
            {this.state.loginError && (<div className="alert alert-danger alert-sm">
              <span className="fw-semi-bold">Error:</span> {Object.values(this.state.errors).map(error =>
                <div>
                  {error[0]}
                </div>
                )}
            </div>)}
            <fieldset>

              <div className="form-group has-feedback required">
                <label htmlFor="login-email" className="col-sm-5">Email</label>
                <div className="col-sm-7">
                  <span className="form-control-feedback" aria-hidden="true"></span>
                  <input
                    type="text"
                    name="email"
                    id="login-email"
                    className="form-control"
                    onChange={this.handleEmailChange}
                  />
                </div>
              </div>
              <div className="form-group has-feedback required">
                <label htmlFor="login-email" className="col-sm-5">First Name</label>
                <div className="col-sm-7">
                  <span className="form-control-feedback" aria-hidden="true"></span>
                  <input
                    type="text"
                    name="first_name"
                    id="login-email"
                    className="form-control"
                    onChange={this.handleFirstNameChange}
                  />
                </div>
              </div>
              <div className="form-group has-feedback required">
                <label htmlFor="login-lname" className="col-sm-5">Last Name</label>
                <div className="col-sm-7">
                  <span className="form-control-feedback" aria-hidden="true"></span>
                  <input
                    type="text"
                    name="last_name"
                    id="login-email"
                    className="form-control"
                    onChange={this.handleLastNameChange}
                  />
                </div>
              </div>
              <div className="form-group has-feedback required">
                <label htmlFor="login-email" className="col-sm-5">Username</label>
                <div className="col-sm-7">
                  <span className="form-control-feedback" aria-hidden="true"></span>
                  <input
                    type="text"
                    name="name"
                    id="login-email"
                    className="form-control"
                    onChange={this.handleUsernameChange}
                  />
                </div>
                <div className="form-group has-feedback required">
                  <label htmlFor="login-password" className="col-sm-5">Password</label>
                  <div className="col-sm-7">
                    <span className="form-control-feedback" aria-hidden="true"></span>
                    <div className="login-password-wrapper">
                      <input
                        type="password"
                        name="password"
                        id="login-password"
                        className="form-control"
                        required
                        onChange={this.handlePasswordChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
            <div className="form-action">
              <Button className="btn btn-lg btn-primary btn-left" onClick={this.register}>Enter</Button>

            </div>
          </form>
        </div>
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            this.setMode("login");
          }}
        >
          Log in here
        </a>
      </div>
    );
  };

  renderLogin = () => {
    return (
      <div>
        <form className="form-horizontal ">
          {this.state.loginError && (<div className="alert alert-danger alert-sm">
            <span className="fw-semi-bold">Error:</span> Invalid Credentials.
          </div>)}
          <fieldset>
            <div className="form-group has-feedback required">
              <label htmlFor="login-email" className="col-sm-5">Username</label>
              <div className="col-sm-7">
                <span className="form-control-feedback" aria-hidden="true"></span>
                <input
                  type="text"
                  name="email"
                  id="login-email"
                  className="form-control"
                  onChange={this.handleEmailChange}
                  required
                />
              </div>
            </div>
            <div className="form-group has-feedback required">
              <label htmlFor="login-password" className="col-sm-5">Password</label>
              <div className="col-sm-7">
                <span className="form-control-feedback" aria-hidden="true"></span>
                <div className="login-password-wrapper">
                  <input
                    type="password"
                    name="password"
                    id="login-password"
                    className="form-control"
                    required
                    onChange={this.handlePasswordChange}
                  />
                  <a
                    style={{ marginTop: '5px' }}
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      this.setMode("forgot");
                    }}
                  >
                    Forgot Password
                     </a>
                </div>
              </div>
            </div>
          </fieldset>
          <div style={{position: 'relative',display:'flex' ,width:'200px'}}>
            <Button className="btn btn-lg btn-primary btn-left" style={{ paddingRight: '10px' }} onClick={this.login}>Enter </Button>
            <div style={{marginLeft:'20px', right:0, position:'absolute'}}>
            <GoogleLogin
              clientId="36497817271-0fi56fl6vhgltm8lh18ptr1tprbh3p0j.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={this.handleGoogleLoginSuccess}
              onFailure={this.handleGoogleLoginFail}
              cookiePolicy={'single_host_origin'}
            />
            </div>
            
          </div>

        </form>

        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            this.setMode("register");
          }}
        >
          Create your account
        </a>
      </div>
    );
  };




  render() {
    return (
      <div>
        <Modal
          show={this.props.showModal}
          onHide={this.props.onClose}
          onSubmit={this.onSubmit}
          bsSize="large"
          style={{ paddingTop: '64px', zIndex: 10000 }}
        >
          <Modal.Header closeButton={true}>
            <h2>{this.state.mode === "login" ? "Login" : this.state.mode === "register" ? "Register" : "Forgot Password"}</h2>
          </Modal.Header>
          <Modal.Body>
            {this.state.mode === "login" ? (this.renderLogin()) : this.state.mode === "register" ? (this.renderRegister()) : (this.renderForgot())}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}


LoginForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loggedIn: state.loggedIn,
  uid: state.userid,
  username: state.userName,
  userEmail: state.userEmail,
  firstName: state.firstName
});

export default connect(mapStateToProps)(LoginForm);
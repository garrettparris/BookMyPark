import React, { Component } from "react";
import axios from 'axios';
import {
  Navbar,
  NavDropdown,
  MenuItem,
  NavItem,
  Nav,
  Button,
  Popover,
  Tooltip,
  Modal,
  OverlayTrigger
} from "react-bootstrap";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAccessToken, setRefreshToken, login } from '../actions'

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      smShow: false,
      email: "",
      password: "",
      mode: "login",
      loginError: false,
      registerError: false,
    };
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

  renderRegister = () => {
    return (
      <div>
        <div>
          <form className="form-horizontal form-loanable">
            {this.state.loginError && (<div className="alert alert-danger alert-sm">
              <span className="fw-semi-bold">Error:</span> Register failed.
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
            <span className="fw-semi-bold">Error:</span> Login failed.
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

          <Button className="btn btn-lg btn-primary btn-left" onClick={this.login}>Enter </Button>
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

  login = () => {
    axios({
      method: 'post',
      url: 'http://ec2-18-218-36-171.us-east-2.compute.amazonaws.com:8080/api/token/',
      data: {
        username: this.state.email,
        password: this.state.password,
      }

    }).then(res => {
      console.log(res.data);
      this.setState({ loginError: false });
      this.props.dispatch(setAccessToken(res.data.access));
      this.props.dispatch(setRefreshToken(res.data.refresh));
      this.props.dispatch(login(true));
      this.props.onClose();
    }, (error) => {
      console.log(error);
      this.setState({ loginError: true });
    });
  }

  register = () => {
    axios({
      method: 'post',
      url: 'http://ec2-18-218-36-171.us-east-2.compute.amazonaws.com:8080/register/',
      data: {  
        username: this.state.email,
        password: this.state.password,
        password2: this.state.password,
        email: "garrettp18+22233341@gmail.com",
        first_name: "first name",
        last_name: "last name",
      }

    }).then(res => {
      console.log(res.data);
      this.setState({ loginError: false });
      this.props.dispatch(setAccessToken(res.data.access));
      this.props.dispatch(setRefreshToken(res.data.refresh));
      this.props.dispatch(login(true));
      this.props.onClose();
    }, (error) => {
      console.log(error);
      this.setState({ loginError: true });
    });
  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.showModal}
          onHide={this.props.onClose}
          onSubmit={this.onSubmit}
          bsSize="large"
          style={{ paddingTop: '64px' }}
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
  loggedIn: state.loggedIn
});

export default connect(mapStateToProps)(LoginForm);
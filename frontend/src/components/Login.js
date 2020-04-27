import React, { Component } from "react";
import {
  Navbar,
  NavDropdown,
  MenuItem,
  NavItem,
  Nav,
  Popover,
  Tooltip,
  Button,
  Modal,
  OverlayTrigger
} from "react-bootstrap";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions';
import CreateNewAccount from "./CreateNewAccount";

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
    // this.props.dispatch(loggedIn(true));
    // this.props.loggedIn
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
              <span className="fw-semi-bold">Error:</span> Login failed.
            </div>)}
            <fieldset>
              <div className="form-group has-feedback required">
                <label htmlFor="login-email" className="col-sm-5">Username or email</label>
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
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-left"
                className="btn btn-lg btn-primary btn-left" onClick={() => {
                  console.log(this.state.email, this.state.password);
                }}>Enter</button>

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
        <form className="form-horizontal form-loanable">
          {this.state.loginError && (<div className="alert alert-danger alert-sm">
            <span className="fw-semi-bold">Error:</span> Login failed.
          </div>)}
          <fieldset>
            <div className="form-group has-feedback required">
              <label htmlFor="login-email" className="col-sm-5">Username or Email</label>
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
          <div className="form-action">
            <button
              type="submit"
              className="btn btn-lg btn-primary btn-left" onClick={() => {
                console.log(this.state.email, this.state.password);
              }}>Enter
              </button>
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
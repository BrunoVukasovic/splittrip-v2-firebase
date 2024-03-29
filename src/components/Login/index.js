import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { firebaseConnect } from "react-redux-firebase";

import styles from "./styles.module.css";
import { Layout } from "../";

class Login extends Component {
  state = {
    email: "",
    password: "",
    message: "Enter your credentials",
    invalid: false
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();

    // const status = this.props.handleLogin(this.state);
    const { firebase } = this.props;
    const { email, password } = this.state;

    firebase
      .login({
        email,
        password
      })
      .then(() => this.props.history.push("/"))
      .catch(error => alert("Invalid Login"));
  };

  render() {
    return (
      <Layout>
        <form className={styles.LoginForm} onSubmit={this.handleSubmit}>
          <label className={styles.Label}>{this.state.message}</label>
          <p className={styles.Hint}>
            // HINT:
            <br />
            // email: <strong>summercamp@mail.com</strong>
            <br />
            // password: <strong>password</strong>
          </p>

          <input
            autoFocus
            type="text"
            name="email"
            className={styles.Input}
            placeholder="Your email address"
            onChange={this.onChange}
            value={this.state.email}
          />

          <input
            type="password"
            name="password"
            className={styles.Input}
            placeholder="Your password"
            onChange={this.onChange}
            value={this.state.password}
          />

          <input type="submit" className={styles.Button} value={"Login"} />
        </form>

        <div className={styles.Register}>
          <label className={styles.Label}>Dont't have an account?</label>
          <Link to="/register">
            <button className={styles.Button}>Register</button>
          </Link>
        </div>
      </Layout>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default firebaseConnect()(Login);

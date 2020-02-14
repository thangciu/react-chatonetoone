import React from "react";
import ReactDOM from "react-dom";
import { toHtml } from "@fortawesome/fontawesome-svg-core";
import Helper from "../constants/Helper";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = React.createRef();

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      cfpassword: ""
    };
  }

  callback = () => {
    this.props.callback();
  };

  getFirstName = e => {
    this.setState({ firstname: e.target.value.trim() });
  };

  getLastName = e => {
    this.setState({ lastname: e.target.value.trim() });
  };

  getEmail = e => {
    this.setState({ email: e.target.value.trim() });
  };

  getPassword = e => {
    this.setState({ password: e.target.value.trim() });
  };

  getCfPassword = e => {
    this.setState({ cfpassword: e.target.value.trim() });
  };

  submit = e => {
    Helper.setText("register-success", "");
    Helper.setText("register-error", "");
    let registerInfo = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.cfpassword
    };

    let validateResult = [
      Helper.validate(
        registerInfo.firstname,
        Helper.validators.stringRequire,
        "firstname-error",
        "Invalid firstname"
      ),
      Helper.validate(
        registerInfo.lastname,
        Helper.validators.stringRequire,
        "lastname-error",
        "Invalid lastname"
      ),
      Helper.validate(
        registerInfo.email,
        Helper.validators.email,
        "email-error",
        "Invalid email"
      ),
      Helper.validate(
        registerInfo.password,
        Helper.validators.password,
        "password-error",
        "Invalid password"
      ),
      Helper.validate(
        registerInfo.confirmPassword,
        function(confirmPassword) {
          return (
            registerInfo.password == confirmPassword && confirmPassword != ""
          );
        },
        "confirmPassword-error",
        "Invalid confirmPassword"
      )
    ];

    if (Helper.allPassed(validateResult)) {
      //submit
      this.Register();
    }

    e.preventDefault();
  };

  Register = async () => {
    let email = this.state.email;
    let password = this.state.password;
    let displayName = this.state.firstname + this.state.lastname;
    this.onSubmit.current.disabled = true;
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      firebase.auth().currentUser.updateProfile({
        displayName: displayName
      });
      await firebase.auth().currentUser.sendEmailVerification();
      Helper.setText(
        "register-success",
        "An confirm link has been sended to your email address!"
      );
    } catch (err) {
      console.error(err);
      Helper.setText("register-error", err.message);
    }
    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      cfpassword: ""
    });
    this.onSubmit.current.disabled = false;
  };
  render() {
    return (
      <section className="register-container">
        <form id="register-form" className="register-form">
          <h3 className="form-header">
            <span> Register</span>
          </h3>
          <div className="form-content">
            <div className="name-wrapper">
              <div className="input-wrapper">
                <input
                  type="text"
                  value = {this.state.firstname}
                  onChange={this.getFirstName}
                  placeholder="Firstname"
                />
                <div id="firstname-error" className="message-error">
                  {" "}
                </div>
              </div>
              <div className="input-wrapper">
                <input
                  value = {this.state.lastname}
                  onChange={this.getLastName}
                  type="text"
                  placeholder="Lastname"
                />
                <div id="lastname-error" className="message-error">
                  {" "}
                </div>
              </div>
            </div>
            <div className="input-wrapper">
              <input
                onChange={this.getEmail}
                value = {this.state.email}
                type="email"
                placeholder="Email"
              />
              <div id="email-error" className="message-error">
                {" "}
              </div>
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                onChange={this.getPassword}
                value = {this.state.password}
                placeholder="Password"
              />
              <div id="password-error" className="message-error">
                {" "}
              </div>
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                onChange={this.getCfPassword}
                value = {this.state.cfpassword}
                placeholder="Confirm Password"
              />
              <div id="confirmPassword-error" className="message-error">
                {" "}
              </div>
            </div>
          </div>
          <div id="register-error" className="message-error">
            {" "}
          </div>
          <div id="register-success" className="message-success">
            {" "}
          </div>
          <div className="form-footer">
            <a id="register-link" href="#" onClick={() => this.callback()}>
              Already have an acount? Log in
            </a>
            <button
              onClick={this.submit}
              ref={this.onSubmit}
              id="register-submit-btn"
              type="sumit"
            >
              Register
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default Register;

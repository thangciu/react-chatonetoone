import React from "react";
import ReactDOM from "react-dom";
import Helper from "../constants/Helper";

class Login extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.onSubmit = React.createRef();
    this.state = {
      email: "",
      password: ""
    };
  };

  callback = email => {
    this.props.callback(email);
  };

  getEmail = e => {
    this.setState({
      email: e.target.value.trim()
    });
  };

  getPassword = e => {
    this.setState({
      password: e.target.value.trim()
    });
  };

  submit = e => {
    Helper.setText("login-error", "");
    let loginInfo = {
      email: this.state.email,
      password: this.state.password
    };
    let validateResult = [
      Helper.validate(
        loginInfo.email,
        Helper.validators.email,
        "email-error",
        "Invalid"
      ),
      Helper.validate(
        loginInfo.password,
        Helper.validators.password,
        "password-error",
        "Invalid"
      )
    ];
    if (Helper.allPassed(validateResult)) {
      this.logIn();
    }
    e.preventDefault();
  };

  logIn = async () => {
    let email = this.state.email;
    let password = this.state.password;
    this.onSubmit.current.disabled = true;

    try {
      let result = await Helper.logIn(email, password);
      // if (result.user && result.user.emailVerified) {
      //     this.props.logIn();
      // }
      if (!result.user || !result.user.emailVerified) {
        throw new Error("Must verify email!");
      }
    } catch (err) {
      console.error(err);
      Helper.setText(
        "login-error",
        "Sai email hoặc mật khẩu vui lòng kiểm tra lại!"
      );
      this.onSubmit.current.disabled = false;
      this.setState({ email: "", password: "" });
    }
    // if(this._isMounted)
  };
  //   componentDidMount() {
  //     this._isMounted = true;
  // }
  //     componentWillUnmount() {
  //       this._isMounted = false;
  //   }
  render() {
    return (
      <section className="login-container">
        <form id="login-form" className="login-form">
          <h3 className="form-header">
            <span>MindX LogIn</span>
          </h3>
          <div className="form-content">
            <div className="form-input">
              <input
                type="email"
                value={this.state.email}
                onChange={this.getEmail}
                placeholder="Email"
              />
              <div id="email-error" className="message-error">
                {" "}
              </div>
            </div>
            <div className="form-input">
              <input
                type="password"
                value={this.state.password}
                onChange={this.getPassword}
                placeholder="Password"
              />
              <div id="password-error" className="message-error">
                {" "}
              </div>
            </div>
          </div>
          <div id="login-error" className="message-error">
            {" "}
          </div>
          <div className="form-footer">
            <a id="log-in-link" href="#" onClick={() => this.callback()}>
              Not yet has an account? Register
            </a>
            <button
              id="login-submit-btn"
              ref={this.onSubmit}
              type="submit"
              onClick={this.submit}
            >
              Login
            </button>
          </div>
        </form>
      </section>
    );
  }
};

export default Login;

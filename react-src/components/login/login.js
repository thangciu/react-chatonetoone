import React from "react";
import ReactDOM from "react-dom";


class Login extends React.Component {
  constructor(props){
    super(props);
  }
  
  callback = () => {
      this.props.callback()
  }

  logIn = () => {
      this.props.logIn()
  }
  

  render() {
    return (
        <section className="login-container">
        <form id = "login-form" className="login-form">
            <h3 className="form-header">
                <span>MindX LogIn</span>
            </h3>
            <div className="form-content">
                <div className="form-input">

                    <input type="email" name="email" placeholder="Email"/>
                    <div id = "email-error" className = "message-error"> </div>
                </div>
                <div className="form-input">

                    <input type="password" name="password" placeholder="Password"/>
                    <div id = "password-error" className = "message-error"> </div>
                </div>


            </div>
            <div id = "login-error" className = "message-error"> </div>
            <div className="form-footer">
                <a id = "log-in-link" href="#" onClick = {() => this.callback()}>Not yet has an account? Register</a>
                <button id = "login-submit-btn" type="submit" onClick = {() => this.logIn()}>Login</button>
            </div>
        </form>

    </section>
    );
  }
}

export default Login;
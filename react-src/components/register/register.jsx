import React from "react";
import ReactDOM from "react-dom";



class Register extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <section className="register-container">
        <form id = "register-form" className="register-form">
            <h3 className="form-header">
                <span>MindX Register</span>
            </h3>
          <div className="form-content">
         <div className="name-wrapper">
             <div className="input-wrapper">
           <input type="text" name="firstname" placeholder="Firstname"/>   
           <div id = "firstname-error" className = "message-error"> </div>
         </div>
         <div className="input-wrapper">
             <input type="text" name="lastname" placeholder="Lastname"/>
             <div id = "lastname-error" className = "message-error"> </div>
         </div>
         </div>
         <div className="input-wrapper">
             <input type="email" name="email" placeholder="Email"/>
             <div id = "email-error" className = "message-error"> </div>
         </div>
         <div className="input-wrapper">
                 <input type="password" name="password" placeholder="Password"/>
                 <div id = "password-error" className = "message-error"> </div>
             </div>
             <div className="input-wrapper">
                     <input type="password" name="confirmPassword" placeholder="Confirm Password" />
                     <div id = "confirmPassword-error" className = "message-error"> </div>
                 </div>
         </div>


         <div id = "register-error" className = "message-error"> </div>
         <div id = "register-success" className = "message-success"> </div>
          <div className="form-footer">
              
              <a id = "register-link" href="#">Already have an acount? Log in</a>
              <button id = "register-submit-btn" type="sumit">Register</button>
          </div>

        </form>

    </section>
    );
  }
}

export default Register;
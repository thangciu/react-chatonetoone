import React from "react";
import ReactDOM from "react-dom";



class Register extends React.Component {
  constructor(props){
    super(props);

    
  }

 
 
  render() {
    return (
        <section class="register-container">
        <form id = "register-form" class="register-form">
            <h3 class="form-header">
                <span>MindX Register</span>
            </h3>
          <div class="form-content">
         <div class="name-wrapper">
             <div class="input-wrapper">
           <input type="text" name="firstname" placeholder="Firstname"/>   
           <div id = "firstname-error" class = "message-error"> </div>
         </div>
         <div class="input-wrapper">
             <input type="text" name="lastname" placeholder="Lastname"/>
             <div id = "lastname-error" class = "message-error"> </div>
         </div>
         </div>
         <div class="input-wrapper">
             <input type="email" name="email" placeholder="Email"/>
             <div id = "email-error" class = "message-error"> </div>
         </div>
         <div class="input-wrapper">
                 <input type="password" name="password" placeholder="Password"/>
                 <div id = "password-error" class = "message-error"> </div>
             </div>
             <div class="input-wrapper">
                     <input type="password" name="confirmPassword" placeholder="Confirm Password" />
                     <div id = "confirmPassword-error" class = "message-error"> </div>
                 </div>
         </div>


         <div id = "register-error" class = "message-error"> </div>
         <div id = "register-success" class = "message-success"> </div>
          <div class="form-footer">
              
              <a id = "register-link" href="#">Already have an acount? Log in</a>
              <button id = "register-submit-btn" type="sumit">Register</button>
          </div>

        </form>

    </section>
    );
  }
}

export default Register;
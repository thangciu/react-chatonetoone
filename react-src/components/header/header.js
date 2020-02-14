import React from "react";
import ReactDOM from "react-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt,faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';



class Header extends React.Component {
  constructor(props){
    super(props);
  }

  signOut = () => {
    firebase.auth().signOut().then(function() {
      console.log('success!')
    }).catch(function(error) {
      // An error happened.
      console.log('fail!')
    });
  }

  render() {
    return (
        <nav className="main-nav">
          <button  className = "icon-btn"  id = 'back-btn' type = "submit"> 
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </button>
        <div className="user-profile">
        
          <span id = "email-nav"> {this.props.email} </span>
          <button onClick = {this.signOut} className = "icon-btn" id = 'sign-out-btn' type = "submit"> 
          <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
        
      </nav>
    );
  }
}

export default Header;
import React from "react";
import ReactDOM from "react-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';



class Header extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (

        <nav className="main-nav">
        <div className="user-profile">
          <span id = "email-nav"> {this.props.email} </span>
          <button  className = "icon-btn" id = 'sign-out-btn' type = "submit"> 
          <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
        
        
      </nav>
    );
  }
}

export default Header;
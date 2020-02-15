import React from "react";
import ReactDOM from "react-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt,faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import Helper from "../constants/Helper";

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {frEmail : ''}
  };

  componentWillReceiveProps = (nextProps) => {
    nextProps.conversations[0].users.map(user => {
      if(user !== this.props.email)
      if(this.props.frEmail === ''){
        this.setState({
          frEmail : user,
        });
      };
    });
  };

  backListConversation = () => {

  }

  signOut = () => {
    Helper.signOut();
  };

  render() {
    return (
        <nav className="main-nav">
          {/* <button onClick = {this.backListConversation}  className = "icon-btn"  id = 'back-btn' type = "submit"> 
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </button> */}
        <div className="user-profile">
          <span id = "email-nav"> {this.props.email} </span>
          <span id = "fremail-nav"> {this.props.frEmail === '' ? this.state.frEmail : this.props.frEmail} </span>
          <button onClick = {this.signOut} className = "icon-btn" id = 'sign-out-btn' type = "submit"> 
          <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
      </nav>
    );
  }
}

export default Header;
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
        <div className = "loading-container">
        <img src = "./imgs/loading.gif" />
         </div>
    );
  }
}

export default Header;
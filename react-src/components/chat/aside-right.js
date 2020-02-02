import React from "react";
import ReactDOM from "react-dom";

import Header from "../header/header"


class AsideRight extends React.Component {
  constructor(props){
    super(props);
  }
  
 

  render() {
    return (
        <>
       <div className = "aside-right">
      <div  id = "list-infor" className = "list-infor">
      </div>
      <button id = "btn-delete" className = "icon-btn" type = "submit">
      <i className="fas fa-backspace"></i>
            </button>
      </div>


    </>
    );
  }
}

export default AsideRight;
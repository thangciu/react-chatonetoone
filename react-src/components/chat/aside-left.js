import React from "react";
import ReactDOM from "react-dom";

import Header from "../header/header"


class AsideLeft extends React.Component {
  constructor(props){
    super(props);
  }
  
 

  render() {
    return (
        <>
       
    <div className ="aside-left">
       <div id = "list-conversation"  className = "list-conversation">
        </div>

        <form id = "form-add-conversation" className = "form-add-conversation">
          <div className = " input-wrapper" >
            <input id = "input-add-title" type = "text" name = "title" placeholder= "Conversation title"/>
            </div>
            <div id = "title-error" className = "message-error"> </div>
          <div className = " input-wrapper" >
            <input id = "input-add-friend-email" type = "email" name = "friendEmail" placeholder= "Your friend email"/>
            </div>
            <div id = "friend-email-error" className = "message-error">  </div>
            <button id = "form-add" className = "icon-btn" type = "submit"><i className="fa fa-plus" aria-hidden="true"></i>
            </button>
            <div id = "add-conversation-error" className = "message-error" > </div>
      </form>
      </div>


    </>
    );
  }
}

export default AsideLeft;
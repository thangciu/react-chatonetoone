import React from "react";
import ReactDOM from "react-dom";

import Header from "../header/header"
import AsideLeft from "./aside-left";
import AsideRight from "./aside-right";


class Chat extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <>
        <Header/>
        <section className="chat-container">
    <AsideLeft/>


       <div className = "current-conversation">
      <div id = "message-container" className="message-container">

      </div>
      <form className="form-chat" id = "form-chat">
        <div className="input-wrapper">
            <input  id = "form-chat-input" className = "input-message" type="text" name ="message" placeholder="Enter your message"/>
        </div>
        
        <button id = "form-send" type = "submit">Send</button>
      </form>
      </div>
      <AsideRight/>
    </section>
    </>
    );
  }
}

export default Chat;
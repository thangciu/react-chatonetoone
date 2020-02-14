import React from "react";
import ReactDOM from "react-dom";

import Header from "../header/header";
import AsideLeft from "./aside-left";
import AsideRight from "./aside-right";
import Helper from "../constants/Helper";


class Chat extends React.Component {
  constructor(props) {
    super(props);
    // this.messRef = React.createRef();
    this.btnMessRef = React.createRef();
    this.state = {
      idConversation: "",
      conversations : [],
      message: "",
    };
  }

  componentWillReceiveProps = (nextProps) =>{
  this.setState({conversations : nextProps.conversations , idConversation : nextProps.idConversation})
  }

  getMess = (e) => {
      this.setState({message : e.target.value.trim()})
  }

  submit =  (e) => {
    // console.log(this.props.email)
    let check = Helper.validators.stringRequire(this.state.message)
    let message = {
      createdAt: new Date().toString(),
      content : this.state.message,
      owner: this.props.email
  }
  if(check) this.sendMess(message)
  
    e.preventDefault();

  }
  sendMess = async (message) => {
    this.btnMessRef.current.disabled = true
    try {
      await firebase.firestore().collection('conversations')
          .doc(this.state.idConversation)
          .update({
              messages: firebase.firestore.FieldValue.arrayUnion(message)
          })
  } catch (err) {
      console.log(err)
  }
   this.btnMessRef.current.disabled = false;
   this.setState({message : ''})
   this.callbackSnapshot();
  }

  callbackSnapshot = () => {
    this.props.callbackSnapshot();
  }

  renderMessages = () => {
    let self = this;
    let conversations = this.state.conversations;
    let list = [];
    if (conversations && conversations.length > 0) {
      conversations.map((mess, key) => {
        if (mess.id == this.state.idConversation) {
          mess.messages.map((m, key) => {
            list.push(
              <div
                key={key}
                className={
                  m.owner === this.props.email
                    ? "message-chat your"
                    : "message-chat"
                }
              >
                <span id="mess"> {m.content}</span>
              </div>
            );
          });
        }
      });
    }
    return list;
  };

  callbackId = id => {
    this.setState({ idConversation: id });
  };

  render() {
    
    return (
      <>
        <Header email={this.props.email} />
        <section className="chat-container">
          <AsideLeft
            conversations={this.state.conversations}
            idConversation = {this.state.idConversation}
            callbackIdConversation={id => this.callbackId(id)}
            email={this.props.email}
            callbackSnapshot = {this.callbackSnapshot}
          />
          <div className="current-conversation">
            <div id="message-container" className="message-container">
              {this.renderMessages()}
            </div>
            <form className="form-chat" id="form-chat">
              <div className="input-wrapper">
                <input
                ref = {this.messRef}
                value = {this.state.message}
                  id="form-chat-input"
                  className="input-message"
                  type="text"
                  onChange = {this.getMess}
                  placeholder="Enter your message"
                />
              </div>
              <button ref = {this.btnMessRef} onClick = {this.submit} id="form-send" type="submit">
                Send
              </button>
            </form>
          </div>
          <AsideRight 
           conversations={this.state.conversations}
           idConversation={this.state.idConversation}
           callbackSnapshot = {this.callbackSnapshot}
           />
        </section>
      </>
    );
  }
}

export default Chat;

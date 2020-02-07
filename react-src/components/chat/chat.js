import React from "react";
import ReactDOM from "react-dom";

import Header from "../header/header";
import AsideLeft from "./aside-left";
import AsideRight from "./aside-right";
import Helper from "../constants/Helper";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.messRef = React.createRef();
    this.btnMessRef = React.createRef();
    this.state = {
      idConversation: "",
      conversations : [],
      message: "",
      
    };
  }

  componentWillReceiveProps = (nextProps) =>{
  this.setState({conversations : nextProps.conversations , idConversation : nextProps.conversations.length >0 ? nextProps.conversations[0].id : ''})
  }

  getMess = (e) => {
      this.setState({message : e.target.value})
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
   this.messRef.current.value = "";


  }

  renderMessages = () => {
    let self = this;
    // console.log(this.state.idConversation)
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
            conversations={this.props.conversations}
            idConversation={id => this.callbackId(id)}
            email={this.props.email}
          />
          <div className="current-conversation">
            <div id="message-container" className="message-container">
              {this.renderMessages()}
            </div>
            <form className="form-chat" id="form-chat">
              <div className="input-wrapper">
                <input
                ref = {this.messRef}
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
           conversations={this.props.conversations}
           idConversation={this.state.idConversation}
           />
        </section>
      </>
    );
  }
}

export default Chat;

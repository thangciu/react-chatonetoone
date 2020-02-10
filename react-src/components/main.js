import React from "react";
import ReactDOM from "react-dom";

import Register from "./register/register.jsx";
import Login from "./login/login.js";
import Chat from "./chat/chat";
import Helper from "./constants/Helper.js";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      register: false,
      chat: false,
      email: "",
      conversations: [],
      idConversation: ""
    };
  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(authStateChangedHandler);
    let self = this;

    async function authStateChangedHandler(user) {
      if (user && user.emailVerified) {
        self.setState({
          chat: true,
          login: false,
          register: false,
          email: user.email
        });
        let conversations = await Helper.getConversations(user.email);
        
        self.setState({
          conversations: conversations,
          idConversation:
            conversations && conversations.length > 0 ? conversations[0].id : ""
        });
      } else {
        self.setState({
          chat: false,
          login: true,
          register: false,
          email: ""
        });
      }
    }
  };

  callbackRegister = () => {
    this.setState({
      login: true,
      register: false,
      chat: false
    });
  };

  callbackLogin = () => {
    this.setState({
      login: false,
      register: true,
      chat: false
    });
  };

  callbackSnapshot = async () => {
    let idOld = [];
    let idNew = [];
    let self = this;
    this.state.conversations.map(_id => idOld.push(_id.id));
    let conversations = await Helper.getConversations(this.state.email);
    console.log('1', conversations)
    conversations.map(mess => idNew.push(mess.id))
    if (idOld.length - idNew.length === 1) {
      self.setState({
        conversations: conversations,
        idConversation: conversations && conversations.length > 0 ? conversations[0].id : ""
      });
    } else if (idOld.length - idNew.length === -1) {
      idNew.map(_idnew => {
        if (idOld.indexOf(_idnew) < 0) {
          self.setState({
            conversations: conversations,
            idConversation: _idnew
          });
        }
      });
    }
  };

  renderComponents = () => {
    return (
      <>
        {this.state.register ? (
          <Register callback={this.callbackRegister} />
        ) : (
          ""
        )}
        {this.state.login ? (
          <Login callback={this.callbackLogin} logIn={this.logIn} />
        ) : (
          ""
        )}
        {this.state.chat && !this.state.login && !this.state.register ? (
          <Chat
            callbackSnapshot={this.callbackSnapshot}
            idConversation={this.state.idConversation}
            conversations={this.state.conversations}
            email={this.state.email}
          />
        ) : (
          ""
        )}
      </>
    );
  };

  render() {
    return this.renderComponents();
  }
}

export default Main;

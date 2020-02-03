import React from "react";
import ReactDOM from "react-dom";


import Register from "./register/register.jsx";
import Login from "./login/login.js";
import Chat from "./chat/chat";

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      login: true, register: false , chat : false,
    }
  }

  callbackRegister = () => {
    this.setState({
      login: true,
      register: false,
      chat: false
    })
  }

  callbackLogin = () => {
    this.setState({
      login: false,
      register: true,
      chat: false
    })
  }
  logIn = () => {
  this.setState({
    login: false,
    register: false,
    chat: true
  })
  }
  renderComponents = () => {
    return(
       <div>
         {this.state.register ? <Register callback = {this.callbackRegister}/>: '' }
         {this.state.login ? <Login callback = {this.callbackLogin} logIn = {this.logIn}/>: '' }
         {this.state.chat && !this.state.login && !this.state.register ? <Chat/>: '' }
       </div>
    )
  }



  render() {
    return (
     this.renderComponents()
    );
  }
}

export default Main;
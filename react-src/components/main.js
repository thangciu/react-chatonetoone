import React from "react";
import ReactDOM from "react-dom";


import Register from "./register/register.jsx";
import Login from "./login/login.js";
import Chat from "./chat/chat";

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      login: false, register: false , chat : false,
      email : '', conversations : []
    }
  }
  componentDidMount =  () => {
    firebase.auth().onAuthStateChanged(authStateChangedHandler)
    let self = this;

    async function authStateChangedHandler(user) {
        if (user && user.emailVerified) {
          self.setState({
            chat: true,
            login: false,
            register: false,
            email: user.email
          })
          let data = await firebase.firestore()
          .collection('conversations')
          .where('users', 'array-contains', user.email)
          .get()
      let conversations = []
      for (let doc of data.docs) {
          let conversation = doc.data()
          // console.log(conversation)
          conversation.id = doc.id
          conversations.push(conversation)
      }
      self.setState({conversations : conversations})
        } else {
          self.setState({
            chat: false,
            login: true,
            register: false,
            email : ''
          })
        }
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

  // logIn = () => {
  // this.setState({
  //   login: false,
  //   register: false,
  //   chat: true,
  // })
  // }
  renderComponents = () => {
    return(
       <>
         {this.state.register ? <Register callback = {this.callbackRegister}/>: '' }
         {this.state.login ? <Login callback = {this.callbackLogin} logIn = {this.logIn}/>: '' }
         {this.state.chat && !this.state.login && !this.state.register ? <Chat conversations = {this.state.conversations} email = {this.state.email}/>: '' }
       </>
    )
  }

  render() {
    // console.log('conversation', this.state.conversations)
    return (
     this.renderComponents()
    );
  }
}

export default Main;
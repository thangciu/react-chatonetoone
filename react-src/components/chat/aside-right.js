import React from "react";
import ReactDOM from "react-dom";

import Header from "../header/header";
import { faBackspace } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AsideRight extends React.Component {
  constructor(props){
    super(props);
    this.btnDelRef = React.createRef();
    this.state = {conversations : [], idConversation : ""}
  }
  componentWillReceiveProps = (nextProps) =>{
    this.setState({conversations : nextProps.conversations ,
       idConversation : nextProps.idConversation
      })
  }

  delConversation = (id) => {
    this.btnDelRef.current.disabled = true;
    firebase.firestore()
    .collection('conversations')
    .doc(id)
    // .update({
    //     users: [
    //         '',
    //         ''
    //     ]
    // })
    .delete();
    this.btnDelRef.current.disabled = false;
    setTimeout(() => {
      this.props.callbackSnapshot();
    }, 300);

  }

  renderInforConversation = () => {
     let conversations = this.state.conversations
     let list = []
     if (conversations && conversations.length > 0) {
      conversations.map((mess, key) => {
        if (mess.id == this.state.idConversation){
            list.push(
              <div key = {key}>
              <div className = "title-currentconversation"> <span id  = "infor-title">{mess.title}</span></div>
              <div className = "email-user"> <span id = "infor-email-1" >{mess.users[0]}</span></div>
              <div className = "email-user"> <span id = "infor-email-2" >{mess.users[1]}</span></div>
              <div className = "created-at"> <span id = "infor-created" >{mess.createdAt}</span></div>
              <button ref = {this.btnDelRef} onClick = {() => this.delConversation(mess.id)} id = "btn-delete" className = "icon-btn" type = "submit">
              <FontAwesomeIcon icon = {faBackspace}/>
            </button>
        <span>{mess.id}</span>
              </ div>
            );
        }
      });
    }
    return list;
  }

  render() {
    return (
        <>
       <div className = "aside-right">
      <div  id = "list-infor" className = "list-infor">
        {this.renderInforConversation()}
      </div>
     
      </div>


    </>
    );
  }
}

export default AsideRight;
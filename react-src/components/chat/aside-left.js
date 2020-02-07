import React from "react";
import ReactDOM from "react-dom";

import Header from "../header/header";
import Helper from "../constants/Helper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace, faPlus } from '@fortawesome/free-solid-svg-icons';


class AsideLeft extends React.Component {
  constructor(props) {
    super(props);
    this.titleRef = React.createRef();
    this.frEmailRef = React.createRef();
    this.btnSubmitRef = React.createRef();

    this.state = {
      idConversation: "",
      conversations: [],
      title: "",
      frEmail: ""
    };
  }

  componentDidMount = () => {
   
  };

  componentWillUpdate = () => {
    // this.getIdConversation(this.state.idConversation)
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      conversations: nextProps.conversations,
      idConversation:
        this.state.idConversation === ""
          ? nextProps.conversations.length > 0
            ? nextProps.conversations[0].id
            : ""
          : this.state.idConversation,
      email: nextProps.email
    });
  };

  getTitle = e => {
    this.setState({ title: e.target.value.trim() });
  };

  getEmail = e => {
    this.setState({ frEmail: e.target.value.trim() });
  };

  submit = e => {
    let title = this.state.title;
    let frEmail = this.state.frEmail;
    //  console.log('this.state', this.state.conversations)

    let validate = [
      Helper.validate(
        title,
        Helper.validators.stringRequire,
        "title-error",
        "Invalid !!!"
      ),
      Helper.validate(
        frEmail,
        Helper.validators.email,
        "friend-email-error",
        "Invalid !!!"
      )
    ];

    if (Helper.allPassed(validate)) {
      this.addNewConversation();
    }
    e.preventDefault();
  };

  addNewConversation = async () => {
    Helper.setText("add-conversation-error","");
   this.btnSubmitRef.current.disabled = true;
        let check = false
    let inforAdd = {
      title: this.state.title,
      createdAt: new Date().toISOString(),
      messages: [],
      users: [this.state.frEmail, this.state.email]
    };
    this.state.conversations.map(mess => {
      mess.users.map(user =>  {
        if (user === this.state.frEmail) {
          this.getIdConversation(mess.id);
           check = true;
           return;
        }
      });
    });
    if (!check) {
      try {
        // firebase.auth().fetchSignInMethodsForEmail()
        let signInMethods = await firebase
          .auth()
          .fetchSignInMethodsForEmail(this.state.frEmail);
        if (!signInMethods.length) {
          throw new Error("Email do not exists!");
        }
        await firebase
          .firestore()
          .collection("conversations")
          .add(inforAdd);
        // view.showListConversation()
      } catch (err) {
        Helper.setText("add-conversation-error", err.message);
      }
    }
    
    this.titleRef.current.value = '';
    this.frEmailRef.current.value = '';
    this.btnSubmitRef.current.disabled = false;

  };

  renderListConversation = () => {
    let conversations = this.state.conversations;
    let list = [];
    if (conversations && conversations.length > 0) {
      // console.log(conversations)
      conversations.map((mess, key) => {
        list.push(
          <div
            onClick={() => this.getIdConversation(mess.id)}
            key={key}
            className={
              mess.id === this.state.idConversation
                ? "conversation active"
                : "conversation"
            }
          >
            <span className="conversation-title">{mess.title}</span>
            <span className="conversation-members">
              {mess.users.length} members
            </span>
          </div>
        );
      });
    }
    return list;
  };

  getIdConversation = id => {
    this.setState({ idConversation: id });
    setTimeout(() => {
      this.props.idConversation(id);
    }, 0);
  };

  render() {
    return (
      <>
        <div className="aside-left">
          <div id="list-conversation" className="list-conversation">
            {this.renderListConversation()}
          </div>

          <form id="form-add-conversation" className="form-add-conversation">
            <div className=" input-wrapper">
              <input
              ref = {this.titleRef}
                onChange={this.getTitle}
                id="input-add-title"
                type="text"
                placeholder="Conversation title"
              />
            </div>
            <div id="title-error" className="message-error">
              {" "}
            </div>
            <div className=" input-wrapper">
              <input
              ref = {this.frEmailRef}
                id="input-add-friend-email"
                onChange={this.getEmail}
                type="email"
                placeholder="Your friend email"
              />
            </div>
            <div id="friend-email-error" className="message-error">
              {" "}
            </div>
            <button
            ref = {this.btnSubmitRef}
              onClick={this.submit}
              id="form-add"
              className="icon-btn"
              type="submit"
            >
                        <FontAwesomeIcon icon={faPlus} />

            </button>
            <div id="add-conversation-error" className="message-error">
              {" "}
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default AsideLeft;

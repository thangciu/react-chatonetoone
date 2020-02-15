const Helper = {
  validators: {
    stringRequire(str) {
      return str != "";
    },
    email(str) {
      return str != "" && str.includes("@");
    },
    password(str) {
      return str != "" && str.length >= 6;
    }
  },

  validate(value, validator, idErrorTag, messageError) {
    if (validator(value)) {
      this.setText(idErrorTag, "");
      return true;
    } else {
      this.setText(idErrorTag, messageError);
      return false;
    }
  },

  allPassed(validateResult) {
    for (let result of validateResult) {
      if (!result) {
        return false;
      }
    }
    return true;
  },

  setText(id, text) {
    document.getElementById(id).innerText = text;
  },
  onAuthStateChanged: func => {
    firebase.auth().onAuthStateChanged(func);
  },

  getConversations: async email => {
    let data = await firebase
      .firestore()
      .collection("conversations")
      .where("users", "array-contains", email)
      .get();
    let conversations = [];
    for (let doc of data.docs) {
      let conversation = doc.data();
      // console.log(conversation)
      conversation.id = doc.id;
      conversations.push(conversation);
    }
    return conversations;
  },

  logIn: (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },

  register: async (email, password, displayName) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    firebase.auth().currentUser.updateProfile({
      displayName: displayName
    });
  },

  sendEmailVerify: () => {
    firebase.auth().currentUser.sendEmailVerification();
  },
  sendMess: (message, id) => {
    firebase
      .firestore()
      .collection("conversations")
      .doc(id)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion(message)
      });
  },
  fetchSignInMethodsForEmail: frEmail => {
    return firebase.auth().fetchSignInMethodsForEmail(frEmail);
  },
  addConversation: inforAdd => {
    firebase
      .firestore()
      .collection("conversations")
      .add(inforAdd);
  },
  signOut: () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log("success!");
      })
      .catch(function(error) {
        // An error happened.
        console.log("fail!");
      });
  }
};

export default Helper;

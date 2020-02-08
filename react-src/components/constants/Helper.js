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

};

export default Helper;

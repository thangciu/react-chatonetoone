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
  }
};

export default Helper;

const mongoose = require("mongoose");

//Schema
const Schema = mongoose.Schema;

const signUp = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  confirm_password: {
    type: String
  }
});

//model
const register = mongoose.model("signup", signUp);

module.exports = register;

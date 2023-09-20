const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  send: { type: [String] },
  receive: { type: [String] },
});

module.exports = model("user", userSchema);

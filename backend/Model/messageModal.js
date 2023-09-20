const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = model("message", messageSchema);

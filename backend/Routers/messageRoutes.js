const express = require("express");

const router = express.Router();

const {
  postMessage,
  getThread,
  messageFirstTime,
} = require("../controllers/messageControllers");

router.post("/postMessage", postMessage);

router.get("/getMessages/:id/:id2", getThread);

router.post("/messageFirst", messageFirstTime);

module.exports = router;

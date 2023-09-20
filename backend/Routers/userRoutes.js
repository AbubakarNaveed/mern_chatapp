const express = require("express");

const router = express.Router();

const {
  signIn,
  signUp,
  verify,
  getUser,
  getContactList,
} = require("../controllers/userControllers");

router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.get("/verify", verify, getUser);
router.get("/contacts/:id", getContactList);

module.exports = router;

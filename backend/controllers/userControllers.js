const User = require("../Model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const s_key = process.env.SECRET_KEY;

const signUp = async (req, res, next) => {
  const { email, userName, password } = req.body;
  console.log(email);

  try {
    const user = await User.findOne({ email });

    if (user) {
      res.status(405).json({ message: "user exists already" });
    } else {
      const hashed_password = bcrypt.hashSync(password, 10);
      const validUser = new User({
        email,
        userName,
        password: hashed_password,
      });

      await validUser.save();
      return res.status(200).json({ message: "User registered" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Error occured" });
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const check = await bcrypt.compareSync(password, user.password, (err) => {
        if (err) {
          throw err;
        }
      });

      if (check) {
        const userToken = jwt.sign({ id: user._id }, s_key, {
          expiresIn: "1hr",
        });
        const time = new Date(Date.now() + 1000 * 3600);
        res.cookie(String(user._id), `${userToken}`, {
          path: "/",
          expires: time,
          httpOnly: true,
          sameSite: "lax",
        });
        return res
          .status(200)
          .json({ message: "Success", user: user.userName });
      } else {
        return res.status(400).json({ message: "Error occured" });
      }
    } else {
      return res.status(404).json({ message: "User don't exist" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Error occured" });
  }
};

const verifyToken = async (req, res, next) => {
  try {
    console.log("running");
    const cookies = await req.headers.cookie;
    console.log(cookies);
    let cookie_array = cookies.split("=");
    const token = cookie_array[1];
    //console.log(token);
    if (!token) {
      res.status(404).json({ message: "Who are you?" });
    } else {
      jwt.verify(`${token}`, s_key, async (err, user) => {
        if (err) {
          res.status(400).json({ message: "invalid token" });
        } else {
          // res.status(200).json({ message: "Success", user: user.id });
          // req.id = user.id;
          // console.log(req.id);
          // next();
          // const signInUser = await User.findById(user.id, "-password");
          // if (!signInUser) {
          //   return res.status(404).json({ message: "I don't know you" });
          // }
          // return res.status(200).json({ user: signInUser });
          req.id = user.id;
          next();
        }
      });
    }
  } catch (e) {
    res.status(400).json({ message: "Error occured" });
  }
};

const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId, "-password");
  } catch (err) {
    return new Error(err);
  }
  if (!user) {
    return res.status(404).json({ message: "I don't know you" });
  }
  console.log(user);
  return res.status(200).json({ user: user });
};

const getContactList = async (req, res, next) => {
  const { id } = req.params;
  let contactList = [];
  try {
    const user = await User.findById(id);
    // console.log(user);

    if (!user) {
      res.status(404).json({ message: "user not found" });
    }

    let repeat = false;
    //send array have list receivers and vice versa
    for (let i = 0; i < user.send.length; i++) {
      const receiverContact = await User.findById(user.send[i]);

      contactList.push(receiverContact);
      console.log(contactList);
    }
    for (let i = 0; i < user.receive.length; i++) {
      const senderContact = await User.findById(user.receive[i]);

      contactList.push(senderContact);
    }

    return res
      .status(200)
      .json({ message: "Contacts", contactList: contactList });
  } catch (error) {
    res.status(400).json({ message: "Error occured", error: error });
  }
};

exports.signIn = signIn;
exports.signUp = signUp;
exports.verify = verifyToken;
exports.getUser = getUser;
exports.getContactList = getContactList;

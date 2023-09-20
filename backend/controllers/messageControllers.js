const Message = require("../Model/messageModal");
const User = require("../Model/userModel");

// const postMessage = async (req, res, next) => {
//   const { send, receive, text } = req.body;

//   try {
//     const new_message = new Message({
//       sender: send,
//       receiver: receive,
//       content: text,
//     });
//     await new_message.save();
//     const senderUser = await User.findById(send);
//     const receiveUser = await User.findById(receive);
//     await senderUser.send.push(receiveUser._id);
//     console.log(senderUser.send);
//     await receiverUser.receive.push(senderUser._id);
//     await senderUser.save();
//     await receiveUser.save();
//     return res.status(200).json({ message: "Message Sent" });
//   } catch (error) {
//     return res.status(400).json({ message: "Message Not Sent", error: error });
//   }
// };

const message = async (req, res, next) => {
  const { sender, receiver, text } = req.body;
  //   console.log(send);
  try {
    const newMessage = new Message({
      sender,
      receiver,
      content: text,
    });
    await newMessage.save();
    const senderUser = await User.findById(sender);
    const receiverUser = await User.findById(receiver);
    if (!receiverUser || !senderUser) {
      return res.status(400).json({ message: "one id is missing" });
    } else {
      // if sender id is present in receive of receiver than don't push
      // it is to prevent replication of ids in array
      const checkSenderPresent = receiverUser.receive.filter(
        (id) => sender === id
      );
      console.log(checkSenderPresent);
      if (checkSenderPresent.length === 0) {
        await receiverUser.receive.push(sender);
        await receiverUser.save();
      }
      const checkReceiverPresent = senderUser.send.filter(
        (id) => receiver === id
      );
      if (checkReceiverPresent.length === 0) {
        await senderUser.send.push(receiver);
        await senderUser.save();
      }

      return res.status(200).json({ message: "Message sent" });
    }
  } catch (error) {
    return res.status(400).json({ message: "message not send", error: error });
  }
};

const getThreadMessages = async (req, res, next) => {
  //id is logged in user and id2 is the user with whom id is having conversation
  const { id, id2 } = req.params;

  let usersMessages = [];

  try {
    const allMessages = await Message.find();
    // console.log(allMessages);
    for (let i = 0; i < allMessages.length; i++) {
      // console.log(`check ${allMessages[i].sender} === ${id}`);
      if (allMessages[i].sender === id && allMessages[i].receiver === id2) {
        //typed mean that the id is the sender
        // console.log("run");
        usersMessages.push({ message: allMessages[i].content, typed: true });
      } else if (
        allMessages[i].receiver === id &&
        allMessages[i].sender === id2
      ) {
        console.log("run2");
        usersMessages.push({ message: allMessages[i].content, typed: false });
      }
    }

    console.log(usersMessages);
    return res
      .status(200)
      .json({ message: "Got the messages", thread: usersMessages });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "unable to get messages", error: error });
  }
};

const messageFirstTime = async (req, res, next) => {
  const { id, email, text } = req.body;
  try {
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User don't exist" });
    } else {
      const firstMessage = new Message({
        sender: id,
        receiver: user._id,
        content: text,
      });
      console.log(firstMessage);
      await firstMessage.save();
      const sender = await User.findById(id);
      console.log(sender);
      sender.send.push(user._id);
      sender.save();
      user.receive.push(id);
      await user.save();
      return res.status(200).json({ message: "Message sent" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "unable to get messages", error: error });
  }
};

exports.postMessage = message;
exports.getThread = getThreadMessages;
exports.messageFirstTime = messageFirstTime;

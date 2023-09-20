import axios from "axios";

export const firstMessage = async (id, email, text) => {
  try {
    const res = await axios.post("http://localhost:8000/message/messageFirst", {
      id,
      email,
      text,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getThread = async (id, id2) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/message/getMessages/${id}/${id2}`
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async (sender, receiver, text) => {
  try {
    const res = await axios.post("http://localhost:8000/message/postMessage", {
      sender,
      receiver,
      text,
    });
    return res.data;
  } catch (error) {}
};

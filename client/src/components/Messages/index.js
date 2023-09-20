import React, { useEffect, useState } from "react";
import { Card, Box, Grid } from "@mui/material";
import Thread from "./Thread";
import ContactList from "./ContactList.js";
// import { userContacts } from "./dummyData";
import {
  verifyUser,
  getUserContactList,
} from "../../backendConnections/userFunctions";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setMessages } from "../../Redux/messageSlice";
import { userVerify, getContactList } from "../../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getThread } from "../../backendConnections/messageFunctions";

const MessageSection = () => {
  const userId = useSelector((state) => state.user.userData._id);
  const receiverId = useSelector((state) => state.message.receiverId);
  const messages = useSelector((state) => state.message.messages);
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(false);
  const userContacts = useSelector((state) => state.user.userContactList);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const verifyAndFetch = async () => {
    setLoading(true);
    const response = await verifyUser();
    // console.log(response);
    if (!response) {
      navigate("/");
    } else {
      await dispatch(userVerify(response.data));
      const responseContact = await getUserContactList(response.data.user._id);
      // console.log(responseContact);
      await dispatch(getContactList(responseContact.data));
      setLoading(false);
    }
  };

  const changeThread = async () => {
    const res = await getThread(userId, receiverId);
    // console.log(res);
    if (!res) {
      alert("Error");
    } else {
      await dispatch(setMessages({ thread: res.thread }));
      alert("Success");
      console.count("count");
    }
  };
  useEffect(() => {
    verifyAndFetch();
  }, []);
  useEffect(() => {
    verifyAndFetch();
    changeThread();
  }, [change]);

  useEffect(() => {
    if (receiverId !== "") {
      changeThread();
    }
  }, [receiverId]);

  return (
    <Box
      sx={{
        padding: "35px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: {
          xl: "row",
          lg: "row",
          md: "row",
          sm: "column",
          xs: "column",
        },
        gap: "15px",
      }}
    >
      {/* <Box
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      > */}
      <Box style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Thread change={change} setChange={setChange} messages={messages} />
      </Box>
      <Box style={{ width: "50%", display: "flex", justifyContent: "center" }}>
        <ContactList list={userContacts} />
      </Box>

      {/* </Box> */}
      {/* <Box
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></Box> */}
    </Box>
  );
};

export default MessageSection;

import React, { useState } from "react";
import {
  Card,
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
} from "@mui/material";
import { sendMessage } from "../../backendConnections/messageFunctions";
import { firstMessage } from "../../backendConnections/messageFunctions";
import { useSelector } from "react-redux";
import { textAlign } from "@mui/system";
const Thread = ({ change, setChange, messages }) => {
  console.log(messages);
  const senderId = useSelector((state) => state.user.userData._id);
  const receiverId = useSelector((state) => state.message.receiverId);
  const [search, setSearch] = useState(false);
  const [searchCredentials, setSearchCredentials] = useState({
    id: senderId,
    email: "",
    text: "",
  });

  const [post, setPost] = useState({ id: senderId, id2: receiverId, text: "" });

  const handleSearch = async () => {
    if (searchCredentials.email === " " || searchCredentials.text === "") {
      alert("please enter all credentials");
    } else {
      const response = await firstMessage(
        searchCredentials.id,
        searchCredentials.email,
        searchCredentials.text
      );
      if (!response) {
        alert("error occured");
      } else {
        alert(response.message);
        setChange(!change);
        setSearch(false);
      }
    }
  };

  const handleSend = async () => {
    if (post.text === "") {
      alert("Please type something");
    } else {
      const res = await sendMessage(post.id, post.id2, post.text);

      if (!res) {
        alert("error");
      } else {
        setChange(!change);
        alert("send");
      }
    }
  };
  return (
    <Box style={{ padding: "20px " }}>
      <Card
        sx={{
          width: {
            xl: "600px",
            lg: "600px",
            md: "600px",
            sm: "400px",
            xs: "400px",
          },
          height: "65vh",
          padding: "20px",
        }}
      >
        <Box
          style={{
            padding: "10px 30px",
            display: "flex",
            height: "50vh",
            overflowY: "scroll",
            flexDirection: "column",
            gap: "10px",
            justifyContent: "start",

            width: {
              xl: "600px",
              lg: "600px",
              md: "600px",
              sm: "400px",
              xs: "400px",
            },
          }}
        >
          {messages.map((text) => {
            console.log(text);
            return (
              <Box
                style={{
                  color: "#fff",
                  Width: "100%",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: text.typed ? "flex-end" : "flex-start",
                }}
              >
                <Box
                  style={{
                    backgroundColor: text.typed ? "#5794D1" : "#000",
                    color: "#fff",
                    padding: "10px 30px",
                  }}
                >
                  <Typography
                    variant="text"
                    style={{ fontSize: "18px", color: "#fff" }}
                  >
                    {text.message}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-evenly",
            height: "15vh",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <TextField
            label="Type"
            variant="standard"
            sx={{ fontSize: "18px" }}
            onChange={(e) => setPost({ ...post, text: e.target.value })}
          />
          <Button variant="contained" style={{ backgroundColor: "#5794D1" }}>
            <Typography
              variant="text"
              style={{ fontSize: "15px", color: "#fff" }}
              onClick={() => handleSend()}
            >
              Send
            </Typography>
          </Button>
          <Button variant="contained" style={{ backgroundColor: "#9554F6" }}>
            <Typography
              variant="text"
              style={{ fontSize: "15px", color: "#fff" }}
              onClick={() => {
                setSearch(true);
              }}
            >
              New contact
            </Typography>
          </Button>
        </Box>
      </Card>
      <Dialog open={search}>
        <Box
          style={{
            width: "300px",
            height: "250px",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <TextField
            label="Email"
            variant="standard"
            type="email"
            sx={{ fontSize: "18px" }}
            onChange={(e) =>
              setSearchCredentials({
                ...searchCredentials,
                email: e.target.value,
              })
            }
          />
          <TextField
            label="Message"
            variant="standard"
            sx={{ fontSize: "18px" }}
            onChange={(e) =>
              setSearchCredentials({
                ...searchCredentials,
                text: e.target.value,
              })
            }
          />
          <Button variant="contained" style={{ backgroundColor: "#5794D1" }}>
            <Typography
              variant="text"
              style={{ fontSize: "15px", color: "#fff" }}
              onClick={() => handleSearch()}
            >
              Search
            </Typography>
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Thread;

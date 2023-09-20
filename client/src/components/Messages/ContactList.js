import React from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import { width } from "@mui/system";
import { useDispatch } from "react-redux";
import { setReceiver } from "../../Redux/messageSlice";
const ContactList = ({ list }) => {
  const dispatch = useDispatch();
  return (
    <Card style={{ padding: "10px", width: "300px", height: "30vh" }}>
      <Box style={{ textAlign: "center", marginBottom: "10px" }}>
        <Typography
          variant="text"
          style={{
            fontSize: "25px",
            color: "#453456",
          }}
        >
          Contact list
        </Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
          height: "20vh",
        }}
      >
        {list.map((contact) => {
          return (
            <Button onClick={() => dispatch(setReceiver({ id: contact._id }))}>
              <Box>
                <Typography
                  variant="text"
                  style={{ fontSize: "15px", color: "#000" }}
                >
                  {contact.userName}
                </Typography>
              </Box>
            </Button>
          );
        })}
      </Box>
    </Card>
  );
};

export default ContactList;

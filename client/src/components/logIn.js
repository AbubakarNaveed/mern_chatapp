import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  Divider,
  Card,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { userSigningIn } from "../Redux/userSlice";
import { userLogin } from "../backendConnections/userFunctions";
const LogIn = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.user.userLogin);

  const navigation = useNavigate();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userCredentials.email === "" || userCredentials.password === "") {
      alert("Please enter our credentials");
    } else {
      const response = await userLogin(
        userCredentials.email,
        userCredentials.password
      );
      if (!response) {
        alert("Please try again");
      } else {
        await dispatch(userSigningIn(response));
        if (loginStatus) {
          navigation("/messages");
        }
      }
    }
  };

  // const handleBack = () => {
  //   navigate("");
  // };
  return (
    <Card
      sx={{
        padding: "20px 50px",
        borderRadius: "10px",
        width: "600px",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "30px",
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          Sign In
        </Typography>
      </Box>
      <Box>
        <Box style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            label="Email"
            type="email"
            variant="standard"
            sx={{ marginBottom: "10px", fontSize: "18px" }}
            onChange={(e) =>
              setUserCredentials({ ...userCredentials, email: e.target.value })
            }
          />
          <TextField
            variant="standard"
            label="Password"
            sx={{ fontSize: "18px" }}
            onChange={(e) =>
              setUserCredentials({
                ...userCredentials,
                password: e.target.value,
              })
            }
          />

          <Box
            sx={{
              marginTop: "25px",
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              alignItems: "center",
              padding: {
                xl: "0 10px",
                lg: "0 10px",
                md: "0 10px",
                sm: "0",
                xs: "0",
              },
            }}
          >
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={(e) => handleSubmit(e)}
            >
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "18px",
                }}
              >
                Login
              </Typography>
            </Button>
            <Button
              sx={{ background: "none", textDecoration: "none" }}
              onClick={() => navigation("/signup")}
            >
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "18px",
                  color: "#000",
                }}
              >
                Don't have an account?
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default LogIn;

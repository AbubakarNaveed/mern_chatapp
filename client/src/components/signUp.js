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

import { userSigningUp } from "../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSignUp } from "../backendConnections/userFunctions";
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    userName: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      userCredentials.email === "" ||
      userCredentials.password === "" ||
      userCredentials.userName === ""
    ) {
      alert("Please enter our credentials");
    } else {
      const response = await userSignUp(
        userCredentials.email,
        userCredentials.password,
        userCredentials.userName
      );
      if (!response) {
        alert("error");
      } else {
        if (response.data.message === "User registered") {
          alert("USer Registered");
          // dispatch(userSigningUp());
          navigate("/");
        } else {
          alert("not registered");
        }
      }
    }
  };

  return (
    <Card
      sx={{
        padding: " 20px 50px",
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
          Sign Up
        </Typography>
      </Box>
      <Box>
        <Box style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            label="Email"
            variant="standard"
            type="email"
            sx={{ marginBottom: "10px", fontSize: "18px" }}
            onChange={(e) =>
              setUserCredentials({ ...userCredentials, email: e.target.value })
            }
          />
          <TextField
            variant="standard"
            label="Username"
            sx={{ fontSize: "18px", marginBottom: "10px" }}
            onChange={(e) =>
              setUserCredentials({
                ...userCredentials,
                userName: e.target.value,
              })
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
                Register
              </Typography>
            </Button>
            <Button
              sx={{ background: "none", textDecoration: "none" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "18px",
                  color: "#000",
                }}
              >
                Already have an account?
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default SignUp;

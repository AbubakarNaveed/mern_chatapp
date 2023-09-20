const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT;
const http = require("http");
const app = express();
// const { Server } = require("socket.io");
const originFrontend = process.env.FRONTEND_ORIGIN;
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

require("./Connections/connection");

app.use("/", require("./Routers/userRoutes"));
app.use("/message", require("./Routers/messageRoutes"));

app.listen(port, () => {
  console.log(`listening on port : ${port}`);
});

// const server = http.createServer(app);

// server.listen(port, () => {
//   console.log(`server started on port:${port}`);
// });

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// // console.log(io);

// io.on("connection", (socket) => {
//   console.log(socket.id);
//   socket.on("disconnect", () => {
//     console.log(`User ${socket.id} disconnected`);
//   });
// });

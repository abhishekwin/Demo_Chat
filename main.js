// app.js
const express = require("express");
const port = 3000;
const app = express();
const router = require("./src/router/index");

// Body parse

const db = require("./src/models/index");

const startServer = async () => {
  try {
    await db.authenticate();
    app.use("/api", router); 

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();

// app.js
const express = require("express");
const port = 3000;
const app = express();
const router = require("./src/router/index");
app.use(express.json({ limit: "100kb" }));

// Body parse

const db = require("./src/models/index");
const cors = require("cors");

const startServer = async () => {
  try {
    await db.authenticate();
    app.use(
      cors({
        origin: "*",
      }),
    );
    app.use("/api", router);

    const ServerSocket = app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
   require('./socket')(ServerSocket);
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();

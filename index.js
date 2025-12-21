require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.PORT;

app.listen(port, "0.0.0.0", () => {
  console.log(`smart_feeder_remote_api on http://0.0.0.0:${port}`);
});

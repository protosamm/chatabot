const dns = require('node:dns')
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const connectDB = require("./config/db");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", require("./routers/auth.router"));
app.use("/api/chat", require("./routers/chat.router"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

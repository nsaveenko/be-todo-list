const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { port, connectionString } = require("./config/config");
const indexRouter = require("./routes/index");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", indexRouter);

app.listen(port || 3001, () => console.log("Server started on port " + port));

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Failed to connect to DB"));

app.get("/", (request, response) => {
  response.status(200).send("Hello todo-list app!");
});

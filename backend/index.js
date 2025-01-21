const express = require("express");
const cors = require("cors");
const app = express();
const tasksRouter = require("./src/routes/manipulateRoutes");

require("dotenv").config();
const port = process.env.PORT;

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use("/", tasksRouter);

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const auth = require("./routes/auth");
const admin = require("./routes/admin");
const task = require("./routes/task");
const user = require("./routes/user");
const list = require("./routes/list");
const color = require("./routes/color");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", auth);
app.use("/api/v1/admin", admin);
app.use("/api/v1/tasks", task);
app.use("/api/v1/users", user);
app.use("/api/v1/colors", color);
app.use("/api/v1/lists", list);


app.use(errorHandler);

const HOST = process.env.db_host || localhost;
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port http://${HOST}:${PORT}, GO!`));

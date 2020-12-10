const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

mongoose.connection.on("error", function(err) {
    console.log("Could not connect to mongo server!");
    return console.log(err);
  });

const port = process.env.PORT || 5050;

app.use(cors());
// app.use(express.json());

// const questionsRouter = require("./routes/questions");
// const usersRouter = require("./routes/user");

// app.use("/questions", questionsRouter);
// app.use("/user", usersRouter);

// app.use(express.static("public"));

// app.use(
//   session({
//     secret: "loadsofrandomstuff",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// app.use(bodyParser.urlencoded({ extended: true }));
// app.set("view engine", "pug");

// app.get("/logout", (req, res) => {
//   req.session.destroy();
//   res.redirect("/");
// });

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
require("./db/passport");
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
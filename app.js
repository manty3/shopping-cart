var createError = require("http-errors");
var express = require("express");
const path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var usersRouter = require("./routes/users");
var adminRouter = require("./routes/admin");
const hbs = require("express-handlebars");
const app = express();
const fileUpload = require("express-fileupload");
var db = require("./config/connection");
var session = require("express-session");
const router = require("./routes/users");
require("dotenv").config();
const MongoStore = require("connect-mongo");

// const { error, log } = require('console');
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "layout",
    layoutDir: __dirname + "/views/layout/",
    partialsDir: __dirname + "/views/partials",
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "key",
    cookie: { maxAge: 600000 },
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL_LOCAL,
    }),
  })
);

db.connect((err) => {
  if (err) console.log("connection error" + err);

  console.log("Database connected");
});

app.use("/", usersRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("listening on port 3000");
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = router;

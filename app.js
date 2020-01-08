var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var config = require("./config/database");
var nodemailer = require("nodemailer");

//database config file
mongoose.connect(config.database);

//connect to database
mongoose.connect("mongodb://localhost/nodelms");
var db = mongoose.connection;
//check connection
db.once("open", function() {
  console.log("connected to db");
});

//check for db errors
db.on("err", function(err) {
  console.log(err);
});

//import lead model
var Leads = require("./models/leads");
app = express();

//express session middleware
app.use(
  session({
    secret: "keyboard cat",
    //cookie:{_expires : 150000}, // time im m
    resave: true,
    saveUninitialized: true
  })
);

//express messages middleware
app.use(require("connect-flash")());
app.use(function(req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// Express Validator Middleware
app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

//load view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//public/static folder
app.use(express.static(path.join(__dirname, "public")));

//middleware forn body-parsers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//route for home page
app.get("/", function(req, res) {
  res.render("contact");
  //res.send("Hi from server")
});

// Passport Config
require("./config/passport")(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//to user after login has done on all route
app.get("*", function(req, res, next) {
  res.locals.user = req.user || null;
  next();
});

// Route Files
let leads = require("./routes/leads");
let users = require("./routes/users");
app.use("/leads", leads);
app.use("/users", users);

//port for web server
app.listen(8000, function() {
  console.log("app listening on port 8000!");
});

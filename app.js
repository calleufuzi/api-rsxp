const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const socketio = require("socket.io")();
const cors = require("cors");
const compression = require("compression");
const helmet = require('helmet');

const corsOptions = require("./helpers/cors");

const indexRouter = require("./routes/index");
const tweetRouter = require("./routes/tweets");

const { streamTweets } = require('./controllers/tweetController')

const app = express();

//Set Socket.io
app.socketio = socketio;

//Implement best pratices security to express;
app.use(helmet());

//Health route;
app.get("/health", (req, res) => {
  return res
    .status(200)
    .send("Server running with " + process.env.NODE_ENV + " configuration.");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Configure CORS for all routes;
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

//Configure compression gzip;
app.use(compression());

//Configure bodyParser;
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "50mb"
  })
);
app.use(
  bodyParser.json({
    limit: "50mb"
  })
);

// Stream recent tweets
streamTweets(socketio)

socketio.on("connection", socket => {
  console.log('Connected Client ID', socket.id);
});

app.use("/", indexRouter);
app.use("/tweets", tweetRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

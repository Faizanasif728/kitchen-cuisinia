var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var cors = require("cors");

//Importing all the routes(API end-points)

const cartRouter = require("./Routes/cartRouter");
const userRouter = require("./Routes/userRouter");
const foodRouter = require("./Routes/foodRouter");
const orderRouter = require("./Routes/orderRouter");
var app = express();
// Allow both local and production frontend URLs for CORS
const allowedOrigins = [
  process.env.FRONTEND_URL_SIMPLE,
  process.env.FRONTEND_URL_ADMIN,
  process.env.FRONTEND_URL_SIMPLE_PRODUCTION,
  process.env.FRONTEND_URL_ADMIN_PRODUCTION,
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// view engine setup
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//using Routes
app.use("/food", foodRouter);
app.use("/user", userRouter);
app.use("/images", express.static("uploads"));
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;

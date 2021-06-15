const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const fileUpload = require('express-fileupload');

const validateMiddlewWare = require("./app/common/auth.middleware");
const logger = require("./logger/index")(__filename);

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

var corsOptions = {
  origin: "*",
};

// app.use(fileUpload());

app.use(cors(corsOptions));
app.set("view engine", "ejs");
const db = require("./app/models");
db.sequelize.sync();

// app.all("*", (req, res, next) => {
//   var logreq = {
//     Body: req.body,
//     Method: req.method,
//     URL: req.originalUrl,
//     headers: req.headers,
//     params: req.params,
//   };
//   logger.info("Req-Info", { message: JSON.stringify(logreq) });
//   let oldsend = res.send;
//   res.send = (data) => {
//     logger.info("Res-Info", data);
//     oldsend.apply(res, arguments);
//   };
//   return next();
// });

app.use((req, res, next) => {
  var logreq = {
    Body: req.body,
    Method: req.method,
    URL: req.originalUrl,
    headers: req.headers,
    params: req.params,
  };
  logger.info("Request-Info", { message: JSON.stringify(logreq) });
  // let oldsend = res.send;
  // res.send = function (data) {
  //   logger.info("Response-Info", data);
  //   oldsend.apply(res, arguments);
  // };
  return next();
});

require("./app/routes/auth.routes")(app);
require("./app/routes/questionnaire.routes")(app);
require("./app/routes/profile.routes")(app);
require("./app/routes/s3.routes")(app);
require("./app/routes/public.routes")(app);
require("./app/routes/mail.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/lead.routes")(app);
require("./app/routes/company.routes")(app);
app.use(validateMiddlewWare.Validate);
require("./app/routes/user.routes")(app);
require("./app/routes/client.routes")(app);
require("./app/routes/filter.routes")(app);
require("./app/routes/review.routes")(app);
require("./app/routes/rating.routes")(app);
require("./app/routes/stripe.routes")(app);
require("./app/routes/user.navigation")(app);

// app.all("*", (req, res, next) => {
//   var logres = {
//     Body: res.body,
//     // Method: req.method,
//     // URL: req.originalUrl,
//     // headers: req.headers,
//     // params: req.params,
//   };
//   console.log("server - res", res);
//   logger.info("Response", { message: JSON.stringify(logres) });
//   return next();
// });

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const path=require("path")

const mongoSanitize = require("express-mongo-sanitize");
const errorController = require("./controllers/errorController");
const ProductsRouter = require("./Routers/productsRouter");
// const vendorRouter = require("./Routers/vendorRouter");
// const ordersRouter = require("./Routers/ordersRouter");
const usersRouter = require("./Routers/usersRouter");
const AppError = require("./utils/appError");

const app = express();


//app.use(helmet());
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", "example.com"],
//       objectSrc: ["'none'"],
//       upgradeInsecureRequests: [],
//     },
//   })
// );
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"], 
//         scriptSrc: ["'self'"],
//         styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
//         imgSrc: ["'self'", 'data:'],
//         connectSrc: ["'self'", 'https://ourDomain.us.auth0.com/oauth/token', 'https://ourDomain.azure-api.net/fields/request/paths/invoke'],
//         fontSrc: ["'self'", 'https://fonts.gstatic.com'],
//         objectSrc: ["'self'"],
//         mediaSrc: ["'self'"],
//         frameSrc: ["'self'", "ourDomain.us.auth0.com"],
//       },
//     }
//   })
// );
if (process.env.NODE_ENV === "production") app.use(morgan("dev"));

app.use(
  express.json({
  
  }))

app.use(mongoSanitize());

app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "average",
      "maxGroupSizw",
      "difficulty",
      "price",
    ],
  })
);

const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: "too many request from this IP",
});
// app.use(cors());
app.use((req, res, next) => {
  console.log(req.path);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT",
      "POST",
      "PATCH",
      "DELETE",
      "GET"
    );
    return res.status(200).json({});
  }

  next();
});


//app.use("/api", limiter);

app.use("/api/v1/products", ProductsRouter);
app.use("/api/v1/users", usersRouter);
if (process.env.NODE_ENV === 'production') {
  console.log(process.env.NODE_ENV,path.join(__dirname, '/Client/build'))

  app.use(express.static(path.join(__dirname, '/Client/build')))
   console.log(__dirname)
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'Client', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    console.log(process.env.NODE_ENV)
    res.send('API is running....')
  
    res.sendFile(path.resolve(__dirname, 'Client', 'build', 'index.html'))
  })
}

// const __dirname = path.resolve()
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


// app.use("/api/v1/vendor", vendorRouter);
// app.all("*", (req, res, next) => {
//   next(
//     new AppError(`the request to URL ${req.originalUrl} was not found, 404`)
//   );
// });
// app.use(errorController);

module.exports = app;
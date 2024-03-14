const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");

const {
  errorHandler,
} = require("../backend/src/middlewares/exceptionHandler.middleware");

dotenv.config();

//Routes imports
const { authRouter } = require("./src/routes/auth");
const { tourRouter } = require("./src/routes/tour");
const { countryRouter } = require("./src/routes/country");
const { touristRouter } = require("./src/routes/tourist");
const { dashboardRouter } = require("./src/routes/dashboard");
const { touristAmountRouter } = require("./src/routes/touristAmount");
const { expenseRouter } = require("./src/routes/expense");
const { userRouter } = require("./src/routes/user");


//Middlewares
const app = express();
// app.use(cors());

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

//Default Route
app.get("/", (req, res) => {
  res.json({
    message: "Awesome! It's working 😎".yellow.bold,
  });
});

//Routes Registration

app.use("/api/auth", authRouter);
app.use("/api/tour", tourRouter);
app.use("/api/country", countryRouter);
app.use("/api/user", userRouter);
app.use("/api/tourist", touristRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/touristAmount", touristAmountRouter);
app.use("/api/expense", expenseRouter);
app.use(errorHandler);

// app.use(function (err, req, res, next) {
//   res.status(500);
//   res.send("Oops, something went wrong.");
// });

module.exports = {
  app,
};

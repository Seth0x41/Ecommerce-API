const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
const subCategoryRoute = require("./routes/subCategoryRoute");
const brandRoute = require("./routes/brandRoute");

dotenv.config({ path: "config.env" });

//connect database
dbConnection();
// Node Application
const app = express();

// MiddleWare
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`Mode ${process.env.NODE_ENV}`);
}

app.use(express.json());

//Mount Routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't Find this Route`, 400));
});
// Global Error Handling Middleware
app.use(globalError);
const { PORT } = process.env;
const server = app.listen(PORT, () => {
  console.log(`App running on Port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Error: ${err.name} | ${err.message} `);
  server.close(() => {
    console.error(`Shutting Down ...`);
    process.exit(1);
  });
});

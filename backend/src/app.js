
const express = require("express");
const cors = require("cors");

const employeeRoutes = require("./routes/employeeRoutes");
const errorMiddleware = require("./middlewares/errorMiddlewareTemp");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json({ limit: "10kb" }));

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

app.use("/employees", employeeRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorMiddleware);

module.exports = app;

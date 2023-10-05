const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error").default;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the contact book application." });
});

app.use("/api/contacts", contactsRouter);

// Xử lý 404
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

// Xử lý lỗi chung
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({ message: err.message || "Internal Server Error"});
});

module.exports = app;
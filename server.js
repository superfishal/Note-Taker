// require api/html routes, express, establishing port and express as app
const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const PORT = process.env.PORT || 3001;
const app = express();
// middleware to take requests and make them object strings or arrays and readable to the back end server
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);
// setting up port to server
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

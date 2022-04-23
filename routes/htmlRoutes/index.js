// this file sets up the html routes
const path = require("path");
const router = require("express").Router();
// gets notes pages
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/notes.html"));
});
// gets index page
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});
module.exports = router;

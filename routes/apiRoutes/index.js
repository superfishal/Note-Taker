const router = require("express").Router();
const store = require("../../db/store");
router.get("/notes", function (req, res) {
  store
    .getAllNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});
router.post("/notes", function (req, res) {
  store
    .addNote(req.body)
    .then((note) => {
      return res.json(note);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});
// POST /api/notes should receive a new note to save on the request body,
// add it to the db.json file, and then return the new note to the client.
// each note needs a unique id when its saved.  NPM called "uuid"

// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete.
// To delete, read all notes from db.json file, remove note with the id property, and rewrite notes to db.json file.
// There has to be an easier way for that ^

module.exports = router;

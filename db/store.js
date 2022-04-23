// this file contains all the storage functions for writing/receiving/saving
const fs = require("fs");
const util = require("util");
const uuid = require("uuid");
// asynchronous read/write file returns promise
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
// storage class for read/write/get/add/delete note using unique uuid
class Store {
  read() {
    return readFileAsync("db/db.json", "utf8");
  }
  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }
  getAllNotes() {
    return this.read().then((notes) => {
      let parsedNotes;
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }
  addNote(note) {
    //   check if data has title text properties and if empty
    if (!note.title || !note.text) {
      throw new Error("Empty data");
    }
    // unique id
    note.id = uuid.v4();
    return this.getAllNotes()
      .then((notes) => {
        return [...notes, note];
      })
      .then((newNoteArray) => {
        return this.write(newNoteArray);
      })
      .then(() => {
        return note;
      });
  }
  deleteNote(id) {
    return this.getAllNotes()
      .then((notes) => {
        return notes.filter((note) => note.id !== id);
      })
      .then((newNoteArray) => {
        return this.write(newNoteArray);
      });
  }
}

module.exports = new Store();

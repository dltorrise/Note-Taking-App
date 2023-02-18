const notes = require('express').Router();
const path = require('path');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
//const db = require(path.join(__dirname, '../db/db.json'))

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile(path.join(__dirname, '../db/db.json')).then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post('/', (req, res) => {
  console.log(req.body);

  if (req.body) {
    const newNote = {
      title: req.body.title,
      note: req.body.text,
      note_id: uuid(),
    };

    readAndAppend(newNote, path.join(__dirname, '../db/db.json'));
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;

const notes = require('express').Router();
const path = require('path');
const { writeToFile, readFromFile, readAndAppend } = require('../helpers/fsUtils');
const { uuid } = require('uuidv4');

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
      text: req.body.text,
      id: uuid(),
      //id: uuid.uuid
    };

    readAndAppend(newNote, path.join(__dirname, '../db/db.json'));
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});


//BONUS
//Delete Route
notes.delete('/:id', (req, res) => {
  const {id} = req.params
  readFromFile(path.join(__dirname, '../db/db.json')).then((data) => {
    //creates a variable to store array
    const parsedData = JSON.parse(data)
    //console.log(parsedData)
    for (i=0; i<parsedData.length; i++) {
      if (parsedData[i].id===id) {
        //creates a new array with all elements except for element that matches id
        const newArray = parsedData.splice(!i)
        //writes new array to file
        writeToFile(path.join(__dirname, '../db/db.json'), newArray)
        //renders notes without deleted element
        readFromFile(path.join(__dirname, '../db/db.json')).then((data) => res.json(JSON.parse(data))); 
        console.log("Message deleted")
      } else {
        console.log("Message not deleted")
      }
    }
  })
})

module.exports = notes;

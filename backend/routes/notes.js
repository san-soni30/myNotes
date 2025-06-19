const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Route-I: Get all the notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
   try {
      const notes = await Note.find({ user: req.user.id })
      res.json(notes);
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Error occured while creating user");
   }

});

// Route-II: Add a new note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchUser, [
   body('title', 'Enter a valid title').isLength({ min: 3 }),
   body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
   try {
      const { title, description, tag } = req.body;
      // If there are errors, return them
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ erros: errors.array() });
      }
      const note = new Note({
         title, description, tag, user: req.user.id
      })
      const saveNote = await note.save();
      res.json(saveNote);
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Error occured while creating user");
   }
});

// Route-III: Update an existing note using: PUT "/api/notes/addnote". Login required

router.put('/updatenote/:id', fetchUser, async (req, res) => {
   const { title, description, tag } = req.body;
   try {
      // Create a new note object
      const newNote = {};
      if (title) { newNote.title = title };
      if (description) { newNote.description = description };
      if (tag) { newNote.tag = tag };

      // Find the note to be updated and update it
      let note = await Note.findById(req.params.id);
      if (!note) {
         return res.status(404).send("Not found");
      }

      if (note.user.toString() !== req.user.id) {
         return res.status(401).send("Not allowed");
      }

      note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
      res.json(note);
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Error occured while creating user");
   }
});

// Route-IV: Delete an existing note using: DELETE "/api/notes/deletenote". Login required

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
   try {
      // Find the note to be delete and deleted it
      let note = await Note.findById(req.params.id);
      if (!note) {
         return res.status(404).send("Not found");
      }
      // Allow deletion only if user owns this note
      if (note.user.toString() !== req.user.id) {
         return res.status(401).send("Not allowed");
      }

      note = await Note.findByIdAndDelete(req.params.id);
      res.json({ "Success": "Note has been deleted", note: note });
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Error occured while creating user");
   }
});

module.exports = router;
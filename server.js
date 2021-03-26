// GIVEN a note-taking application, WHEN I open the Note Taker I am presented with a landing page with a link to a notes page.

// WHEN I click on the link to the notes page, I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column.

// WHEN I enter a new note title and the note’s text, a Save icon appears in the navigation at the top of the page.  I click on the Save icon and the new note I have entered is saved and appears in the left-hand column with the other existing notes

// WHEN I click on an existing note in the list in the left-hand column, that note appears in the right-hand column

// WHEN I click on the Write icon in the navigation at the top of the page I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
const express = require("express");
const path = require("path");
const fs = require("fs");

const db = require("./db/db.json");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// HTML Routes

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
    console.log("/notes");
  });


//API routes

app.get("/api/notes", function(req, res) {
    res.json(db)
    }); 



app.post("/api/notes", function (req, res) {
  const noteText = req.body
  saveNoteBtn.push(noteText)
  res.json(noteList)
  console.log("saved");
}); //creates a note from req.body //saves notes

app.delete("/api/notes/:id", function (req, res) {
  // delete a note based of id //delete notes
  const { id } = req.params;
  fs.readFile(__dirname, "/db/db/json", "utf8", function (err, data){
    const notes = JSON.parse(data)
    const newNotes = notes.filter((note) => note.id !== id);
    res.json(notes)
  })
});


app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));

});

app.listen(PORT, () => console.log("app listening on port" + PORT));

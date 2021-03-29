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
const { v4: uuidv4 } = require('uuid');
// const parsedNotes = ("parsed-notes")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// HTML Routes

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
    // console.log("/notes");
  });


  // fs.readFile("./db/db/json", "utf8", function (err, data){
  //   if (err) throw err;
  //   var notes = JSON.parse(data)
    
    //API routes
app.get("/api/notes", function(req, res) {
  fs.readFile(".db/db.json", "utf8", function (err, data){
    // console.log(parsedNotes);
    res.json(db)
})
});

app.post("/api/notes", function (req, res) {
   const newNote = req.body
   newNote.id = uuidv4()
   db.push(newNote)
   fs.writeFileSync("./db/db.json", JSON.stringify(db));
   res.json(db);
  //creates a note from req.body //saves notes
});

  app.delete("/api/notes/:id", function (req, res) {
    // delete a note based of id //delete notes
  fs.writeFileSync("./db/db.json", JSON.stringify(db.filter((note) => note.id !== req.params.id)))
  res.send("success")
  });

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  
});

app.listen(PORT, () => console.log("app listening on port" + PORT));

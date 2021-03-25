// GIVEN a note-taking application, WHEN I open the Note Taker I am presented with a landing page with a link to a notes page.

// WHEN I click on the link to the notes page, I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column.

// WHEN I enter a new note title and the note’s text, a Save icon appears in the navigation at the top of the page.  I click on the Save icon and the new note I have entered is saved and appears in the left-hand column with the other existing notes

// WHEN I click on an existing note in the list in the left-hand column, that note appears in the right-hand column

// WHEN I click on the Write icon in the navigation at the top of the page I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
const express = require("express");
const path = require("path");
const http = require("http");
const fs = require("fs");

const dbJson = require("./db/db.json");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// HTML Routes
module.exports = (app) => {
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
    console.log("/notes");
  });
};

//API routes
module.exports = (app) => {
    app.get("api/notes", function (req, res) {
      return res.json();
    }); //retrieve all notes and res.json them back to the front end//gets notes
}


app.post("api/notes", function (req, res) {}); //creates a note from req.body //saves notes

app.delete("/api/notes/:id", function (req, res) {
  // delete a note based of id //delete notes
  const { id } = req.params;
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
  console.log("/notes");
});

app.listen(PORT, () => console.log("app listening on port" + PORT));

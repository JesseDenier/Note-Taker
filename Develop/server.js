// Imports Express.js, path, and file system.
const express = require("express");
const path = require("path");
const fs = require("fs");

// Initialize an instance of Express.js and specify which port the server will run on.
const app = express();
const PORT = 3001;

// Imports json notes for future use.
const notes = require("./db/db.json");

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static middleware pointing to the public folder.
app.use(express.static("public"));

// Create Express.js routes for default '/', and '/notes' endpoints
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

// Gets the content of the json notes.
app.get("/api/notes", (req, res) => res.json(notes));

// Handle the POST request to add a new note
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  // Assign a unique ID to the new note (you can use a package like UUID for this purpose)
  newNote.id = notes.length + 1;
  // Push the new note to the notes array
  notes.push(newNote);
  // Write the updated notes array to the db.json file
  fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to write to the database." });
    } else {
      res.json(newNote);
    }
  });
});

// listen() method is responsible for listening for incoming connections on the specified port.
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
